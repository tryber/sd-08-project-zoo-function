## 1 - animalsByIds

```javascript
// Fazemos o destructuring de animals
const { animals } = require('./data');

// Resolve o primeiro requisito
if (ids === undefined) return [];

// Resolve o segundo requisito
if (ids === undefined) return [];
return [animals.find(animal => animal.id === ids)];

// Resolve o terceiro:
// Mudamos o parâmetro para usar o rest
function animalsByIds(...ids) {}

// Opção 1
return ids.map(id => animals.find(({ id: animalId }) => id === animalId ));

// Opção 2
return animals.filter(animal => ids.some(id => id === animal.id));

// Opção 3
return animals.filter(animal => ids.includes(animal.id));
```

## 2 - animalsOlderThan

```javascript
const result = animals.find(({ name }) => name === animal).residents;
return result ? result.every(({ age: animalAge }) => animalAge >= age) : false;
```

* Explicar operador ternário


## 3 - employeeByName


```javascript

// Desestruturar employees
const { animals, employees } = require('./data');

// Resolve primeiro requisito
if (employeeName === undefined) return {};

// Resolve segundo requisito
if (employeeName === undefined) return {};
return employees.find(({ firstName }) => employeeName === firstName);

// Resolve segundo sem destructuring
if (employeeName === undefined) return {};
return employees.find(employee => employeeName === employee.firstName);

// Resolve terceiro requisito
if (employeeName === undefined) return {};
return employees.find(({ firstName, lastName }) => (
  employeeName === firstName || employeeName === lastName
));

// Resolve terceiro requisito sem destructuring
if (employeeName === undefined) return {};
return employees.find(employee => (
  employeeName === employee.firstName || employeeName === employee.lastName
));

// Requisito 3, outra opção
return employees.find(({ firstName, lastName }) => (
  employeeName === firstName || employeeName === lastName
)) || {};

```
