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

const { prices } = require('./data');
const data = require('./data');
// 1
function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}
// 2
function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalsSpecies = data.animals.find(species => species.name === animal);
  const speciesOlderThan = animalsSpecies.residents.every(specie => specie.age >= age);
  return speciesOlderThan;
}
// 3
function employeeByName(employeeName) {
  const objectFuncionario = {};
  if (!employeeName) {
    return objectFuncionario;
  }
  const emplName = employeeName;
  const emplData = data.employees;

  const getObj = emplData.find(empl => empl.firstName === emplName || empl.lastName === emplName);
  return getObj;
}
// 4
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return createNewEmployee;
}
// 5
function isManager(id) {
  // seu código aqui
  const empData = data.employees;
  const getManager = empData.some(man => man.managers.find(manId => manId === id));
  return getManager;
}

// 6
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  const employeeIncluded = data.employees.push(newEmployee);
  return employeeIncluded;
}
// 7
function animalCount(species) {
  // seu código aqui
  if (species) {
    const findAnimals = data.animals.find(element => element.name === species);
    const animalLength = findAnimals.residents.length;
    return animalLength;
  }
  return data.animals.reduce((accumulator, current) => {
    accumulator[current.name] = current.residents.length;
    return accumulator;
  }, {});
}

// 8
function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult: adultQt = 0, Senior: seniorQt = 0, Child: childQt = 0 } = entrants;
  const { Adult, Senior, Child } = data.prices;
  const totalValue = (adultQt * Adult) + (seniorQt * Senior) + (childQt * Child);
  return totalValue;
}
// 9
function animalMap(options) {
  // seu código aqui
}
// 10
function schedule(dayName) {
  let obj = {};
  const hours = data.hours;
  const week = Object.keys(hours);
  if (dayName) {
    obj = { ...obj, [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
    if (dayName === 'Monday') {
      obj = { ...obj, [dayName]: 'CLOSED' };
    }
  } else {
    week.forEach((key) => {
      obj = { ...obj, [key]: `Open from ${hours[key].open}am until ${hours[key].close - 12}pm` };
      if (key === 'Monday') {
        obj = { ...obj, [key]: 'CLOSED' };
      }
    });
  }
  return obj;
}

// 11
function oldestFromFirstSpecies(id) {
  // seu código aqui
}
// 12
function increasePrices(percentage) {
  // seu código aqui
}
// 13
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
