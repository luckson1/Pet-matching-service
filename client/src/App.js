import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoute from './components/navigation/adminRoute';
import ProtectedRoute from './components/navigation/protectedRoute';
import NotAdmin from './components/notAdmin';
import { Whatsapp } from './components/whatsapp';
import { AdminDashboard } from './pages/AdminDashboard';
import AdoptersData from './pages/AdoptersData';
import { Dashboard } from './pages/Dashboard';
import { DonerOnboarding } from './pages/DonerOnBoarding';
import { FavouritePets } from './pages/FavouritePets';
import { Home } from './pages/Home';
import { Onboarding } from './pages/Onboarding';
import PetsData from './pages/PetsData';
import RegistrationSuccess from './pages/RegistrationSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/not-admin" element={<NotAdmin />} />
        <Route exact path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
        <Route exact path="/admin-dashboard" element={<AdminRoute>
            <AdminDashboard/>
          </AdminRoute>} />
        <Route exact path="/onboarding" element={
            <Onboarding />} />
                  <Route exact path="/doner-onboarding" element={
            <DonerOnboarding />} />
        <Route exact path="/favourite-pets" element={<ProtectedRoute>
            <FavouritePets />
          </ProtectedRoute>} />
          <Route exact path="/register-success" element={<ProtectedRoute>
            <RegistrationSuccess />
          </ProtectedRoute>} />
          <Route exact path="/adopters" element={<ProtectedRoute>
            <AdoptersData />
          </ProtectedRoute>} />
          <Route exact path="/all-pets" element={<ProtectedRoute>
            <PetsData />
          </ProtectedRoute>} />

      </Routes>
      <Whatsapp />
    </BrowserRouter>
  );
}

export default App;
