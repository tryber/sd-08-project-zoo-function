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

const { animals, employees, prices, hours } = require('./data');  // object destructuring
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  const compareAnimal = animals.find(specie => specie.name === animal)
  .residents.every(resident => resident.age >= age);
  return compareAnimal;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  function analyzeEmployee(employee) {
    return employee.firstName === employeeName || employee.lastName === employeeName;
  }
  return employees.find(name => analyzeEmployee(name));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return employees.some((employee, index) => employee.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const manager = {
    id,
    firstName,
    lastName,
    managers: [],
    responsibleFor: [],
  };
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  const newEmployee = !managers ? employees.push(manager) : employees.push(employee);
  return newEmployee;
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  const valueEntrance = Object.keys(entrants);
  const ticketSum = valueEntrance.reduce((sum, index) => {
    sum += entrants[index] * prices[index];
    return sum;
  }, 0);
  return ticketSum;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const weekDays = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  const businessDay = {};
  if (!dayName) return weekDays;
  if (dayName === 'Monday') {
    businessDay[dayName] = 'CLOSED';
  } else {
    businessDay[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  }
  return businessDay;
}

function oldestFromFirstSpecies(id) {
  const responsible = employees.find(employee => employee.id === id).responsibleFor[0];
  const older = animals
  .find(animal => animal.id === responsible).residents
  .sort((animalA, animalB) => animalB.age - animalA.age);
  return Object.values(older[0]);
}

function increasePrices(percentage) {
  // seu código aqui
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
