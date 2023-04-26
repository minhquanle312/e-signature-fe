import useAuth from '@hooks/useAuth'
// import { Navigate, Outlet, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Box } from '../components/common'
import Dashboard from '@/components/dashboard/Dashboard'

export const ProtectedLayout = () => {
  const { userData } = useAuth()
  // const { chatId } = useParams()

  if (!userData) {
    return <Navigate to="/" />
  }

  // return <Dashboard />

  return (
    <Box className="flex w-full h-full overflow-x-hidden">
      <Dashboard />
      {/* <div
        className={`bg-gray-300 dark:bg-gray-500 right-menu-width ${
          chatId ? 'tab-active' : ''
        }`}
      >
        <Outlet />
      </div> */}
    </Box>
  )
}
