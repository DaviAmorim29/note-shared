import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "./components/AuthRoute.tsx";
import { MainLayout } from './components/layout/MainLayout.tsx';
import "./global.css";
import { Home } from "./pages/Notes/Home.tsx";
import { NotePage } from "./pages/Notes/Note/index.tsx";
import { LoginPage } from "./pages/login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/notes",
        element: (
        <AuthRoute>
          <Home />
        </AuthRoute>),
      },
      {
        path: "/notes/:noteId",
        element: (
        <AuthRoute>
          <NotePage />
        </AuthRoute>),
      }
    ],
  },
]);

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
