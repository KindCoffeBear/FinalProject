import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch } from 'react-redux'
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../headerParts'
import { setFilter } from '../../../redux/actionCreators/filterActionCreator'

function SearchForm() {
  const dispatch = useDispatch()
  const searchHandler = (e) => {
    dispatch(setFilter(e.target.value.trim()))
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={searchHandler}
        />
      </Search>
    </Box>
  )
}

export default SearchForm
