import { useState } from 'react'
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Dashboard />
      </main>
    </div>
  )
}

export default App
