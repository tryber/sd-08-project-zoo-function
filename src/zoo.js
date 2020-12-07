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
  if (ids === undefined) return [];
  const id = ids.map(animals => (data.animals.find(animal => animal.id.includes(animals))));
  return id;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const nargas = data.animals.find(elemt => elemt.name === animal);
  return nargas.residents.every(elemt => elemt.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  const funcionarios = data.employees
  .find(name => (name.firstName === employeeName || name.lastName === employeeName));
  return funcionarios;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newPerson = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newPerson;
}

function isManager(id) {
  // seu código aqui
  const verify = data.employees.map(name => name.managers);
  const verifyManagement = verify.some(name => name.includes(id));
  return verifyManagement;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newAddEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newAddEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species !== undefined) {
    const retorno = data.animals.find(name => name.name === species);
    return retorno.residents.length;
  }
  const animals = data.animals.reduce((name, value) => {
    name[value.name] = value.residents.length;
    return name;
  }, {});
  return animals;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined) return 0;
  const price = Object.entries(data.prices);
  const aux = Object.entries(entrants);
  const acumulator = 0;
  aux.foreach((value) =>{
    price.foreach((priceV) => {
      acumulator += priceV[0] === value [0] ? priceV[1] * value[1] : 0; 
    });
  });
  return acumulator;
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
