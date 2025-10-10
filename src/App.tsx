import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {

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