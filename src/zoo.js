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
  if (ids === undefined) {
    return [];
  }
  const verifyId = ids.map(elem => (data.animals.find(elem2 => elem2.id.includes(elem))));
  return verifyId;
}

function animalsOlderThan(animal, age) {
  const verifyAge = data.animals.find(elem => elem.name === animal);
  return verifyAge.residents.every(elem => elem.age > age);
}

function employeeByName(string) {
  if (string === undefined) {
    return {};
  }
  const verifyEmployee = data.employees
  .find(elem => (elem.firstName === string || elem.lastName === string || elem.id === string));
  return verifyEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployeeData = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployeeData;
}

function isManager(id) {
  const getEmployee = data.employees.map(elem => elem.managers);
  const verifyManagement = getEmployee.some(elem => elem.includes(id));
  return verifyManagement;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newEmployee);
}

function animalCount(species) {
  const getAnimals = data.animals.reduce((acc, elem) => {
    acc[elem.name] = elem.residents.length;
    return acc;
  }, {});
  if (species !== undefined) {
    return getAnimals[species];
  } return getAnimals;
}

function entryCalculator(entrants) {
  if (entrants === undefined || typeof entrants !== 'object') {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, elem) =>
  acc + (entrants[elem] * data.prices[elem]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const workingHours = Object.entries(data.hours).reduce((acc, [key, value]) => {
    const { open, close } = value;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (dayName === undefined) {
    return workingHours;
  }
  return { [dayName]: workingHours[dayName] };
}

function oldestFromFirstSpecies(id) {
  const getAnimalByEmployee = data.employees.find(elem => elem.id === id).responsibleFor[0];
  const whoIsOlder = data.animals.find(elem => elem.id === getAnimalByEmployee).residents
  .reduce((acc, elem) => (
    elem.age < acc.age ? acc : elem
  ));
  return Object.values(whoIsOlder);
}

function increasePrices(percentage) {
  const perc = percentage / 100;
  let adultPrices = (data.prices.Adult + (data.prices.Adult * perc));
  let seniorPrices = (data.prices.Senior + (data.prices.Senior * perc));
  let childPrices = (data.prices.Child + (data.prices.Child * perc));
  adultPrices = Math.round(adultPrices * 100);
  seniorPrices = Math.round(seniorPrices * 100);
  childPrices = Math.round(childPrices * 100);
  data.prices.Adult = adultPrices / 100;
  data.prices.Senior = seniorPrices / 100;
  data.prices.Child = childPrices / 100;
  return data.prices;
}

function employeeCoverage(idOrName) {
  const getAnimalSpecies = data.animals;
  const getEmployeeData = data.employees.reduce((acc, elem) => {
    acc[`${elem.firstName} ${elem.lastName}`] = animalsByIds(...elem.responsibleFor).map(elem => elem.name);
    return acc;
  }, {});
  if (idOrName === undefined) {
    return getEmployeeData;
  }
  const { firstName, lastName, responsibleFor } = employeeByName(idOrName);
  let name = `${firstName} ${lastName}`;
  return { [name]: animalsByIds(...responsibleFor).map(elem => elem.name) };
}

console.log(employeeCoverage())

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
