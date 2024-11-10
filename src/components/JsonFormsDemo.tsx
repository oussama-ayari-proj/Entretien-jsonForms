

import { FC, useMemo, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { schema, uischema } from '../jsonFormsConfig/formsConfig';

import CustomArrayControl, { customArrayControlTester } from './CustomArrayControl';

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
      Pays:"",
      Pourcentage: '',
    },
  ],
  nom: "",
};



export const JsonFormsDemo: FC = () => {
  const [data, setData] = useState<object>(initialData);

  const handleChange = ({ data }: { data: any[]}) => {
    setData(data);
  };
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  function clearData(): void {
    setData({});
  }

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
        </div>
        

        

        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={[
            ...materialRenderers,
            { tester : customArrayControlTester, renderer: CustomArrayControl} ,
          ]}
          cells={materialCells}
          onChange={handleChange}
        />
        
      </div>
    </>
  );
};
