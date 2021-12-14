import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card, CardMedia, Box, Grid, Typography, FormControl, FormControlLabel, RadioGroup, Radio, Button  } from '@mui/material'
import axios from 'axios'
import { MAX_ORDER_QUANTITY_PER_ITEM } from './../utils/constants'
import { GlobalContext } from './../contexts/GlobalContext'
import { WishlistIcon } from './../components/SvgIcon'
import Header from './../components/Header'
import SimpleAccordion from './../components/SimpleAccordion'
import Toast from './../components/Toast'

const ItemDetail = () => {
  const { id } = useParams()
  const { state, dispatch } = useContext(GlobalContext)
  const [item, setItem] = useState()
  const [variant, setVariant] = useState('')
  const [toastType, setToastType] = useState('success')
  const [toastMessage, setToastMessage] = useState('')

  const handleAddToWishlist = () => {
    dispatch({
      type: 'saveWishlists',
      payload: state.wishlists.includes(item.id) ? state.wishlists.filter(wishlist => wishlist !== item.id) : [...state.wishlists, item.id]
    })
  }

  const handleAddToCart = () => {
    const itemInCart = state.carts.items.find(cart => cart.id === item.id && cart.variant.size === variant)
    if(itemInCart?.quantity >= MAX_ORDER_QUANTITY_PER_ITEM) {
      setToastType('error')
      setToastMessage('Die Höchstbestellmenge beträgt 3')
    }else{
      dispatch({
        type: 'saveCarts',
        payload: itemInCart
          ? state.carts.items.map(cart => cart.id === item.id && cart.variant.size === variant ? {...cart, quantity: cart.quantity + 1} : cart)
          : [...state.carts.items, {id: item.id, brand_name: item.brand_name, name: item.name, type_name: item.type_name, image: item.image, variant: item.variants.find(itemVariant => itemVariant.size === variant), quantity: 1}]
      })
      setToastType('success')
      setToastMessage('Artikel wurde in den Warenkorb gelegt')
    }
  }

  const handleChangeVariant = (event) => {
    setVariant(parseInt(event.target.value))
  }

  const handleToastClose = () => {
    setToastMessage('')
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/items/${id}`).then(response => {
      setItem(response.data)
      setVariant(response.data.variants[0]?.size ?? '')
    })
  }, [id])

  console.log(state)

  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Grid container sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={4}>
            <CardMedia
              component='img'
              alt={`${item?.brand_name} ${item?.name}`}
              image={item?.image}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant='h5' sx={{ fontWeight: 600 }}>
                {item?.brand_name}
              </Typography>
              <Typography variant='h5' sx={{ fontWeight: 600 }}>
                {item?.name}
              </Typography>
              <Typography variant='subtitle1' color='text.secondary'>
                {item?.type_name}
              </Typography>
            </Box>
            <FormControl component='fieldset' sx={{ width: '100%', marginBottom: 1 }}>
              <RadioGroup value={variant} onChange={handleChangeVariant} sx={{ gap: 1 }}>
                {item?.variants.map((variant, index) => (
                  <Card elevation={4} sx={{ display: 'flex', padding: 2 }} key={index}>
                    <FormControlLabel
                      disableTypography
                      value={variant.size}
                      disabled={variant.stock <= 0}
                      control={<Radio sx={{ color: '#000000', '&.Mui-checked': { color: '#212121' } }} />}
                      label={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='subtitle1'>
                              {variant.size} ml
                            </Typography>
                            <Typography variant='caption' color='text.secondary'>
                              {variant.base_price.toFixed(2)} € / 100 ml
                            </Typography>
                          </Box>
                          {variant.stock <= 0 &&
                            <Typography variant='h6' sx={{ fontWeight: 600, color: '#C74E4D' }}>
                              Ausverkauft
                            </Typography>
                          }
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Typography variant='subtitle1' sx={{ fontWeight: 600, color: variant.discount_percentage > 0 ? '#C74E4D' : 'inherit' }}>
                              {variant.price.toFixed(2)} €
                            </Typography>
                            {variant.discount_percentage !== 0 &&
                              <Box sx={{ display:'flex', gap: 0.5 }}>
                                <Typography variant='caption' component='div' sx={{ color: '#C74E4D' }}>
                                  - {variant.discount_percentage}%
                                </Typography>
                                <Typography variant='caption' component='div'>
                                  |
                                </Typography>
                                <Typography variant='caption' component='div' color='text.secondary' sx={{ textDecoration: 'line-through' }}>
                                  {variant.original_price.toFixed(2)} €
                                </Typography>
                              </Box>
                            }
                          </Box>
                        </Box>
                      }
                      sx={{ width: '100%', gap: 2 }}
                    />
                  </Card>
                ))}
              </RadioGroup>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Card raised sx={{ flexShrink: 1 }}>
                <Button variant='outlined' onClick={handleAddToWishlist} sx={{ borderColor: '#000000', '&:hover': { borderColor: '#212121' } }}>
                  <WishlistIcon variant={state.wishlists.includes(item?.id) ? 'filled' : 'outlined'} />
                </Button>
              </Card>
              <Card raised sx={{ flexGrow: 1 }} >
                <Button variant='contained' onClick={handleAddToCart} sx={{ fontWeight: 600, textTransform: 'capitalize', width: '100%', color: '#FFFFFF', backgroundColor: '#000000', '&:hover': {color: '#FFFFFF', backgroundColor: '#212121'} }}>In den Warenkorb</Button>
              </Card>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ marginBottom: 2 }}>
          {item?.description &&
            <Grid item xs={12} sm={6}>
              <SimpleAccordion summary='Produkdetails' detail={item?.description} sx={{ flexGrow: 0 }} />
            </Grid>
          }
          {item?.instruction &&
            <Grid item xs={12} sm={6}>
              <SimpleAccordion summary='Anwendung' detail={item?.instruction} sx={{ flexGrow: 1 }} />
            </Grid>
          }
        </Grid>
      </Container>
      <Toast message={toastMessage} type={toastType} handleToastClose={handleToastClose} />
    </>
  )
}

export default ItemDetail