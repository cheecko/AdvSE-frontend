import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Box, Typography, Badge } from '@mui/material'
import { GlobalContext } from './../contexts/GlobalContext'
import { WishlistIcon, CartIcon } from './../components/SvgIcon'

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
        <Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flexGrow: 1 }} />
          {/* add our login here here */}
          <Box sx={{ display: 'flex', gap: 2, paddingTop: 1 }}>
            <Link to={{ pathname: '/' }} style={{ color: 'inherit', textDecoration: 'unset' }} >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <Badge badgeContent={state.wishlists.length} color='error'>
                  <WishlistIcon />
                </Badge>
                <Typography variant='caption'>
                  Wunschartikel
                </Typography>
              </Box>
            </Link>
            <Link to={{ pathname: '/cart' }} style={{ color: 'inherit', textDecoration: 'unset' }} >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                <Badge badgeContent={state.carts.reduce((a, b) => { return {quantity: a.quantity + b.quantity} }, {quantity: 0}).quantity} color='error'>
                  <CartIcon />
                </Badge>
                <Typography variant='caption'>
                  Warenkorb
                </Typography>
              </Box>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar position='static' color='transparent' sx={{ boxShadow: 'none', padding: 2 }}>
        <Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
          {/* add category list here */}
        </Toolbar>
      </AppBar>
      <AppBar position='static' color='transparent' sx={{ boxShadow: 'none', padding: 2 }}>
        <Toolbar variant='dense' sx={{ justifyContent: 'space-between' }}>
          {/* add search here */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header