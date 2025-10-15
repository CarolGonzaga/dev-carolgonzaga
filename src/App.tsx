import { Outlet, useNavigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';

import ContactModal from './components/ContactModal';

import LogoutModal from './components/LogoutModal';

import { useSidebar } from './context/SidebarContext';



function App() {

  const navigate = useNavigate();



  const {

    isContactModalOpen,

    closeContactModal,

    isLogoutModalOpen,

    closeLogoutModal

  } = useSidebar();



  const handleLogout = () => {

    console.log("Logout confirmado! Redirecionando...");

    closeLogoutModal();

    navigate('/logout');

  };



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



      <LogoutModal

        isOpen={isLogoutModalOpen}

        onClose={closeLogoutModal}

        onConfirm={handleLogout}

      />

    </div>

  )

}



export default App;