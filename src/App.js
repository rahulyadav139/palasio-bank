import './App.css';
import { Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
