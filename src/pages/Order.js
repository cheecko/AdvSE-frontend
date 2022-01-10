import { useState, useEffect, useContext, Fragment } from 'react'
import { Container, Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import { IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_DOMAIN } from '../utils/constants'
import { GlobalContext } from '../contexts/GlobalContext'
import Header from '../components/Header'
import Toast from '../components/Toast'

const Order = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState([])
  const [toastMessage, setToastMessage] = useState('')

  const handleRemoveFromWishlist = (id) => {
    dispatch({
      type: 'saveWishlists',
      payload: state.wishlists.filter(wishlist => wishlist !== id)
    })
    setToastMessage('Das gewünschte Produkt wurde aus dem Wunschzettel entfernt.')
  }

  const handleSubmitEmail = (event) => {
    event.preventDefault()
    const params = { email: email }
    axios.get(`${BACKEND_DOMAIN}/api/v1/orders/`, { params: params }).then(response => setOrders(response.data))
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleToastClose = () => {
    setToastMessage('')
  }

  console.log(state)

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
      </Container>
      <Toast message={toastMessage} type='success' handleToastClose={handleToastClose} />
    </>
  )
}

export default Order