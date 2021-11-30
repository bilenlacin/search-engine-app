import './components/landing/LandingPage.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import ResultPage from './components/result/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/result' element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
