import { useState } from 'react';

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState({
    userName: '',
    fullName: '',
    role: '',
  });

  const [tempSearchValue, setTempSearchValue] = useState({
    userName: '',
    fullName: '',
    role: '',
  });

  const handleTempSearchChange = (field, value) => {
    setTempSearchValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
  };
  return {
    searchValue,
    setSearchValue,
    tempSearchValue,
    setTempSearchValue,
    handleTempSearchChange,
    handleSearch,
  };
};
