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
  const { Adult, Senior, Child } = prices;
  const totalValue = (adultQt * Adult) + (seniorQt * Senior) + (childQt * Child);
  return totalValue;
}
// 9
function animalMap(options) {
  // seu código aqui
}
// 10
function schedule(dayName) {
  const hours = data.hours;
  let obj = {};
  Object.keys(hours).forEach((element) => {
    const keyWeek = dayName || element;
    obj = { ...obj, [keyWeek]: `Open from ${hours[keyWeek].open}am until ${hours[keyWeek].close - 12}pm` };
    if (keyWeek === 'Monday') {
      obj[keyWeek] = 'CLOSED';
    }
  });
  return obj;
}
// 11
function oldestFromFirstSpecies(id) {
  const animalIds = data.employees.find(employeeId => employeeId.id === id).responsibleFor;
  const animals = data.animals.find(animalId => animalId.id === animalIds[0]);
  const getOlderAnimal = animals.residents.reduce((animalA, animalB) => {
    if (animalA.age > animalB.age) return animalA;
    return animalB;
  });
  const arrayAnimal = Object.values(getOlderAnimal);
  return arrayAnimal;
}
console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
// 12
function increasePrices(percentage) {
  const aumento = ((percentage / 100) + 1);
  prices.Adult = Math.round(prices.Adult * 100 * aumento) / 100;
  prices.Senior = Math.round(prices.Senior * 100 * aumento) / 100;
  prices.Child = Math.round(prices.Child * 100 * aumento) / 100;
  return prices;
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
