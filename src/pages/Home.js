import { useState, useEffect, useContext } from 'react'
import { Container, Box, Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import axios from 'axios'
import Header from './../components/Header'

const Home = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/items/').then(response => setItems(response.data))
  }, [])

  console.log(items)

  return (
    <>
      <Header />
      <Container maxWidth='false'>
        <Grid container spacing={1}>
          {items.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Card key={index}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent sx={{textAlign: 'center'}}>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                      {item.brand_name}
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                      {item.name}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      {item.type_name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Home