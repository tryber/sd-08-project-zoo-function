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
