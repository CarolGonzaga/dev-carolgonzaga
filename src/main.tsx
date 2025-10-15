import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { SidebarProvider } from './context/SidebarContext';
import { GitHubDataProvider } from './context/GitHubDataContext';

import './styles/main.scss';

import App from './App';
import Dashboard from './pages/Dashboard';
import Resumo from './pages/Resumo';
import Portfolio from './pages/Portfolio';
import Certificates from './pages/Certificates';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/resumo', element: <Resumo /> },
      { path: '/portfolio', element: <Portfolio /> },
      { path: '/certificados', element: <Certificates /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <GitHubDataProvider>
          <RouterProvider router={router} />
        </GitHubDataProvider>
      </SidebarProvider>
    </ThemeProvider>
  </React.StrictMode>
);