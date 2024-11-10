import { rankWith, isNumberControl } from '@jsonforms/core';

// Pour Vérifier le type de la variable uischema
const isControl = (uischema: any): uischema is { scope: string } => {
  return uischema && typeof uischema.scope === 'string';
};

const PourcentageControlTester = rankWith(
  3,
  (uischema, schema, context) => {
    // Condition de vérification
    if (isNumberControl(uischema, schema, context) && isControl(uischema) && uischema.scope.endsWith('Pourcentage')) {
      return true;
    }
    return false;
  }
);

export default PourcentageControlTester;
