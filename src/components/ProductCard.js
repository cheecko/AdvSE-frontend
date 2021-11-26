import { Typography, Card, CardActionArea, CardMedia, CardContent, Rating, Box, IconButton } from '@mui/material'
import { WishlistIcon } from './../components/SvgIcon'

const ProductCard = ({ item }) => {

  return (
    <Card sx={{ position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0, width: '100%', zIndex: 100 }}>
        <Typography variant='subtitle2' sx={{ fontWeight: 600, color: '#C74E4D', backgroundColor: '#FEEFEF', padding: '4px 2px' }}>
          - {item.discount_percentage}%
        </Typography>
        <IconButton>
          <WishlistIcon />
        </IconButton>
      </Box>
      <CardActionArea>
        <CardMedia
          component='img'
          image={item.image}
          alt={item.name}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
            {item.brand_name}
          </Typography>
          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
            {item.name}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            {item.type_name}
          </Typography>
          <Typography variant='subtitle1' sx={{ fontWeight: 600, paddingTop: 0.5, paddingBottom: 0.5 }}>
            {item.price} € / {item.size} ml
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {item.base_price} € / {item.base_size} ml
          </Typography>
          <Rating value={parseFloat(item.rating)} precision={0.1} readOnly size='small' />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard