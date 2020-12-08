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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animalsId => ids.find(id => id === animalsId.id)));
}

function animalsOlderThan(animalName, age) {
  return animals.find(animal => animal.name === animalName).residents
  .every(animal => animal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(employee => (
    employee.firstName === employeeName || employee.lastName === employeeName
  ));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
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
  const count = animals.reduce((cont, animal) => {
    cont[animal.name] = animal.residents.length;
    return cont;
  }, {});
  if (typeof species === 'string' && species.length !== 0) {
    return count[species];
  }
  return count;
}

function entryCalculator(entrants) {
  if (typeof entrants !== 'object' || Object.keys(entrants).length === 0) return 0;

  return Object.keys(entrants).reduce((cont, entradas) => (
    cont + (entrants[entradas] * prices[entradas])
  ), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const funcionamento = Object.entries(hours).reduce((acc, [chave, valor]) => {
    const { open, close } = valor;
    acc[chave] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: funcionamento[dayName] };
  return funcionamento;
}

function oldestFromFirstSpecies(id) {
  const employeeById = employees.find(employee => employee.id === id);
  const animalById = animals.find(animal => animal.id === employeeById.responsibleFor[0]).residents;
  const arrOldestAnimal = animalById.reduce((acc, animal) => (acc.age > animal.age ? acc : animal),
  );
  return [arrOldestAnimal.name, arrOldestAnimal.sex, arrOldestAnimal.age];
}


function increasePrices(percentage) {
  const aumento = 1 + (percentage / 100);

  Object.keys(prices).forEach(value => (
    prices[value] = Math.round(prices[value] * aumento * 100) / 100
  ));
}

function employeeCoverage(idOrName) {
  // if(!idOrName) return
  // Object.entries(employees).reduce((acc, [key, value]) => {
  // acc[key['${firstName}, ${lastName}']] = value.responsibleFor.map(
  //   return acc),0);
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
