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

const { animals } = require('./data');
const data = require('./data');
const { employees } = require('./data');
const data2 = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return animals.filter(({ id }) => ids[0] === id || ids[1] === id);
}

function animalsOlderThan(animalType, ageTest) {
  const find = animals.find(({ name }) => name === animalType);
  return find.residents.every(({ age }) => age >= ageTest);
}

function employeeByName(...employeeName) {
  if (employeeName.length === 0) return {};
  return employees.find(({ firstName, lastName }) => {
    const testFirst = firstName === employeeName[0];
    const testLast = lastName === employeeName[0];
    return testFirst || testLast;
  });
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  let retorno = false;
  employees.forEach((element, index, array) => {
    const test = array.some(el => id === el.managers[index]);
    if (test === true) retorno = true;
  });
  return retorno;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if(!managers) managers = [];
  if(!responsibleFor) responsibleFor = [];
  
  console.log(id);
  console.log(firstName);
  console.log(lastName);
  console.log(managers);

  console.log(responsibleFor);
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  console.log(personalInfo);
  console.log(associatedWith);
  employees.push(createEmployee(personalInfo, associatedWith));
}
addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe');

// addEmployee('4141da1c-a6ed-4cf7-90c4-99c657ba4ef3', 'Jane', 'Doe',
//       [
//         '546fe3d4-2d81-4bb4-83a7-92d5b7048d17',
//         'a67a36ee-3765-4c74-8e0f-13f881f6588a',
//       ],
//       [
//         'ee6139bf-b526-4653-9e1e-1ca128d0ad2e',
//         '210fcd23-aa7b-4975-91b7-0230ebb27b99',
//       ]);

function animalCount(species) {
  const AnimalObject = {};
  if (species === undefined) {
    for (let index = 0; index < animals.length; index += 1) {
      const animalName = `${animals[index].name}`;
      const AnimalNumber = `${animals[index].residents.length}`;
      AnimalObject[animalName] = Number(AnimalNumber);
      console.log(AnimalObject);
    }
    return AnimalObject;
  }
  const find = animals.find(({ name }) => species === name);
  return find.residents.length;
}

function entryCalculator(entrants) {
  console.log(entrants);
  if (entrants === {}) return 0;
  
  const adult = entrants[0];
  const child = entrants[1];
  const senior = entrants[2];

  console.log(adult, child, senior);

}

entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 });

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
