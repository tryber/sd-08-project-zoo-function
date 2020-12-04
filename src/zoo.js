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
  if (ids.length === 0) {
    return ids;
  }
  return data.animals.filter(animal => ids.includes(animal.id));
}

// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce',
//  'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

function animalsOlderThan(animal, age) {
  return data.animals.find(item => item.name === animal).residents.every(item => item.age > age);
}

// console.log(animalsOlderThan('penguins', 10));

function employeeByName(emp) {
  if (emp === undefined) {
    return {};
  }
  return data.employees
    .find(nome => nome.firstName === emp || nome.lastName === emp);
}

// console.log(employeeByName('Wishart'));

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// const personalInfo = {
//   id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
//   firstName: 'John',
//   lastName: 'Doe',
// };

// const associatedWith = {
//   managers: [
//     'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//     '9e7d4524-363c-416a-8759-8aa7e50c0992'
//   ],
//   responsibleFor: [
//     '0938aa23-f153-4937-9f88-4858b24d6bce',
//     '89be95b3-47e4-4c5b-b687-1fabf2afa274',
//     'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'
//   ]
// };

// console.log(createEmployee(personalInfo, associatedWith));

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
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
