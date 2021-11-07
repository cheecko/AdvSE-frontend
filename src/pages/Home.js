import { useState, useEffect } from 'react'
import { Container, Box, Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import axios from 'axios'
import Header from './../components/Header'
import SortSelect from './../components/SortSelect'
import ProductCard from './../components/ProductCard'

const Home = () => {
  const [items, setItems] = useState([])
  const [sort, setSort] = useState('')

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/items/').then(response => setItems(response.data))
  }, [])

  console.log(items)

  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 1 }}>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Unsere Empfehlungen
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
          <SortSelect value={sort} onChange={handleChangeSort} />
        </Box>
        <Grid container spacing={1}>
          {items.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Home