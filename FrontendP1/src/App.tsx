import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './hooks/useAuth';
import { DiagnosisProvider } from './hooks/useDiagnosis';
import { ThemeProvider } from './hooks/useTheme';
import { ToastProvider } from './components/ui/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import SkipLink from './components/SkipLink';
import FeedbackButton from './components/FeedbackButton';
import Login from './pages/Login';
import Register from './pages/Register';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PropertyData = lazy(() => import('./pages/PropertyData'));
const Sections = lazy(() => import('./pages/Sections'));
const DiagnosisInProgress = lazy(() => import('./pages/DiagnosisInProgress'));
const Result = lazy(() => import('./pages/Result'));
const HistorialDiagnosticos = lazy(() => import('./pages/HistorialDiagnosticos'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const EvolutionChart = lazy(() => import('./pages/EvolutionChart'));

function PageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark-bg">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

function DiagnosisLayout() {
  return (
    <DiagnosisProvider>
      <Outlet />
    </DiagnosisProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ToastProvider>
          <ThemeProvider>
            <AuthProvider>
              <BrowserRouter>
                <SkipLink />
                <FeedbackButton />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/landing" element={<Suspense fallback={<PageSpinner />}><LandingPage /></Suspense>} />
                  <Route path="/admin" element={<ProtectedRoute><Suspense fallback={<PageSpinner />}><AdminDashboard /></Suspense></ProtectedRoute>} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<PageSpinner />}>
                          <Dashboard />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/historial"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<PageSpinner />}>
                          <HistorialDiagnosticos />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/evolucion"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<PageSpinner />}>
                          <EvolutionChart />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    element={
                      <ProtectedRoute>
                        <DiagnosisLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route
                      path="/datos-inmueble"
                      element={
                        <Suspense fallback={<PageSpinner />}>
                          <PropertyData />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/secciones"
                      element={
                        <Suspense fallback={<PageSpinner />}>
                          <Sections />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/diagnostico/:categoryId"
                      element={
                        <Suspense fallback={<PageSpinner />}>
                          <DiagnosisInProgress />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/resultado"
                      element={
                        <Suspense fallback={<PageSpinner />}>
                          <Result />
                        </Suspense>
                      }
                    />
                  </Route>
                  <Route path="/" element={<Navigate to="/landing" replace />} />
                  <Route path="*" element={<Navigate to="/landing" replace />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </ThemeProvider>
        </ToastProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
