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
  if (ids.length < 1){
    return [ ];
  }
  let animById = [ ];
    ids.forEach((elem1, index) => {
       animById [index] = data.animals.find((elem) => {
       return elem1 === elem.id;
     });
  });
  return(animById);
}

function animalsOlderThan(animal, age) {
  
  //const bool = data.animals.filter(elem => elem.name = animal).some(elem2 => elem2.location == 'NW');
  
}
// console.log(`${data.animals}`);
// console.table(animalsOlderThan('penguins', 10));
// console.table(animalsOlderThan('otters', 7));

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
