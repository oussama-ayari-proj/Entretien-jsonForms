

import React, { FC, useMemo, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import PourcentageControl from './PourcentageControl';
import PourcentageControlTester from './PourcentageControlTester'
import { schema, uischema } from '../jsonFormsConfig/formsConfig';

const classes = {
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto 20px',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
};

const initialData = {
  tableau: [
    {
      name:"",
      Pourcentage: 0,
    },
  ],
  nom: ""
};

const renderers = [
  ...materialRenderers,
  { tester: PourcentageControlTester, renderer: PourcentageControl }, 
];

export const JsonFormsDemo: FC = () => {
  const [data, setData] = useState<object>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false); 

  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const validateForm = (data: any) => {
    let sum = 0;
    let allFilled = true;

    for (let comment of data.tableau) {
      const pourcentage = comment.Pourcentage;
      const name = comment.name;
      if (pourcentage === undefined || pourcentage === null || pourcentage === '') {
        allFilled = false;
        break;
      }
      if (name === undefined || name === null || name === '') {
        allFilled = false;
        break;
      }
      sum += pourcentage;
    }

    if (!allFilled) {
      setError('Tout les champs doivent être remplis.');
      setIsFormValid(false);
      return false;
    }

    if (sum !== 100) {
      setError('La somme des pourcentage doivent être égale à 100.');
      setIsFormValid(false);
      return false;
    }

    setError(null);
    setIsFormValid(true);
    return true;
  };

  const handleSubmit = () => {
    if (validateForm(data)) {
      // Envoie des données du formulaire après validation
      console.log('Données finales du formulaire:', data);
    }
  };

  const clearData = () => {
    setData(initialData);
    setIsFormValid(false); //
  };

  return (
    <>
      <div style={classes.container}>
        <Typography variant={'h4'}>Bound data</Typography>
        <div style={classes.dataContent}>
          <pre id="boundData">{stringifiedData}</pre>
        </div>
        <div style={classes.demoform}>
        <Button
          style={classes.resetButton}
          onClick={clearData}
          color="primary"
          variant="contained"
          data-testid="clear-data">
          Effacer tout
        </Button>

        <Button
          style={classes.resetButton}
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          data-testid="submit-data"
          disabled={!isFormValid} // Disable Submit if form is not valid
        >
          Envoyer
        </Button>
        </div>
        

        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}

        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ data }) => {
            setData(data);
            validateForm(data); // Validate on data change
          }}
        />
      </div>
    </>
  );
};
