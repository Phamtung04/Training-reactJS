import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomSelectField = ({ name, label, control, options }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl variant="standard" sx={{mr: 2, m: 1, width: "200px" }}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} sx={{ color: "white" }}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default CustomSelectField;
