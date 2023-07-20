import React from 'react'
import './Search.css'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
const Search = () => {
    return(
        <div className='search-content'>
          <input type='text' placeholder='Search' className='search-input' />
          <div><IconButton ><SearchIcon /></IconButton></div>
        </div>
    )
}
export default Search;