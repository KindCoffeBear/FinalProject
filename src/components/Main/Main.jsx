import { Container } from '@mui/material'
import Posts from './Posts/Posts'

function Main() {
  return (
    <Container sx={{ backgroundColor: 'rgba(0, 255, 127, 0.1)' }}>
      <Posts />
    </Container>
  )
}

export default Main
