import { Box, Typography } from '@mui/material'

const SortSelect = ({ value, onChange }) => {

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography variant='h6'>
        Sortieren nach
      </Typography>
      {/* add sort select here (see https://mui.com/components/selects/) */}
      {/* also add value and onChange in select component */}
    </Box>
  )
}

export default SortSelect