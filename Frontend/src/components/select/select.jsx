import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const MySelect = ({ name , setter, values ,curr}) => {
  const handleChange = (e) => {
    setter(e.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={curr ? curr : ""}
          label="Age"
          onChange={handleChange}
        >
          {values.map((val) => {
            return <MenuItem value={`${val}`}>{val.toUpperCase()}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MySelect;
