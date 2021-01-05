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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(species => species.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const findEmployee = data.employees
    .find(parName => parName.firstName === employeeName || parName.lastName === employeeName);
  return employeeName ? findEmployee : {};
}

function createEmployee(personalInfo, associatedWith) {
  /* O método Object.assign() é usado para copiar os valores de todas as propriedades próprias enumeráveis de um ou mais objetos de origem para um objeto destino. Este método irá retornar o objeto destino. */
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const checkEmployeePosition = employees.filter(employee => employee.managers.includes(id));
  return checkEmployeePosition.length > 0 ? true : false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  //managers e responsibleFor pré-declarados arrays vazios para que o retorno (caso vazio) não seja undefined
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const howManyAnimals = animals.find(animal => animal.name === species).residents.length;

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
