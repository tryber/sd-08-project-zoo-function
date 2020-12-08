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
  return employees.find(({ firstName, lastName }) =>
    {firstName === employeeName[0] || lastName === employeeName[0]});
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
  // seu código aqui
}

function animalCount(species) {
  let AnimalObject = {};
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
