import { Outlet } from 'react-router-dom'; // 1. Importe o Outlet
import Sidebar from './components/Sidebar';

function App() {
  // 2. Removemos o 'useState' e a importação do Dashboard daqui

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default App;