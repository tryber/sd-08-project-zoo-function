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

const { animals, employees } = data;

function animalsByIds(...ids) {
  if (ids.length === 0) return ids;
  return animals.filter(animal => ids.includes(animal.id));
}

// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce',
//   'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

function animalsOlderThan(animal, age) {
  return animals
    .find(item => item.name === animal)
    .residents.every(item => item.age >= age);
}

// console.log(animalsOlderThan('penguins', 10));

function employeeByName(emp) {
  if (emp === undefined) return {};
  return employees.find(
    nome => nome.firstName === emp || nome.lastName === emp,
  );
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
//     '9e7d4524-363c-416a-8759-8aa7e50c0992',
//   ],
//   responsibleFor: [
//     '0938aa23-f153-4937-9f88-4858b24d6bce',
//     '89be95b3-47e4-4c5b-b687-1fabf2afa274',
//     'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5',
//   ],
// };

// console.log(createEmployee(personalInfo, associatedWith));

function isManager(id) {
  return employees.some(nome => nome.managers.includes(id));
}

// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const personalInfo1 = { id, firstName, lastName };
  const associatedWith1 = { managers, responsibleFor };
  // const result = [];
  employees.push(createEmployee(personalInfo1, associatedWith1));
  // result.push(createEmployee(personalInfo1, associatedWith1));
  // return result;
}

// console.log(
//   addEmployee(
//     '4141da1c-a6ed-4cf7-90c4-99c657ba4ef3',
//     'Jane',
//     'Doe',
//     [
//       '546fe3d4-2d81-4bb4-83a7-92d5b7048d17',
//       'a67a36ee-3765-4c74-8e0f-13f881f6588a',
//     ],
//     [
//       'ee6139bf-b526-4653-9e1e-1ca128d0ad2e',
//       '210fcd23-aa7b-4975-91b7-0230ebb27b99',
//     ],
//   ),
// );

function animalCount(species) {
  const result = animals.reduce((total, curr) => {
    total[curr.name] = curr.residents.length;
    return total;
  }, {});
  if (species) return result[species];
  return result;
}

// console.log(animalCount('lions'));

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
