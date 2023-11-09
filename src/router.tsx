import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { AdsPage, NotFound, ProfilePage, RegistrationPage, RoomsPage, SignInPage } from '@/pages'
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
    element: <AdsPage />,
    path: '/adsPage',
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
  const isAuthenticated = getFromLocalStorage('token')

  return isAuthenticated !== 0 ? <Outlet /> : <Navigate to={'/login'} />
}
