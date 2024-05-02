import { AppBar, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom'   

function Header() {
    const navigate = useNavigate();
  return (
    <div>
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                />

                <Typography
                    variant='h6'
                    component='div'
                    sx={{ flexGrow: 1 }}
                    style={{ marginRight: '30%' }}
                    onClick={()=> navigate('/')}
                >
                    <Link style={{ color: 'white', textDecoration: 'none' }}>
                        Order Record
                    </Link>
                </Typography>

                <Button 
                onClick={()=> navigate('/addClient')}
                 style={{ color: 'white', textDecoration: 'none' }}>Add Client</Button>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header