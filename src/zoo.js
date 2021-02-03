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

const { animals, employees } = data;

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

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

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
