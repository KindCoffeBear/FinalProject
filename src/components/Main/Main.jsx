import { Container } from '@mui/material'
import Posts from './Posts/Posts'

function Main() {
  return (
    <Container
      maxWidth="false"
      sx={{
        backgroundColor: 'rgba(54, 217, 60, 0.5)', minWidth: '100vw', minHeight: '91vh', display: 'flex', justifyContent: 'center',
      }}
    >
      <Posts />
    </Container>
  )
}

export default Main
