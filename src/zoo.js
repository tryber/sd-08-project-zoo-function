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

function animalsByIds(ids) {
  
}







function animalsOlderThan(animal, age) {
  return anim = data.animals.find(a => a.name === animal).residents.every(a => a.age > age);  
}









function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(p => p.firstName === employeeName || p.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
 
}


function isManager(id) { 


}






function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  const objectAnimal = data.animals.reduce((cont, animal) => {cont[animal.name] = animal.residents.length;
    return cont;
  }, {});
  if (species === undefined) {
    return objectAnimal;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
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
