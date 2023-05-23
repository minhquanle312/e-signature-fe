import useAuth from '@/hooks/useAuth'
import DashboardIcon from '@mui/icons-material/Dashboard'
import KeyIcon from '@mui/icons-material/Key'
import LogoutIcon from '@mui/icons-material/Logout'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { Link } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified'

export const mainListItems = (
  <React.Fragment>
    <Link to="/">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="token-management">
      <ListItemButton>
        <ListItemIcon>
          <KeyIcon />
        </ListItemIcon>
        <ListItemText primary="Token" />
      </ListItemButton>
    </Link>
    <Link to="verify">
      <ListItemButton>
        <ListItemIcon>
          <VerifiedIcon />
        </ListItemIcon>
        <ListItemText primary="Verify" />
      </ListItemButton>
    </Link>
  </React.Fragment>
)

export const SecondaryListItems = () => {
  const { logout } = useAuth()
  return (
    <React.Fragment>
      <ListItemButton onClick={() => logout()}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  )
}
