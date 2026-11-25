# Security Specification — SATYAM SHIVAM JEWELLERY

## 1. Data Invariants
1. Only the verified owner account (`koleyanir090@gmail.com` with `email_verified == true`, or a document in `/admins/{uid}`) may create or update `/rates/live` or append to `/rateHistory/{entryId}`.
2. Public visitors (including unauthenticated users) may read `/rates/live` to view live 24K Gold, 22K Gold, and Silver wholesale rates and update timestamps, without exposing owner email PII.
3. All numeric rates (`gold24kPer10g`, `gold22kPer10g`, `silverPerKg`, `silverPer10g`) must be finite positive numbers within realistic bounds (`> 0` and `<= 10000000`).
4. `updatedAt` MUST equal `request.time` (server timestamp) on every create and update.
5. No arbitrary shadow fields are permitted (`keys().hasOnly(...)` on create and `affectedKeys().hasOnly(...)` on update).
6. `rateHistory/{entryId}` is append-only and owner-readable only (`allow update, delete: if false`).

## 2. Dirty Dozen Attack Payloads (All Must Fail with PERMISSION_DENIED)
1. Unauthenticated write to `/rates/live`.
2. Non-owner authenticated user write to `/rates/live`.
3. Owner email spoof without `email_verified == true` writing to `/rates/live`.
4. Owner writing negative `gold24kPer10g: -500` to `/rates/live`.
5. Owner writing `gold22kPer10g: "72000"` (string instead of number) to `/rates/live`.
6. Owner writing client-forged `updatedAt` timestamp instead of `request.time`.
7. Owner injecting shadow field `isAdminOverride: true` into `/rates/live`.
8. Writing to invalid document ID `/rates/hacked` (only `live` allowed).
9. Writing 2KB string into `gstNote` (exceeds `maxLength: 140`).
10. Public unauthenticated read of `/rateHistory/{entryId}`.
11. Attempting `update` or `delete` on immutable `/rateHistory/{entryId}`.
12. Creating `/rateHistory/{entryId}` with `updatedByUid` set to another user's UID.
