import './index.css'
import {
  RouterProvider,
} from "react-router";
import './app.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './Component/AuthContext/AuthContext.jsx';
import { router } from './Routes/Routes.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
  <RouterProvider router={router} />
  </AuthProvider>
  </StrictMode>,
)
