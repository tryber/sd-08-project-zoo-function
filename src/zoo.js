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

const { animals, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(current =>
  current.name === animal).residents.every(resident => resident.age >= age);
}

function fetchEmployeeByName(employeeName) {
  return data.employees.find(element => element.firstName === employeeName) ||
  data.employees.find(element => element.lastName === employeeName);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return fetchEmployeeByName(employeeName)
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCountObject() {
  const newObject = {};
  if (typeof species !== 'string' || species.length === 0) {
    animals.forEach(element => (newObject[element.name] = element.residents.length));
    return newObject;
  }
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return animalCountObject()
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (typeof entrants === 'undefined') return 0;
  return Object.entries(entrants).reduce((accumulator, [key, value]) =>
  accumulator + (data.prices[key] * value), 0);
}

function animalMap(options) {
  // seu código aqui

}

function newSchedule() {
  Object.entries(data.hours).reduce((accumulator, [key,value]) => {
    const { open, close } = value;
    accumulator[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return accumulator;
  }, {});
}

function schedule(dayName) {
  // seu código aqui
  const result = Object.entries(data.hours).reduce((accumulator, [key,value]) => {
    const { open, close } = value;
    accumulator[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return accumulator;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: result[dayName] };
  return result;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach(key => {
    prices[key] = Math.round(prices[key] * 100) / 100
  });
}


function getEmployeeById(idOrName) {
  const employeeObjectById = data.employees.find(element => element.id === idOrName);
  return employeeObjectById;
}

function getEmployeeByAnyName(idOrName) {
  const employeeObjectByAnyName = data.employees.find(elemet => elemet.firstName === idOrName) ||
  data.employees.find(elemet => elemet.lastName === idOrName);
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
  coverageArray.forEach( animalId => animalsCoverage.push(data.animals
    .filter( animal => animal.id === animalId )
      .map( element => element.name)
        .toString()));
  return animalsCoverage;
}

function employeeFullName(idOrName) {
  const firstName = verifyingIdOrName(idOrName).firstName;
  const lastName = verifyingIdOrName(idOrName).lastName;
  const fullName = firstName + ' ' + lastName;
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
    return allEmployeesCoverage()
  }
  // const employeeCoverageObject = {};
  const employeeCoverageObject = {};
  getCoverageArray(idOrName).forEach( animalId =>
    (employeeCoverageObject[employeeFullName(idOrName)] = getCoverageArray(idOrName)));
  return employeeCoverageObject;
  // return employeeCoverageObject;
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
