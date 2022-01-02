import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Account from './pages/Account';
import NoPageFound from './pages/NoPageFound';
import { useSelector } from 'react-redux';

function App() {
  const login = useSelector(state => state.auth.login);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/welcome" element={<Welcome />} />}
        />
        <Route path="/welcome" element={<Welcome />} />
        {login && (
          <Route
            path="/account"
            element={<Navigate to="/account/overview" element={<Account />} />}
          />
        )}
        {login && <Route path="/account/*" element={<Account />} />}
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </div>
  );
}

export default App;
