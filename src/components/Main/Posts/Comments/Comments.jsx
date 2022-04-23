import {
  Avatar, Grid, Paper, Typography,
} from '@mui/material'

// eslint-disable-next-line camelcase
function Comments({ text, author, updated_at }) {
  const updatedDate = new Date(updated_at).toLocaleString()

  return (

    <Paper sx={{ padding: '10px 10px' }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={author.avatar} />
        </Grid>
        <Grid justifyContent="left" item xs>
          <Typography
            variant="h6"
            sx={{
              m: 0, textAlign: 'left', fontSize: 16, fontWeight: 'bold',
            }}
          >
            {author.name}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'left', fontSize: 13, mt: 1 }}>
            {text}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'right', color: 'gray', mt: 0.5, fontSize: 10,
            }}
          >
            {updatedDate}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Comments
