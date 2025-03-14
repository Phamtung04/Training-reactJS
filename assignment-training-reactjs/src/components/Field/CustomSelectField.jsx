import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomSelectField = ({ name, label, control, options}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl variant="standard" sx={{mr: 2, m: 1, width: "192px" }}>
          <InputLabel sx={{color: 'white'}}>{label}</InputLabel>
          <Select {...field} value={field.value ?? ''} sx={{ color: "white" }}>
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
