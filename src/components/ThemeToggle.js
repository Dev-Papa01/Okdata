import React, { useContext } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { ThemeContext } from '../context/ThemeProvider';

const ThemeToggle = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);

  return (
    <FormControlLabel
      control={
        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          name="themeToggle"
          color="primary"
        />
      }
      label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
    />
  );
};

export default ThemeToggle;
