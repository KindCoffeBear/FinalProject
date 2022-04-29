import { Box, Button } from '@mui/material'

function PageNumbers({ numbersPage, changePageHandler, page }) {
  return (
    <Box
      fullWidth
      sx={{
        mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
      }}
    >

      {numbersPage ? numbersPage.map((number) => (

        <Button key={number} onClick={changePageHandler} sx={{ width: 10 }} color={number === page ? 'secondary' : 'info'}>
          {number}
        </Button>

      )) : null}

    </Box>
  )
}

export default PageNumbers
