import { TextField as MuiTextField } from '@mui/material';
import { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const CustomTextField = ({ name, label, placeholder, className, sx, ...rest }) => {
  const { control, watch, setValue, trigger } = useFormContext();

  const watchValue = watch(name);

  const onBlurDefault = useCallback(() => {
    const value = watchValue && watchValue.trim();
    setValue(name, value);
    trigger(name);
  }, [name, setValue, trigger, watchValue]);

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
          onBlur={onBlurDefault}
          {...rest}
        />
      )}
    />
  );
};

export default CustomTextField;
