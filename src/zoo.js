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
  return data.animals.filter(animal => ids.includes(animal.id));
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
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return data.employees.some(m => m.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers=[], responsibleFor=[]) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
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
  const people = data.prices;
  let cont = 0;
  
  // if (entrants === undefined || entrants === Object.length == 0) {
  //   return 0;
  // }

  return Object.keys(people.Adult.value);
  
}

console.log(entryCalculator({ 'Adult': 1 }))








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
