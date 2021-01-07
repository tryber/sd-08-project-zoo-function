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
  if (!ids) {
    return [];
  }
  const animais = data.animals;
  const animaisFiltrados = animais.filter(each => each.id === ids[0] || each.id === ids[1]);
  return animaisFiltrados;
}

function animalsOlderThan(animal, age) {
  const animais = data.animals;
  const animalSelecionado = animais.find(each => each.name === animal);
  const residentes = animalSelecionado.residents;
  const resultado = residentes.every(each => each.age >= age);
  return resultado;
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const employees = data.employees;
  const resultado = employees.find(each => Object.values(each).includes(employeeName));
  return resultado;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  // newEmployee.managers = associatedWith.managers;
  // newEmployee.responsibleFor = associatedWith.responsibleFor;
  return newEmployee;
}

function isManager(id) {
  const employees = data.employees;
  const managers = employees.find(each => each.managers.includes(id));
  if (!managers) {
    return false;
  }
  return true;
}
console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (!responsibleFor) {
    responsibleFor = [];
  }
  if (!managers) {
    managers = [];
  }
  
  let newEmployee = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    managers: managers,
    responsibleFor: responsibleFor
  };
  // let n =  data.employees.length;
  data.employees.push(newEmployee);
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
