import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import {
  AdsPage,
  CreateAdPage,
  FavoritesPage,
  NotFound,
  ProfilePage,
  RegistrationPage,
  RoomPage,
  RoomsPage,
  SignInPage,
} from '@/pages'
import { getFromLocalStorage } from '@/utils/getFromLocalStorage'

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
    element: <RoomPage />,
    path: '/rooms/:roomId',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <ProfilePage />,
    path: '/profile',
  },
  {
    element: <AdsPage />,
    path: '/adsPage',
  },
  {
    element: <FavoritesPage />,
    path: '/favorites',
  },
  {
    element: <CreateAdPage />,
    path: '/createad',
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
  const isAuthenticated = getFromLocalStorage('token')

  return isAuthenticated !== 0 ? <Outlet /> : <Navigate to={'/login'} />
}
