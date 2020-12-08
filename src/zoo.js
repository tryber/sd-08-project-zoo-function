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

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
    return animals.filter(({id}) => ids[0] === id || ids[1] === id);
}

function animalsOlderThan(animalType, ageTest) {
  let retorno;
  let find = animals.find(({name}) => name === animalType);
  console.log(find);
  retorno = find.residents.every(({age}) => age >= ageTest);
   
  // let result = animals.find(animal => animal.name === animalType);
  // console.log(result);
  // if (result) result = result.residents.every(animal => animal.age >= age);
  // retorno = result;
  
  console.log(retorno);
  // retorno = find.every(({resident}) => resident.age >= age);
  //código antigo:
  // let filterName = animals.filter(({name}) => (name === animal));
  // console.log(filterName);
  // //    let teste = animals.every(({residents}) => (residents.age >= age));
  // console.log(teste);

  // retorno = filterName.every(({residents}) => residents.age >= age);
  console.log(retorno);
  return retorno;
}
animalsOlderThan('otters', 7);

function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

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
