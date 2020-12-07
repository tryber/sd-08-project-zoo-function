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

const animalsByIds = (...ids) => animals.filter(animal => ids.includes(animal.id));

const animalsOlderThan = (animal, age) => animals.find(specie => specie.name === animal)
  .residents.every((specie => specie.age >= age));

const employeeByName = employeeName => employees.find(employee =>
  employee.firstName === employeeName || employee.lastName === employeeName) || {};

const createEmployee = (personalInfo, associatedWith) => Object
  .assign({}, personalInfo, associatedWith);

const isManager = id => employees.some(employee => employee.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  employees.push(createEmployee(personalInfo, associatedWith));
};

const animalCount = (species) => {
  if (!species) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
};

const entryCalculator = (entrants) => {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce(
    (acc, value) => acc + (prices[value] * entrants[value]), 0);
};

function animalMap(options) {
  // seu código aqui
}

const schedule = (dayName) => {
  if (!dayName) {
    return Object.entries(hours).reduce((acc, [key, value]) => {
      acc[key] = value.open > 0 ? `Open from ${value.open}am until ${value.close - 12}pm` : 'CLOSED';
      return acc;
    }, {});
  }
  if (dayName === 'Monday') return { [dayName]: 'CLOSED' };
  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
};

const oldestFromFirstSpecies = (id) => {
  const employeeID = employees.find(employee => employee.id === id);
  const animalID = animals.find(animal => animal.id === employeeID.responsibleFor[0]).residents;
  const arrAnimalOldest = animalID.reduce((acc, animal) =>
    (acc.age > animal.age ? acc : animal),
  );
  return [arrAnimalOldest.name, arrAnimalOldest.sex, arrAnimalOldest.age];
};

const increasePrices = (percentage) => {
  const newPrice = 1 + (percentage / 100);
  Object.keys(prices).forEach(key => (
    prices[key] = Math.round(prices[key] * newPrice * 100) / 100
  ));
};

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
