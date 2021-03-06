import { useState, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Box, Grid, Typography, CardMedia, FormControl, Select, MenuItem, Divider, Button } from '@mui/material'
import { FREE_DELIVERY_SUBTOTAL_PRICE } from './../utils/constants'
import { round2Decimal } from './../utils/functions'
import { GlobalContext } from './../contexts/GlobalContext'
import Header from './../components/Header'
import Toast from './../components/Toast'

const Cart = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const [toastMessage, setToastMessage] = useState('')

  const handleAddToWishlist = (itemId) => {
    dispatch({
      type: 'saveWishlists',
      payload: state.wishlists.includes(itemId) ? state.wishlists : [...state.wishlists, itemId]
    })
    setToastMessage('Das Produkt wurde deinem Wunschzettel hinzugefügt')
  }

  const handleRemoveFromCart = (index) => {
    dispatch({
      type: 'saveCarts',
      payload: state.carts.items.filter((item, itemIndex) => itemIndex !== index)
    })
    setToastMessage('Das gewünschte Produkt wurde aus dem Warenkorb entfernt.')
  }

  const handleChangeQuantity = (event, index) => {
    state.carts.items[index].quantity = event.target.value
    dispatch({
      type: 'saveCarts',
      payload: state.carts.items
    })
  }

  const handleToastClose = () => {
    setToastMessage('')
  }

  console.log(state)

  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Grid container spacing={6} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                Warenkorb
              </Typography>
              <Typography variant='subtitle1'>
                {state.carts.totalQuantity} Produkte
              </Typography>
            </Box>
            <Typography variant='subtitle2' sx={{ marginBottom: 1 }}>
              Artikel im Warenkorb werden nicht reserviert.
            </Typography>
            <Box sx={{ marginBottom: 1 }}>
              {state.carts.items.map((item, index) => (
                <Fragment key={index}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                      <CardMedia
                        component='img'
                        alt={`${item.brand_name} ${item.name}`}
                        image={item.image}
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                        {item.brand_name}
                      </Typography>
                      <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                      <Typography variant='subtitle2' color='text.secondary'>
                        {item.type_name} {item.variant.size} ml
                      </Typography>
                      <Box sx={{ display:'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormControl size='small' margin='normal' sx={{ minWidth: 80 }}>
                          <Select
                            value={item.quantity}
                            onChange={(e) => handleChangeQuantity(e, index)}
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                          </Select>
                        </FormControl>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          {item.variant.discount_percentage !== 0 &&
                            <>
                              <Typography variant='subtitle2' sx={{ textDecoration: 'line-through', marginBottom: 0.5 }}>
                                {item.variant.original_price.toFixed(2)} €
                              </Typography>
                              <Typography variant='subtitle1' sx={{ fontWeight: 600, color: '#C74E4D' }}>
                                - {item.variant.discount_percentage}% | {item.variant.price.toFixed(2)} €
                              </Typography>
                            </>
                          }
                          {item.variant.discount_percentage === 0 &&
                            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                              {item.variant.price.toFixed(2)} €
                           </Typography>
                          }
                          <Typography variant='caption' color='text.secondary'>
                            {item.variant.base_price.toFixed(2)} € / {item.variant.base_size} ml
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display:'flex', alignItems: 'center', gap: 3 }}>
                        <Typography variant='subtitle2' color='success.main' sx={{ fontWeight: 600, flexGrow: 1 }}>
                          Auf Lager
                        </Typography>
                        <Button color='inherit' sx={{ fontWeight: 600, textTransform: 'capitalize' }} onClick={() => handleAddToWishlist(item.id)}>
                          Auf den Wunschzettel
                        </Button>
                        <Button color='inherit' sx={{ fontWeight: 600, textTransform: 'capitalize' }} onClick={() => handleRemoveFromCart(index)}>
                          Löschen
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                </Fragment>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography variant='subtitle1'>
                Gesamtpreis:
              </Typography>
              <Typography variant='subtitle1'>
                {state.carts.subtotal} €
              </Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='subtitle1'>
                  Versandkosten:
                </Typography>
                <Typography variant='subtitle1' color={state.carts.shippingCost > 0 ? 'inherit' : 'success.main'}>
                  {state.carts.shippingCost > 0 ? state.carts.shippingCost : 0.00} €
                </Typography>
              </Box>
              {state.carts.shippingCost > 0 &&
                <Typography variant='subtitle2' color='success.main'>
                  Nur noch {round2Decimal(FREE_DELIVERY_SUBTOTAL_PRICE - state.carts.subtotal)} € bis zum Gratisversand!
                </Typography>
              }
            </Box>
            <Box sx={{ marginBottom: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                  Gesamtsumme:
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                  {state.carts.total} €
                </Typography>
              </Box>
              <Typography variant='subtitle2' color='text.secondary' sx={{ fontWeight: 600 }}>
                inkl. Mwst.
              </Typography>
            </Box>
            <Link to={{ pathname: `/checkout` }} style={{ textDecoration: 'unset' }} >
              <Button variant='contained' fullWidth sx={{ fontWeight: 600, textTransform: 'capitalize', color: '#FFFFFF', backgroundColor: '#000000', '&:hover': {color: '#FFFFFF', backgroundColor: '#212121'} }}>
                Zur Kasse
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Toast message={toastMessage} type='success' handleToastClose={handleToastClose} />
    </>
  )
}

export default Cart