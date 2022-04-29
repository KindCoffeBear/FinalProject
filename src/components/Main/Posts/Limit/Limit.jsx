import {
  Box,
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material'

function Limit({ limit, changeHandler }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
      <FormControl sx={{ m: 1, minWidth: 160 }} variant="standard">
        <InputLabel id="limit">Кол-во постов</InputLabel>
        <Select
          labelId="limit"
          id="limit-select"
          value={limit}
          label="limit"
          onChange={changeHandler}
        >
          <MenuItem value="Все">Все</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default Limit
