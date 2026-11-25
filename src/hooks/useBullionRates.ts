import { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import {
  OWNER_EMAIL,
  OperationType,
  auth,
  db,
  googleProvider,
  handleFirestoreError,
} from '../firebase';
import { BullionRates, RateHistoryEntry } from '../types';

export interface UpdateRatesInput {
  gold24kPer10g: number;
  gold22kPer10g: number;
  silverPerKg: number;
  silverPer10g: number;
  gstNote: string;
  marketNote?: string;
  updatedByLabel: string;
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatIstDateTime(date: Date | null): string {
  if (!date) return 'Not published yet';
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date) + ' IST';
}

export function useBullionRates() {
  const [rates, setRates] = useState<BullionRates | null>(null);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesError, setRatesError] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [history, setHistory] = useState<RateHistoryEntry[]>([]);
  const [saving, setSaving] = useState(false);

  const isOwner = Boolean(
    user &&
      user.emailVerified &&
      user.email?.toLowerCase() === OWNER_EMAIL.toLowerCase()
  );

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to public live rates document
  useEffect(() => {
    const liveRef = doc(db, 'rates', 'live');
    const unsubscribe = onSnapshot(
      liveRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setRates(snapshot.data() as BullionRates);
        } else {
          setRates(null);
        }
        setRatesLoading(false);
        setRatesError(null);
      },
      (error) => {
        setRatesLoading(false);
        setRatesError('Unable to sync live rates at the moment.');
        handleFirestoreError(error, OperationType.GET, 'rates/live');
      }
    );

    return () => unsubscribe();
  }, []);

  // Subscribe to owner audit history only when authenticated as verified owner
  useEffect(() => {
    if (!authReady || !isOwner || !user) {
      setHistory([]);
      return;
    }

    const historyQuery = query(
      collection(db, 'rateHistory'),
      where('updatedByUid', '==', user.uid),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      historyQuery,
      (snapshot) => {
        const items: RateHistoryEntry[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<RateHistoryEntry, 'id'>),
        }));
        items.sort((a, b) => {
          const aMs = a.updatedAt ? a.updatedAt.toMillis() : 0;
          const bMs = b.updatedAt ? b.updatedAt.toMillis() : 0;
          return bMs - aMs;
        });
        setHistory(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'rateHistory');
      }
    );

    return () => unsubscribe();
  }, [authReady, isOwner, user]);

  const signInOwner = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signOutOwner = async () => {
    await signOut(auth);
  };

  const publishRates = async (input: UpdateRatesInput): Promise<void> => {
    if (!user || !isOwner) {
      throw new Error('Only the verified owner account can update live bullion rates.');
    }

    const gold24k = Math.round(Number(input.gold24kPer10g));
    const gold22k = Math.round(Number(input.gold22kPer10g));
    const silverKg = Math.round(Number(input.silverPerKg));
    const silver10g = Math.round(Number(input.silverPer10g));

    if (
      !Number.isFinite(gold24k) ||
      gold24k <= 0 ||
      gold24k > 10000000 ||
      !Number.isFinite(gold22k) ||
      gold22k <= 0 ||
      gold22k > 10000000 ||
      !Number.isFinite(silverKg) ||
      silverKg <= 0 ||
      silverKg > 10000000 ||
      !Number.isFinite(silver10g) ||
      silver10g <= 0 ||
      silver10g > 10000000
    ) {
      throw new Error('All bullion rates must be positive numbers.');
    }

    const gstNote = input.gstNote.trim().slice(0, 140) || 'GST will be added later.';
    const updatedByLabel = input.updatedByLabel.trim().slice(0, 60) || 'Owner Desk';
    const marketNote = input.marketNote?.trim().slice(0, 200) || '';

    setSaving(true);
    try {
      const batch = writeBatch(db);
      const liveRef = doc(db, 'rates', 'live');
      const historyRef = doc(collection(db, 'rateHistory'));

      const livePayload: Record<string, unknown> = {
        gold24kPer10g: gold24k,
        gold22kPer10g: gold22k,
        silverPerKg: silverKg,
        silverPer10g: silver10g,
        gstNote,
        updatedByLabel,
        updatedAt: serverTimestamp(),
      };
      if (marketNote.length > 0) {
        livePayload.marketNote = marketNote;
      }

      const historyPayload: Record<string, unknown> = {
        gold24kPer10g: gold24k,
        gold22kPer10g: gold22k,
        silverPerKg: silverKg,
        silverPer10g: silver10g,
        updatedByUid: user.uid,
        updatedAt: serverTimestamp(),
      };
      if (marketNote.length > 0) {
        historyPayload.marketNote = marketNote;
      }

      batch.set(liveRef, livePayload);
      batch.set(historyRef, historyPayload);

      await batch.commit();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'rates/live');
    } finally {
      setSaving(false);
    }
  };

  return {
    rates,
    ratesLoading,
    ratesError,
    user,
    authReady,
    isOwner,
    history,
    saving,
    signInOwner,
    signOutOwner,
    publishRates,
  };
}
