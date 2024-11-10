import React, { useState } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { ControlProps } from '@jsonforms/core';
import { TextField, InputAdornment, FormHelperText } from '@mui/material';

const PourcentageControl = ({ data, handleChange, path }: ControlProps) => {
  const [error, setError] = useState<string | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);

    if (isNaN(value)) {
      setError('Invalid number');
      handleChange(path, undefined); // Clear value
    } else if (value < 0) {
      setError('Value cannot be negative');
      handleChange(path, 0); // Reset to 0
    } else if (value > 100) {
      setError('Value cannot be more than 100');
      handleChange(path, 100); // Set to 100
    } else {
      setError(null); // Clear error if value is valid
      handleChange(path, value);
    }
  };

  return (
    <div>
      <TextField
        label="Pourcentage"
        type="number"
        value={data || ''}
        onChange={onChange}
        error={Boolean(error)}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        variant="outlined"
        fullWidth
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
};

export default withJsonFormsControlProps(PourcentageControl);
