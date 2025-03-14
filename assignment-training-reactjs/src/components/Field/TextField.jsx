import { TextField as MuiTextField } from '@mui/material'; 
import { Controller } from 'react-hook-form';

const CustomTextField = ({ name, control, label, placeholder, className, sx, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTextField 
          {...field}
          label={label}
          variant="standard"
          value={field.value ?? ''}
          className={className}
          placeholder={placeholder}
          sx={sx}
          error={!!error}
          helperText={error?.message}
          {...rest}
        />
      )}
    />
  );
};

export default CustomTextField; 
