import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ContactModal from './components/ContactModal';
import { useSidebar } from './context/SidebarContext';

function App() {
  const { isContactModalOpen, closeContactModal } = useSidebar();

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Outlet />
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
      />
    </div>
  )
}

export default App;