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

// map()
// reduce()
// filter()
// find()
// sort()

const { andataimals, employees, hours, prices } = require('./data');

const animalsByIds = (...ids) => ids.map(id => animals.find(animal => animal.id === id));

const animalsOlderThan = (animal, age) => animals.find(specie => specie.name === animal)
  .residents.every(specie => specie.age >= age);

const employeeByName = (employeeName) => {
  if (!employeeName) return {};

  return employees.find(employee => employee.firstName === employeeName ||
    employee.lastName === employeeName);
};

const createEmployee = (personalInfo, associatedWith) => {
  const employee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [...associatedWith.managers],
    responsibleFor: [...associatedWith.responsibleFor],
  };

  return employee;
};

const isManager = (id) => {
  if (employees.find(employee => employee.managers
    .find(manager => manager === id))) return true;

  return false;
};

const addEmployee = (id, firstName, lastName, managers, responsibleFor) => {
  if (!managers) managers = [];
  if (!responsibleFor) responsibleFor = [];

  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
};

const animalCount = (species) => {
  if (!species) {
    const list = animals.reduce((accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.residents.length;

      return accumulator;
    }, {});

    return list;
  }

  return animals.find(animal => animal.name === species).residents.length;
};

const entryCalculator = (entrants) => {
  if (!entrants) return 0;

  return (Object.keys(entrants).reduce((accumulator, currentValue) =>
    accumulator + (entrants[currentValue] * prices[currentValue]), 0));
};

const animalMap = (options) => {

};

const schedule = (dayName) => {
  const specificSchedule = {};

  Object.keys(hours).forEach((day) => {
    if (hours[day].open === hours[day].close) {
      specificSchedule[day] = 'CLOSED';
    } else {
      specificSchedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });

  if (dayName !== undefined) {
    return { [dayName]: specificSchedule[dayName] };
  }

  return specificSchedule;
};

const oldestFromFirstSpecies = (id) => {
  const { residents } = animals.find(
    animal => animal.id === employees.find(employee => employee.id === id).responsibleFor[0]);

  const animal = residents.reduce((accumulator, currentValue) => (accumulator.age > currentValue.age ? accumulator : currentValue));

  return [animal.name, animal.sex, animal.age];
};

const increasePrices = (percentage) => {
  Object.keys(prices).map(
    category => prices[category] = Math.round(prices[category] * ((percentage / 100) + 1) * 100) / 100);
};

const employeeCoverage = (idOrName) => {

};

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
