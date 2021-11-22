import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card, CardMedia, Box, Grid, Typography, FormControl, FormControlLabel, RadioGroup, Radio, Button  } from '@mui/material'
import axios from 'axios'
import { GlobalContext } from './../contexts/GlobalContext'
import { WishlistIcon } from './../components/SvgIcon'
import Header from './../components/Header'
import SimpleAccordion from './../components/SimpleAccordion'
import Toast from './../components/Toast'

const ItemDetail = () => {
  const { id } = useParams()
  const { state, dispatch } = useContext(GlobalContext)
  const maxOrderQuantityPerItem = 3
  const [item, setItem] = useState()
  const [variant, setVariant] = useState('')
  const [toastType, setToastType] = useState('success')
  const [toastMessage, setToastMessage] = useState('')

  const handleAddToWishlist = () => {
    dispatch({
      type: 'saveWishlists',
      payload: state.wishlists.includes(item.id) ? state.wishlists : [...state.wishlists, item.id]
    })
    setToastType('success')
    setToastMessage('Artikel wurde in den Wunschliste gelegt')
  }

  const handleAddToCart = () => {
    const itemInCart = state.carts.find(cart => cart.id === item.id && cart.variant.size === variant)
    if(itemInCart?.quantity >= maxOrderQuantityPerItem) {
      setToastType('error')
      setToastMessage('Die Höchstbestellmenge beträgt 3')
    }else{
      dispatch({
        type: 'saveCarts',
        payload: itemInCart
          ? state.carts.map(cart => cart.id === item.id && cart.variant.size === variant ? {...cart, quantity: cart.quantity + 1} : cart)
          : [...state.carts, {id: item.id, brand_name: item.brand_name, name: item.name, type_name: item.type_name, image: item.image, variant: item.variants.find(itemVariant => itemVariant.size === variant), quantity: 1}]
      })
      setToastType('success')
      setToastMessage('Artikel wurde in den Warenkorb gelegt')
    }
  }

  const handleChangeVariant = (event) => {
    setVariant(parseInt(event.target.value));
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
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='subtitle1'>
                              {variant.size} ml
                            </Typography>
                            <Typography variant='caption' color='text.secondary'>
                              {variant.base_price} € / 100 ml
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Typography variant='subtitle1' sx={{ color: variant.discount_percentage > 0 ? '#C74E4D' : 'inherit' }}>
                              {variant.price} €
                            </Typography>
                            <Box sx={{ display:'flex', gap: 0.5 }}>
                              <Typography variant='caption' component='div' sx={{ color: '#C74E4D' }}>
                                - {variant.discount_percentage}%
                              </Typography>
                              <Typography variant='caption' component='div'>
                                |
                              </Typography>
                              <Typography variant='caption' component='div' color='text.secondary' sx={{ textDecoration: 'line-through' }}>
                                {variant.original_price} €
                              </Typography>
                            </Box>
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
              <Button variant='outlined' onClick={handleAddToWishlist}>
                <WishlistIcon />
              </Button>
              <Button variant='contained' sx={{ flexGrow: 1 }} onClick={handleAddToCart}>In den Warenkorb</Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={6}>
            <SimpleAccordion summary='Produkdetails' detail={item?.description} sx={{ flexGrow: 0 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SimpleAccordion summary='Anwendung' detail={item?.instruction} sx={{ flexGrow: 1 }} />
          </Grid>
        </Grid>
      </Container>
      <Toast message={toastMessage} type={toastType} handleToastClose={handleToastClose} />
    </>
  )
}

export default ItemDetail