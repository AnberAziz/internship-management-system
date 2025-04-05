import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import InternDashboard from './components/InternDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/interns" element={<AdminDashboard />} />
        <Route path="/admin/tasks" element={<AdminDashboard />} />
        <Route path="/intern" element={<InternDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;