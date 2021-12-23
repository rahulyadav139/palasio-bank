import './App.css';
import { Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';

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
