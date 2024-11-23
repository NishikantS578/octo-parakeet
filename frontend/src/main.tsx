import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, LoaderFunction, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Dashboard, { loader as dashboardLoader } from './Dashboard.tsx'
import ErrorPage from './Error.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "user/:userId",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    loader: dashboardLoader as unknown as LoaderFunction<any>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
