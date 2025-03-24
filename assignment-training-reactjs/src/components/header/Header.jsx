import React from 'react';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import { useLanguage } from '../../hooks/useLanguage';

const Header = () => {
  const { currentLanguage, switchLanguage } = useLanguage();
  return (
    <Box
      className="w-full shadow-md h-15"
      sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={currentLanguage}
          onChange={(e) => switchLanguage(e.target.value)}
          sx={{
            height: 30,
            width: 90,
          }}
        >
          <MenuItem value={'en'}>EN</MenuItem>
          <MenuItem value={'vn'}>VN</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Header;
