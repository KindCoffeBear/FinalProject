import { Container } from '@mui/material'
import Posts from './Posts/Posts'

function Main() {
  return (
    <Container
      maxWidth="false"
      sx={{
        backgroundColor: '#ede7f6', maxWidth: '100vw', minHeight: '91vh', display: 'flex', justifyContent: 'center',
      }}
    >
      <Posts />
    </Container>
  )
}

export default Main
