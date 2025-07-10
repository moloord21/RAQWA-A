import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { useAuth } from './hooks/useAuth';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/info" element={<HomePage />} />
        <Route path="/admin" element={<AdminRoute />} />
        {/* يمكنك إضافة صفحة رئيسية فارغة أو توجيه المستخدم مباشرة إلى /info إذا لم تكن بحاجة لصفحة رئيسية على المسار الأساسي / */}
        <Route path="/" element={<Navigate to="/info" replace />} />
        <Route path="*" element={<Navigate to="/info" replace />} /> {/* التأكد من توجيه أي مسارات غير معروفة إلى /info */}
      </Routes>
    </Router>
  );
}

const AdminRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <AdminPanel /> : <AdminLogin />;
};

export default App;
