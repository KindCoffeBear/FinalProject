import Typography from '@mui/material/Typography'

function AppTitle() {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
    >
      SuperCoolApp
    </Typography>
  )
}

export default AppTitle
