import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Box, Grid, Typography, FormControl, Select, MenuItem } from '@mui/material'
import axios from 'axios'
import Header from './../components/Header'
import ProductCard from './../components/ProductCard'

const Home = () => {
  const [items, setItems] = useState([])
  const [sort, setSort] = useState('id asc')

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  }

  useEffect(() => {
    const params = { sort: sort }
    axios.get('http://localhost:5000/api/v1/items/', { params: params }).then(response => setItems(response.data))
  }, [sort])

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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1, gap: 2 }}>
          <Typography variant='h6'>
            Sortieren nach
          </Typography>
          <FormControl variant='standard' sx={{ minWidth: 120 }}>
            <Select
              value={sort}
              onChange={handleChangeSort}
            >
              <MenuItem value='id asc'>Id aufsteigend</MenuItem>
              <MenuItem value='name asc'>Name aufsteigend</MenuItem>
              <MenuItem value='name desc'>Name absteigend</MenuItem>
              <MenuItem value='price asc'>Preis aufsteigend</MenuItem>
              <MenuItem value='price desc'>Preis absteigend</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={1}>
          {items.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Link to={{ pathname: `/items/${item.id}` }} style={{ textDecoration: 'unset' }} >
                <ProductCard item={item} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Home