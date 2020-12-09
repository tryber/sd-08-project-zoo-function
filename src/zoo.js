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
const { prices } = require('./data');
const data3 = require('./data');

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
  if (!managers) managers = [];
  if (!responsibleFor) responsibleFor = [];
  const newEmploy = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmploy);
}

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
  // console.log(entrants);
  // if (entrants === {}) return 0;
  // const adult = entrants[0];
  // const child = entrants[1];
  // const senior = entrants[2];
}
// entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 });

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
  const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
});
  for (key in prices) {
    const inc = percentage / 100;
    prices[key] = (prices[key] + (prices[key] * inc));
    prices[key] = Number(formatter.format(prices[key]));
  }
  console.log(prices);
}
increasePrices(50);
// API para arredondamento(https://qastack.com.br/programming/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript)

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
