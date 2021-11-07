import { Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material'

const ProductCard = ({ item }) => {

  return (
    <Card>
      <CardActionArea>
        {/* add item.percentage / item size here */}
        {/* add wishlist icon here */}
        <CardMedia
          component='img'
          image={item.image}
          alt={item.name}
        />
        <CardContent sx={{textAlign: 'center'}}>
          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
            {item.brand_name}
          </Typography>
          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
            {item.name}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            {item.type_name}
          </Typography>
          {/* add item.price / item size here */}
          {/* add item.base_price / 100 ml here */}
          {/* add rating here (hardcode the data first, data will be implemented later) */}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard