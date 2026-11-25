import { useEffect, useState } from 'react';
import { CollectionCategory, JewelleryItem, PageRoute } from './types';
import { useBullionRates } from './hooks/useBullionRates';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloatButton } from './components/WhatsAppFloatButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CollectionPage } from './pages/CollectionPage';
import { RatesPage } from './pages/RatesPage';
import { LocationPage } from './pages/LocationPage';
import { ContactPage } from './pages/ContactPage';

const VALID_PAGES: PageRoute[] = ['home', 'about', 'collection', 'rates', 'location', 'contact'];

function getInitialPage(): PageRoute {
  const hash = window.location.hash.replace('#', '') as PageRoute;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage);
  const [preselectedItem, setPreselectedItem] = useState('');
  const [activeCategory, setActiveCategory] = useState<CollectionCategory>('all');
  const [activeCollectionItem, setActiveCollectionItem] = useState<JewelleryItem | null>(null);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  const {
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
  } = useBullionRates();

  // Listen for Google Maps Platform quota exceeded event
  useEffect(() => {
    const handleQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Sync URL hash for browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: PageRoute) => {
    setCurrentPage(page);
    if (page !== 'collection') {
      setActiveCollectionItem(null);
    }
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquireItem = (itemName: string) => {
    setPreselectedItem(itemName);
    navigate('contact');
  };

  const handleSelectCollectionItem = (item: JewelleryItem) => {
    setActiveCategory(item.category);
    setActiveCollectionItem(item);
    setCurrentPage('collection');
    window.location.hash = 'collection';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCategory = (category: CollectionCategory) => {
    setActiveCategory(category);
    setActiveCollectionItem(null);
    setCurrentPage('collection');
    window.location.hash = 'collection';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#181315]">
        {mapsQuotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        <Header currentPage={currentPage} onNavigate={navigate} />

        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              rates={rates}
              ratesLoading={ratesLoading}
              onNavigate={navigate}
              onInquireItem={handleInquireItem}
              onSelectCollectionItem={handleSelectCollectionItem}
              onExploreCategory={handleExploreCategory}
            />
          )}

          {currentPage === 'about' && <AboutPage onNavigate={navigate} />}

          {currentPage === 'collection' && (
            <CollectionPage
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              selectedItem={activeCollectionItem}
              onSelectItem={setActiveCollectionItem}
              onInquireItem={handleInquireItem}
            />
          )}

          {currentPage === 'rates' && (
            <RatesPage
              rates={rates}
              ratesLoading={ratesLoading}
              ratesError={ratesError}
              user={user}
              authReady={authReady}
              isOwner={isOwner}
              history={history}
              saving={saving}
              onSignIn={signInOwner}
              onSignOut={signOutOwner}
              onPublishRates={publishRates}
            />
          )}

          {currentPage === 'location' && <LocationPage />}

          {currentPage === 'contact' && (
            <ContactPage preselectedItem={preselectedItem} />
          )}
        </main>

        <Footer onNavigate={navigate} />

        <WhatsAppFloatButton
          currentPage={currentPage}
          activeCategory={activeCategory}
          activeItem={activeCollectionItem}
          preselectedItem={preselectedItem}
          rates={rates}
        />
      </div>
    </ErrorBoundary>
  );
}
