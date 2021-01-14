const { animals, employees, prices, hours } = require('./data');
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

// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(elem => ids.includes(elem.id));
}
function animalsOlderThan(animal, age) {
  return animals.find(speciesName => speciesName.name === animal)
  .residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(employee => employee
  .firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
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
  const total = animals.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
  }, {});
  if (species) return total[species];
  return total;
}

function entryCalculator(entrants) {
  if (typeof entrants !== 'object' || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acc, key) => (
    acc + (entrants[key] * prices[key])
  ), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const result = Object.entries(hours).reduce((acc, [key, val]) => {
    const { open, close } = val;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
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
    atual.age > maisVelho.age ? atual : maisVelho
  ));
  return Object.values(oldest);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((element) => {
    prices[element] = Math.round(prices[element] * (1 + (percentage / 100)) * 100) / 100;
  });
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
