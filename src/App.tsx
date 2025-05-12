import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { protectedRoutes } from './routes/protected-routes';
import { AuthProvider } from './hooks/use-auth';
import { AppProvider } from './providers/AppProvider';
import { marketplaceRoutes } from './routes/marketplace-routes';
import { authRoutes } from './routes/auth-routes';
import { PageLoader } from './routes/page-loader';
import { resourceRoutes } from './routes/resource-routes';
import CompliancePage from './pages/CompliancePage';

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <AppProvider>
          <AuthProvider>
            <Routes>
              {authRoutes}
              {protectedRoutes}
              {marketplaceRoutes}
              {resourceRoutes}
              <Route path="/compliance" element={<CompliancePage />} />
            </Routes>
          </AuthProvider>
        </AppProvider>
      </Suspense>
    </Router>
  );
}

export default App;
