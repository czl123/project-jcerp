import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import MaterialManagement from '../modules/material-management';
import ProposalManagement from '../modules/proposal-management';
import InventoryManagement from '../modules/inventory';
import ResumeAgent from '../modules/resume-agent'; // 👈 新增引入
import { AppProvider } from '../store/context';

function AppRoutes() {
  return (
      <AppProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/product/material" element={<MaterialManagement />} />
            <Route path="/product/propose" element={<ProposalManagement />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/resume-agent" element={<ResumeAgent />} /> {/* 👈 新增路由 */}
            <Route path="/" element={<MaterialManagement />} />
          </Route>
        </Routes>
      </AppProvider>
  );
}

export default AppRoutes;