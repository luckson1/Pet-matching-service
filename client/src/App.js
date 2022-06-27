import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoute from './components/navigation/adminRoute';
import ProtectedRoute from './components/navigation/protectedRoute';
import NotAdmin from './components/notAdmin';
import { Whatsapp } from './components/whatsapp';
import { AdminDashboard } from './pages/AdminDashboard';
import { Dashboard } from './pages/Dashboard';
import { FavouritePets } from './pages/FavouritePets';
import { Home } from './pages/Home';
import { Onboarding } from './pages/Onboarding';
import { PetOnboarding } from './pages/PetOnboarding';

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
        <Route exact path="/onboarding" element={<ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>} />
        <Route exact path="/pet-onboarding" element={<ProtectedRoute>
            <PetOnboarding />
          </ProtectedRoute>} />
        <Route exact path="/favourite-pets" element={<ProtectedRoute>
            <FavouritePets />
          </ProtectedRoute>} />

      </Routes>
      <Whatsapp />
    </BrowserRouter>
  );
}

export default App;
