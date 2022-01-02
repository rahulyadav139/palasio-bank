import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Account from './pages/Account';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/welcome" element={<Welcome />} />}
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/account"
          element={<Navigate to="/account/overview" element={<Account />} />}
        />
        <Route path="/account/*" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
