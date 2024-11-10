// fetchCountries.ts
import {countryNames} from '../NomPays/Pays'

export const uischema={
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "scope": "#/properties/nom",
        },
        {
        "type": "Control",
        "scope": "#/properties/tableau",
        "options": {
          "showSortButtons": true,
          "elementLabelProp": "name",
          "detail": {
            "type": "HorizontalLayout",
            "elements": [
              {
                "type": "Control",
                "scope": "#/properties/name",
                "label":"Pays",
                "options": {
                  "autocomplete": true
                }
              },
              {
                "type": "Control",
                "scope": "#/properties/Pourcentage"
              }
            ]
          }
        }
      }
    ]
}

export const schema={
    "type": "object",
    "properties": {
      "nom": {
        "type":"string"
      },
      "tableau": {
        "type": "array",
        "title": "Pays/Pourcentage",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "enum": countryNames
            },
            "Pourcentage": {
              "type": "number"
            }
            
          }
        }
      }
    }
  }