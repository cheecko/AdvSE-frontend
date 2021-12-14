import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Box, Typography, Badge, CardMedia } from '@mui/material'
import { GlobalContext } from './../contexts/GlobalContext'
import { WishlistIcon, CartIcon, MenuIcon } from './../components/SvgIcon'

const Header = () => {
  const { state } = useContext(GlobalContext)

  return (
    <Box>
      <AppBar position='static' sx={{ backgroundColor: '#F5F5F5', color: 'black', boxShadow: 'none' }}>
        <Toolbar variant='dense' sx={{ display: { xs: 'none', sm: 'flex'}, justifyContent: 'space-between' }}>
          <Typography variant='caption'>
            Gratis Versand ab 19 €
          </Typography>
          <Typography variant='caption'>
            Bis zu 2 Gratisproben
          </Typography>
          <Typography variant='caption'>
            Zertifizierter Händler
          </Typography>
          <Typography variant='caption'>
            120 Tage Rückgaberecht
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position='static' color='transparent' sx={{ boxShadow: 'none', padding: 2 }}>
        <Toolbar disableGutters variant='dense' sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MenuIcon sx={{ display: { xs: 'flex', sm: 'none'} }} />
          </Box>
          <Link to={{ pathname: '/' }} style={{ color: 'inherit', textDecoration: 'unset', maxWidth: { xs: '50%', sm: '33.333%', lg: '25%'}, flexGrow: 0 }} >
            <CardMedia
              component='img'
              alt='AdvSE Logo'
              image='/static/advse-logo.jpg'
            />
          </Link>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 3, sm: 2}, paddingTop: 1, paddingRight: 1 }}>
            <Link to={{ pathname: '/' }} style={{ color: 'inherit', textDecoration: 'unset' }} >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <Badge badgeContent={state.wishlists.length} color='error'>
                  <WishlistIcon />
                </Badge>
                <Typography variant='caption' sx={{ display: { xs: 'none', sm: 'block'} }}>
                  Wunschartikel
                </Typography>
              </Box>
            </Link>
            <Link to={{ pathname: '/cart' }} style={{ color: 'inherit', textDecoration: 'unset' }} >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <Badge badgeContent={state.carts.totalQuantity} color='error'>
                  <CartIcon />
                </Badge>
                <Typography variant='caption' sx={{ display: { xs: 'none', sm: 'block'} }}>
                  Warenkorb
                </Typography>
              </Box>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <AppBar position='static' color='transparent' sx={{ boxShadow: 'none', padding: 2 }}>
        <Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
          
        </Toolbar>
      </AppBar>
      <AppBar position='static' color='transparent' sx={{ boxShadow: 'none', padding: 2 }}>
        <Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
          
        </Toolbar>
      </AppBar> */}
    </Box>
  )
}

export default Header