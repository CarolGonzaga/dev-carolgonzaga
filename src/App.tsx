import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SidebarToggle from './components/SidebarToggle';

function App() {

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <SidebarToggle />
        <Outlet />
      </main>
    </div>
  )
}

export default App;