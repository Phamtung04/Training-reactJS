import { TextField as MuiTextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const CustomTextField = ({ name, label, placeholder, className, sx, ...rest }) => {
  const { control } = useFormContext();
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
