import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from './AuthContextComponent';
import { useNavigate } from 'react-router-dom';

export default function HeaderComponent() {
  /* from AuthContextComponent */
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const logoutUser = () => {
    logout(); 
    navigate("/login");
  };

  /* handle opening the dropdown menu */
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  /* handle closing the dropdown menu */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /* handle navigation when menu item is clicked */
  const handleMenuItemClick = (path: string) => {
    navigate(path);
    /* close the menu after clicking */
    handleMenuClose(); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: 'black'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            /* open the menu when clicked */
            onClick={handleMenuClick} 
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              color: 'white',
            }}
          >
            TodoList
          </Typography>

          {isAuthenticated ? (
              <Button onClick={logoutUser} color="inherit">Logout</Button>
            ) : (
              <Button href="/login" color="inherit">Login</Button>
            )}

          {/* dropdown Menu */}
          <Menu
            /* menu opens anchored to the icon button */
            anchorEl={anchorEl} 
            /* open the menu if anchorEl is not null */
            open={Boolean(anchorEl)} 
            /* close the menu */
            onClose={handleMenuClose} 
          >
            {isAuthenticated ? (
              <>
                <MenuItem onClick={() => handleMenuItemClick('/account')}>My Account</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('')}>Start</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/tasks')}>Tasks</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => handleMenuItemClick('')}>Start</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/signup')}>SignUp</MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}