import { ThemeSwitcher } from '@toolpad/core';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Language = () => {
  const [Language, setLanguage] = useState('');

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    setLanguage(lng.target.value);
    i18n.changeLanguage(Language);
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Language;
