import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { Onboarding } from './pages/Onboarding';
import { PetOnboarding } from './pages/PetOnboarding';

function App() {
  return (
    <BrowserRouter>
         <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/onboarding" element={<Onboarding />} />
        <Route exact path="/pet-onboarding" element={<PetOnboarding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
