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

const { animals, employees } = require('./data');

const animalsByIds = (...ids) => ids.map(id => animals.find(animal => animal.id === id));

const animalsOlderThan = (animal, age) => animals.find(specie => specie.name === animal)
  .residents.every(specie => specie.age >= age);

const employeeByName = (employeeName) => {
  if (!employeeName) return {};

  return employees.find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
};

const createEmployee = (personalInfo, associatedWith) => {
  return employee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [...associatedWith.managers],
    responsibleFor: [...associatedWith.responsibleFor],
  };
};

const isManager = (id) => employees.find(employee => employee.managers.find(manager => manager === id) ? true : false);

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
    return animals.reduce((accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.residents.length;

      return accumulator;
    }, {});
  };

  return animals.find(animal => animal.name === species).residents.length;
};

const entryCalculator = (entrants) => {

}

const animalMap = (options) => {

}

const schedule = (dayName) => {

}

const oldestFromFirstSpecies = (id) => {

}

const increasePrices = (percentage) => {

}

const employeeCoverage = (idOrName) => {

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
