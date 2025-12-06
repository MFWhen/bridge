import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import ExpensesPage from './components/ExpensesPage';
import IncomePage from './components/IncomePage';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <NavigationBar />
        <div style={{ padding: '1rem' }}>
          <Routes>
    
            <Route path="/" element={<LoginPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/income" element={<IncomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}