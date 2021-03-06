import { Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, CardMedia } from '@mui/material'
import { LockIcon } from './../components/SvgIcon'

const CheckoutHeader = () => {
  return (
    <Container maxWidth='lg'>
      <AppBar position='static' color='transparent' sx={{ boxShadow: 'none', padding: 2 }}>
        <Toolbar disableGutters variant='dense' sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Link to={{ pathname: '/' }} style={{ color: 'inherit', textDecoration: 'unset', maxWidth: { xs: '50%', sm: '30%', lg: '20%'}, flexGrow: 0 }} >
            <CardMedia
              component='img'
              alt='AdvSE Logo'
              image='/static/advse-logo.jpg'
            />
          </Link>
          <LockIcon />
        </Toolbar>
      </AppBar>
    </Container>
  )
}

export default CheckoutHeader