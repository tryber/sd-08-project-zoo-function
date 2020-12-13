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

const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(specie => specie.name === animal)
  .residents.every(olderThan => olderThan.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign(personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  if (!id && !firstName && !lastName && !managers && !responsibleFor) {
    return [];
  }
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, cur) => {
      acc[cur.name] = cur.residents.length;
      return acc;
    }, {});
  }
  return animals.find(specie => specie.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  const income = {
    Adult: 0,
    Senior: 0,
    Child: 0,
  };
  Object.assign(income, entrants);
  const result = (prices.Adult * income.Adult) +
  (prices.Child * income.Child) +
  (prices.Senior * income.Senior);
  return result;
}

function animalMap(options) {
  // code
}

function schedule(dayName) {
  const daySchedule = Object.entries(hours).reduce((acumulador, [key, val]) => {
    const { open, close } = val;
    acumulador[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acumulador;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: daySchedule[dayName] };
  return daySchedule;
}

function oldestFromFirstSpecies(id) {
  const employeesResponsibles = employees.find(employee => employee.id === id).responsibleFor[0];
  const fetchAnimals = animals.find(animal => animal.id === employeesResponsibles).residents;
  const animalsSortedByYears = fetchAnimals.sort((old1, old2) => old2.age - old1.age);
  return Object.values(animalsSortedByYears[0]);
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.round(prices[key] * increase * 100) / 100;
  });
  return prices;
  // return prices.map(Math.round(Object.values(prices) * increase));
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
