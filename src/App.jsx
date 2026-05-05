import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ManufacturerDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manufacturer/:id" element={<ManufacturerDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
