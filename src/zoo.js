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

function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(current =>
    current.name === animal).residents.every(resident => resident.age >= age);
}

function fetchEmployeeByName(employeeName) {
  return data.employees.find(employee => employee.firstName === employeeName) ||
    data.employees.find(employee => employee.lastName === employeeName);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return fetchEmployeeByName(employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return data.employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCountObject() {
  const newObject = {};
  if (typeof data.species !== 'string' || data.species.length === 0) {
    data.animals.forEach(element => (newObject[element.name] = element.residents.length));
  }
  return newObject;
}

function animalCount(species) {
  if (!species) {
    return animalCountObject();
  }
  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined') return 0;
  return Object.entries(entrants).reduce((accumulator, [key, value]) =>
    accumulator + (data.prices[key] * value), 0);
}

function animalMap(options) {
  // seu código aqui
}

const weekSchedule = Object.entries(data.hours).reduce((accumulator, [key, value]) => {
  const { open, close } = value;
  accumulator[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
  return accumulator;
}, {});

function schedule(dayName) {
  if (typeof dayName === 'string' && dayName.length !== 0) {
    return { [dayName]: weekSchedule[dayName] };
  }
  return weekSchedule;
}

function firstSpeciesId(id) {
  return data.employees.find(emp => emp.id === id).responsibleFor.shift();
}

function getAnimalResidents(id) {
  const anialId = firstSpeciesId(id);
  return data.animals.find(specie => specie.id === anialId).residents;
}

function oldestFromFirstSpecies(id) {
  const residents = getAnimalResidents(id);
  return Object.values(residents.sort(function (a, b) {
    return a.age - b.age;
  }).pop());
}

function increasePrices(percentage) {
  const pricesKeys = Object.keys(data.prices);
  pricesKeys.forEach((price) => {
    data.prices[price] = Math.round(data.prices[price] * (1 + (percentage / 100)) * 100) / 100;
  });
}

function getEmployeeById(idOrName) {
  const employeeObjectById = data.employees.find(element => element.id === idOrName);
  return employeeObjectById;
}

function getEmployeeByAnyName(idOrName) {
  const employeeObjectByAnyName = fetchEmployeeByName(idOrName);
  return employeeObjectByAnyName;
}

function verifyingIdOrName(idOrName) {
  const regex = /[0-9]/g;
  if (typeof idOrName === 'string' && idOrName.match(regex) !== null) {
    return getEmployeeById(idOrName);
  }
  return getEmployeeByAnyName(idOrName);
}

function getCoverageArray(idOrName) {
  const coverageArray = verifyingIdOrName(idOrName).responsibleFor;
  const animalsCoverage = [];
  coverageArray.forEach(animalId => animalsCoverage.push(data.animals
    .filter(animal => animal.id === animalId)
    .map(element => element.name)
    .toString()));
  return animalsCoverage;
}

function employeeFullName(idOrName) {
  const firstName = verifyingIdOrName(idOrName).firstName;
  const lastName = verifyingIdOrName(idOrName).lastName;
  const fullName = `${firstName} ${lastName}`;
  return fullName;
}

function allEmployeesCoverage() {
  return data.employees.reduce((acc, employee) => {
    acc[employeeFullName(employee.id)] = getCoverageArray(employee.id);
    return acc;
  }, {});
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    return allEmployeesCoverage();
  }
  const employeeCoverageObject = {};
  getCoverageArray(idOrName).forEach(animalId =>
    (employeeCoverageObject[employeeFullName(idOrName)] = getCoverageArray(idOrName)));
  return employeeCoverageObject;
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
