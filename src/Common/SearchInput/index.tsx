import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { SearchIcon } from "../../Assets/NavigationIcons";
import { useAppDispatch } from "../../Redux/hooks";
import { setSearchString } from "../../Redux/bookListSlice";

type SearchInputProp = {
  placeholder: string
}

// search input common component used all pages
const SearchInput = ({ placeholder }: SearchInputProp) => {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useAppDispatch();
  // on change of input setting local search string state
  const handleSearchStrChange = (e: any) => {
    setSearchInput(e.target.value);
  }
  // faced issue while clicking on enter on input , temporary fix - still looking into it
  const handleSearchStrKeydown = (e: any) => {
    if(e.key === 'Enter') {
      e.preventDefault();
    }
  }
  // on click on Go button setting redux store with string
  const handleGoButtonClick = () => {
    dispatch(setSearchString(searchInput));
  }
  useEffect(() => {
    dispatch(setSearchString(''));
  }, []);
  return (<Paper
      component="form"
      elevation={0}
      sx={{ display: 'flex', borderRadius: '41px', margin: '55px 0px', height: '52px', width: '89.2%' }}
    >
      <IconButton sx={{ p: '16px 16px' }} aria-label="menu" disabled>
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ flex: 1, pr: '10px' }}
        value={searchInput}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        onChange={(e) => handleSearchStrChange(e)}
        onKeyDown={(e) => { handleSearchStrKeydown(e)}}
      />
      <Button variant="contained" onClick={() => handleGoButtonClick()} color="primary" sx={{ borderRadius: '0px 41px 41px 0px', backgroundColor: '#93B4BC !important', boxShadow: 'none !important' }} aria-label="Go">
        Go
      </Button>
    </Paper>
  )
};

export default SearchInput;