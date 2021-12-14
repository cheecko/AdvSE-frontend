import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { IoChevronDown } from 'react-icons/io5'

const SimpleAccordion = ({ summary, detail }) => {

  return (
    <Box>
      <Accordion elevation={4} >
        <AccordionSummary expandIcon={<IoChevronDown />} >
          <Typography sx={{ fontWeight: 600 }}>
            {summary}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
            {detail}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default SimpleAccordion