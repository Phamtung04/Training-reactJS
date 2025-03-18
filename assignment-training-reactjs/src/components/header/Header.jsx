import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ThemeSwitcher } from '@toolpad/core';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [Language, setLanguage] = useState('');

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    setLanguage(lng.target.value);
    i18n.changeLanguage(Language);
  };
  return (
    <Box
      className="w-full shadow-md h-15"
      sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={Language}
          onChange={changeLanguage}
          label="Language"
          sx={{
            height: 50,
          }}
        >
          <MenuItem value={'en'}>Việt Nam</MenuItem>
          <MenuItem value={'vn'}>English</MenuItem>
        </Select>
      </FormControl>
      <ThemeSwitcher />
    </Box>
  );
};

export default Header;
