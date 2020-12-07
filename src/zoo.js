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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const specie = animals.find(element => element.name === animal);
  return specie.residents.every(element => element.age >= age);
}

function employeeByName(employeeName = '') {
  if (employeeName === '') {
    return {};
  }
  return employees.find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const idManagers = [];
  employees.forEach(manager => manager.managers.forEach(idElement => idManagers.push(idElement)));

  return idManagers.some(element => element === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (typeof managers === 'undefined') {
    managers = [];
  }
  if (typeof responsibleFor === 'undefined') {
    responsibleFor = [];
  }
  const newOne = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newOne);
  return newOne;
}

function animalCount(species) {
  if (species !== undefined) {
    return animals
    .find(item => item.name === species).residents.length;
  }
  return animals.reduce((acc, item) => {
    acc[item.name] = item.residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  }
  const { Child = 0, Adult = 0, Senior = 0 } = entrants;
  const total = ((prices.Child) * Child) + ((prices.Adult) * Adult) + ((prices.Senior) * Senior);
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const days = {};
  Object.keys(data.hours).forEach((day) => {
    if (data.hours[day].open === data.hours[day].close) {
      days[day] = 'CLOSED';
    } else {
      days[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: days[dayName] };
  }
  return days;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(emploId => emploId.id === id).responsibleFor[0];
  const { residents } = animals.find(name => name.id === employee);
  const { name, sex, age } = residents.reduce((acc, item) => (acc.age > item.age ? acc : item));
  return [name, sex, age];
}

function increasePrices(percentage) {
  const percent = (percentage / 100) + 1;
  prices.Child = Math.round(prices.Child * percent * 100) / 100;
  prices.Adult = Math.round(prices.Adult * percent * 100) / 100;
  prices.Senior = Math.round(prices.Senior * percent * 100) / 100;
  return prices;
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
