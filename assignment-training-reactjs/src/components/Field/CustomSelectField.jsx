import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomSelectField = ({ name, label, control, options, rules, sx }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl 
          variant="standard" 
          sx={{ mr: 2, m: 1, width: sx}}
          error={!!error} 
        >
          <InputLabel>{label}</InputLabel>
          <Select {...field} value={field.value ?? ''}>
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
