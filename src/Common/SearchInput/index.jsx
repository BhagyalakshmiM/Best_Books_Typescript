import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { SearchIcon } from "../../Assets/NavigationIcons";

const SearchInput = () => (
  <Paper
      component="form"
      elevation={0}
      sx={{ display: 'flex', borderRadius: '41px', marginTop: '55px', width: '949px', height: '52px' }}
    >
      <IconButton sx={{ p: '16px 16px' }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ flex: 1 }}
        placeholder="What books would you like to find?"
        inputProps={{ 'aria-label': 'What books would you like to find?' }}
        type="search"
      />
      <Button variant="contained" color="primary" sx={{ borderRadius: '0px 41px 41px 0px', backgroundColor: '#93B4BC !important', boxShadow: 'none !important' }} aria-label="Go">
        Go
      </Button>
    </Paper>
);

export default SearchInput;