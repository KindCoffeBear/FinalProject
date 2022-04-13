import { Avatar, Grid, Paper } from '@mui/material'

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
          <h4 style={{ margin: 0, textAlign: 'left' }}>{author.name}</h4>
          <p style={{ textAlign: 'left' }}>
            {text}
          </p>
          <p style={{ textAlign: 'left', color: 'gray' }}>
            {updatedDate}
          </p>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Comments
