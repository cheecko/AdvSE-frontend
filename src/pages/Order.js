import { useState, useEffect, useContext } from 'react'
import { Container, Box, Typography, TextField, InputAdornment, IconButton, Button, Card, CardActionArea, CardContent, CardMedia, Grid } from '@mui/material'
import { IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/de'
import { BACKEND_DOMAIN, EMAIL_REGEX, ORDER_STATUS } from '../utils/constants'
import { GlobalContext } from '../contexts/GlobalContext'
import { OrderIcon } from './../components/SvgIcon'
import Header from '../components/Header'
import Toast from '../components/Toast'

const Order = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState([])
  const [toastMessage, setToastMessage] = useState('')
  moment.locale('de')

  const status = {
		[ORDER_STATUS.CANCELED]: {
			name: 'Storniert',
			color: '#c10015',
      backgroundColor: '#ffebee'
		},
		[ORDER_STATUS.IN_PROCESS]: {
			name: 'In Bearbeitung',
			color: '#3f51b5',
      backgroundColor: '#e8eaf6'
		},
		[ORDER_STATUS.SENT]: {
			name: 'Versendet',
			color: '#21ba45',
      backgroundColor: '#e8f5e9'
		}
	}

  const handleSubmitEmail = (event) => {
    if(event) event.preventDefault()
    if (email === '' || !EMAIL_REGEX.test(email)) {
      setToastMessage('Bitte fülle die richtige Email aus')
      return
    }

    const params = { email: email }
    axios.get(`${BACKEND_DOMAIN}/api/v1/orders/`, { params: params }).then(response => setOrders(response.data))
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleToastClose = () => {
    setToastMessage('')
  }

  useEffect(() => {
    if(!email) return
    const timer = setTimeout(handleSubmitEmail, 1000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [email])

  console.log(orders)

  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Box sx={{ marginBottom: 1 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1 }}>
            Bestellungen
          </Typography>
          <form onSubmit={handleSubmitEmail}>
            <TextField
              variant='outlined'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <IoSearch />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleChangeEmail}
            />
          </form>
        </Box>
        {orders.map((order, index) => (
          <Card variant='outlined' key={index} sx={{ marginBottom: 1 }}>
            <CardActionArea sx={{ padding: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={2}>
                  <CardMedia
                    component='img'
                    image={order.image}
                    alt={order.name}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='subtitle1'>
                        Bestelldatum
                      </Typography>
                      <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                        {moment(order.created).format('L')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='subtitle1'>
                        Bestellnr.
                      </Typography>
                      <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                        {`${moment(order.created).format('DDMMYYhhmmss')}${order.id}`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='subtitle1'>
                        Produkte
                      </Typography>
                      <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                        {order.total_quantity}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='subtitle1'>
                        Gesamtsumme
                      </Typography>
                      <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                        {order.total.toFixed(2)} €
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='subtitle1'>
                        Status
                      </Typography>
                      <Button variant='text' sx={{ fontWeight: 600, textTransform: 'capitalize', color: status[order.status]?.color, backgroundColor: status[order.status]?.backgroundColor, '&:hover': {color: status[order.status]?.color, backgroundColor: status[order.status]?.backgroundColor} }}>
                        {status[order.status]?.name}
                      </Button>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        ))}
        {orders.length === 0 &&
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Box sx={{ padding: 2 }}>
              <OrderIcon sx={{ width: 32, height: 32 }} />
            </Box>
            <Typography variant='subtitle1' sx={{ fontWeight: 600, marginBottom: 2, textAlign: 'center' }}>
              Du hast noch keine Bestellung in deinem Konto.
            </Typography>
            <Typography variant='subtitle2' sx={{ marginBottom: 4, textAlign: 'center' }}>
              Starte jetzt mit einem Blick auf unser Angebot
            </Typography>
            <Link to={{ pathname: '/' }} style={{ color: 'inherit', textDecoration: 'unset' }} >
              <Button variant='contained' size='large' sx={{ fontWeight: 600, textTransform: 'capitalize', color: '#FFFFFF', backgroundColor: '#000000', '&:hover': {color: '#FFFFFF', backgroundColor: '#212121'} }}>
                Los geht's
              </Button>
            </Link>
          </Box>
        }
      </Container>
      <Toast message={toastMessage} type='error' handleToastClose={handleToastClose} />
    </>
  )
}

export default Order