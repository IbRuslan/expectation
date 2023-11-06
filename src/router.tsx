import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { NotFound, ProfilePage, RegistrationPage, RoomsPage, SignInPage } from '@/pages'

const publicRoutes: RouteObject[] = [
  {
    element: <RoomsPage />,
    path: '/',
  },
  {
    element: <SignInPage />,
    path: '/login',
  },
  {
    element: <RegistrationPage />,
    path: '/registration',
  },
  {
    element: <div>Rooms</div>,
    path: '/rooms/:roomsId',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <ProfilePage />,
    path: '/profile',
  },
  {
    element: <div>Мои Обьявления</div>,
    path: '/ads',
  },
  {
    element: <div>Избранное</div>,
    path: '/favorites',
  },
]

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
  {
    element: <NotFound />,
    path: '*',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
