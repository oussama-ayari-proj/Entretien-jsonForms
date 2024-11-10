// CustomArrayControl.tsx
import React, { useEffect, useState } from 'react';
import { ControlProps, rankWith, scopeEndsWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Autocomplete, Button, FormHelperText, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { countryNames } from '../NomPays/Pays';

const CustomArrayControl = ({ data = [], handleChange, path }: ControlProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const percentageRegex = /^(100|[0-9]?\d)$/;

  const checkFormValidity = () => {
    const allFieldsFilled = data.every((item: any) => item.Pays && percentageRegex.test(item.Pourcentage || ''));
    const totalPercentage = data.reduce((sum: number, item: { Pourcentage: any; }) => sum + parseFloat(item.Pourcentage || "0"), 0);
    const validPercentage = totalPercentage === 100;
    setIsFormValid(allFieldsFilled && validPercentage);
    setError(validPercentage ? null : 'La somme des pourcentages doit être exactement 100%');
  };

  useEffect(() => {
    checkFormValidity();
  }, [data]);

  const handlePercentageChange = (index: number, value: string) => {
    if (!percentageRegex.test(value)) {
      setError('Le pourcentage doit être entre 0 et 100');
      return;
    }

    const updatedData = [...data];
    updatedData[index].Pourcentage = value;
    handleChange(path, updatedData);
  };

  const addRow = () => {
    const updatedData = [...data, { Pays: '', Pourcentage: '' }];
    handleChange(path, updatedData);
  };

  const deleteRow = (index: number) => {
    const updatedData = data.filter((_: any, i: number) => i !== index);
    handleChange(path, updatedData);
  };

  function handleSubmit(): void {
    console.log(data);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="custom table">
          <TableHead>
            <TableRow>
              <TableCell>Pays</TableCell>
              <TableCell align="center">Pourcentage</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <Autocomplete
                    disablePortal
                    sx={{minWidth: 200}}
                    options={countryNames}
                    value={item.Pays}
                    onChange={(_, newValue) => {
                      const updatedData = [...data];
                      updatedData[index].Pays = newValue;
                      handleChange(path, updatedData);
                    }}
                    renderInput={(params) => <TextField {...params} label="Pays" />}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Pourcentage"
                    type="text"
                    sx={{minWidth: 200}}
                    value={item.Pourcentage || ''}
                    onChange={(e) => handlePercentageChange(index, e.target.value)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="secondary" onClick={() => deleteRow(index)}>
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </TableContainer>
      <Button variant="contained" color="primary" onClick={addRow} style={{ marginTop: '10px' }}>
        +
      </Button>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
        disabled={!isFormValid}
        style={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Submit
      </Button>
    </>
  );
};

export const customArrayControlTester = rankWith(
  5, // Priority for this control
  scopeEndsWith("tableau")
);

export default withJsonFormsControlProps(CustomArrayControl);
