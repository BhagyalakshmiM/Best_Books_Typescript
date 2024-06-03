import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { SearchIcon } from "../../Assets/NavigationIcons";

const SearchInput = ({ placeholder }) => (
  <Paper
      component="form"
      elevation={0}
      sx={{ display: 'flex', borderRadius: '41px', margin: '55px 0px', height: '52px', width: '89.2%' }}
    >
      <IconButton sx={{ p: '16px 16px' }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        type="search"
      />
      <Button variant="contained" color="primary" sx={{ borderRadius: '0px 41px 41px 0px', backgroundColor: '#93B4BC !important', boxShadow: 'none !important' }} aria-label="Go">
        Go
      </Button>
    </Paper>
);

export default SearchInput;