import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ScrollProvider } from './context/ScrollContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { NotFound } from './pages/NotFound';
import { Preloader } from './components/motion/Preloader';
import { PageTransition } from './components/motion/PageTransition';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [, setPreloaderDone] = useState(false);

  return (
    <>
      {/* Editorial Name Reveal Preloader (under 2s, skippable) */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            {/* Project detail route */}
            <Route
              path="/project/:id"
              element={
                <PageTransition>
                  <ProjectDetail />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollProvider>
        <AppContent />
      </ScrollProvider>
    </BrowserRouter>
  );
};

export default App;
