import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/app_context/AppContext.tsx';
import { SidebarProvider } from './components/ui/sidebar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <SidebarProvider defaultOpen={true}>
          <App />
        </SidebarProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
