/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {       // o spread pega todos os ids e coloca no array
  if (!ids) return [];
  return animals.filter(animal => ids.includes(animal.id));
}

console.log(animalsByIds('baa6e93a-f295-44e7-8f70-2bcdc6f6948d', 'ef3778eb-2844-4c7c-b66c-f432073e1c6b'));

function animalsOlderThan(animalName, age) {
  let result = animals.find(animal => animal.name === animalName);  // procura os animais com o nome
  if (result) result = result.residents.every(animal => animal.age >= age);
  return result;  // vai retornar True ou False, se não existir o animal, retorna undefined
}

console.log(animalsOlderThan('otters', 7));  // a espécie de 'otters' (lontras), possuem idade maior ou igual a 7? true!

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

console.log(employeeByName('Emery'));

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,    // feito com destructuring vai criar o novo colaborador
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  employees.push(createEmployee(personalInfo, associatedWith));
}

function animalCount(species) {
  const result = animals.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
  }, {});
  if (species) return result[species];
  return result;
}

function entryCalculator(entrants) {
  if (typeof entrants !== 'object' || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((previusValue, currentValue) =>
    previusValue + (entrants[currentValue] * prices[currentValue]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const result = Object.entries(hours).reduce((acumulador, [key, val]) => {
    const { open, close } = val;
    acumulador[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acumulador;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: result[dayName] };
  return result;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(current => current.id === id);
  const firstSpeciesId = employee.responsibleFor[0];
  const animal = animalsByIds(firstSpeciesId)[0];
  const { residents } = animal;
  const oldest = residents.reduce((maisVelho, atual) => (
  atual.age > maisVelho.age ? atual : maisVelho));
  return Object.values(oldest);
}
console.log(oldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,

};
