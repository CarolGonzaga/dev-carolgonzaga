import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { SidebarProvider } from './context/SidebarContext';

// Importe seu SASS principal
import './styles/main.scss';

// Importe seu layout e páginas
import App from './App';
import Dashboard from './pages/Dashboard';
import Resumo from './pages/Resumo';

// Configuração do roteador (você já tem isso)
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/resumo',
        element: <Resumo />,
      },
    ],
  },
]);

// 2. ENVOLVA A APLICAÇÃO COM OS PROVIDERS
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>      {/* <-- Provider para o tema */}
      <SidebarProvider>  {/* <-- Provider para a sidebar */}
        <RouterProvider router={router} /> {/* <-- Sua aplicação com as rotas */}
      </SidebarProvider>
    </ThemeProvider>
  </React.StrictMode>
);