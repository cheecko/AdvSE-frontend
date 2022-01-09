import { useState, useEffect, useContext, Fragment } from 'react'
import { Container, Box, Grid, Typography, CardMedia, Divider, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_DOMAIN } from './../utils/constants'
import { GlobalContext } from './../contexts/GlobalContext'
import Header from './../components/Header'
import Toast from './../components/Toast'

const Wishlist = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const [items, setItems] = useState([])
  const [toastMessage, setToastMessage] = useState('')

  const handleRemoveFromWishlist = (id) => {
    dispatch({
      type: 'saveWishlists',
      payload: state.wishlists.filter(wishlist => wishlist !== id)
    })
    setToastMessage('Das gewünschte Produkt wurde aus dem Wunschzettel entfernt.')
  }

  const handleToastClose = () => {
    setToastMessage('')
  }

  useEffect(() => {
    if(state.wishlists.length === 0) return
    const params = { id: state.wishlists.join(',') }
    axios.get(`${BACKEND_DOMAIN}/api/v1/items/`, { params: params }).then(response => setItems(response.data))
  }, [state])

  console.log(state)

  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 1, gap: 2 }}>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Mein Wunschzettel
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            {state.wishlists?.length ?? 0} Artikel
          </Typography>
        </Box>
        {items.map((item, index) => (
          <Fragment key={index}>
            <Grid container spacing={1}>
              <Grid item xs={3} sm={2}>
                <Link to={{ pathname: `/items/${item.id}` }} style={{ color: 'inherit', textDecoration: 'unset' }} >
                  <CardMedia
                    component='img'
                    alt={`${item.brand_name} ${item.name}`}
                    image={item.image}
                  />
                </Link>
              </Grid>
              <Grid item xs={9} sm={10}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Link to={{ pathname: `/items/${item.id}` }} style={{ color: 'inherit', textDecoration: 'unset' }} >
                    <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                      {item.brand_name}
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant='subtitle2' color='text.secondary'>
                      {item.type_name} {item.size} ml
                    </Typography>
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  {item.discount_percentage !== 0 &&
                    <>
                      <Typography variant='subtitle2' sx={{ textDecoration: 'line-through', marginBottom: 0.5 }}>
                        {item.original_price?.toFixed(2) ?? 0} €
                      </Typography>
                      <Typography variant='subtitle1' sx={{ fontWeight: 600, color: '#C74E4D' }}>
                        - {item.discount_percentage}% | {item.price?.toFixed(2) ?? 0} €
                      </Typography>
                    </>
                  }
                  {item.discount_percentage === 0 &&
                    <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                      {item.price?.toFixed(2) ?? 0} €
                    </Typography>
                  }
                  <Typography variant='caption' color='text.secondary'>
                    {item.base_price?.toFixed(2) ?? 0} € / {item.base_size} ml
                  </Typography>
                  <Button color='inherit' sx={{ fontWeight: 600, textTransform: 'capitalize' }} onClick={() => handleRemoveFromWishlist(item.id)}>
                    Löschen
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          </Fragment>
        ))}
      </Container>
      <Toast message={toastMessage} type='success' handleToastClose={handleToastClose} />
    </>
  )
}

export default Wishlist