import { Copyright } from '@mui/icons-material'
import { Container, Typography } from '@mui/material'

function Footer() {
  return (
    <Container
      maxWidth="false"
      sx={{
        backgroundColor: 'rgba(209, 15, 203, 0.5)', padding: '10px 10px', display: 'flex', flexDirection: 'column', alignItems: 'start',
      }}
    >
      <Typography variant="body1">
        Designed by Command 5
      </Typography>
      <Copyright />
    </Container>
  )
}

export default Footer
