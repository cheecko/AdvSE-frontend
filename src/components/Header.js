import { AppBar, Toolbar, Box, Typography, CardMedia, Badge } from '@mui/material';
import { WishlistIcon, CartIcon } from './../components/SvgIcon'

const Header = () => {
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Badge badgeContent={4} color='error'>
                <WishlistIcon />
              </Badge>
              <Typography variant='caption'>
                Wunschartikel
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Badge badgeContent={4} color='error'>
                <CartIcon />
              </Badge>
              <Typography variant='caption'>
                Warenkorb
              </Typography>
            </Box>
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