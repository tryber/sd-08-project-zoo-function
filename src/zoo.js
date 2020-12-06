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
  const animalObjects = data.animals.filter((object, index) => (object.id === ids[index]));
  return animalObjects;
}

function animalsOlderThan(animal, age) {
  const animalFound = data.animals.find(animalObject => animalObject.name === animal);
  const ageList = animalFound.residents.map(resident => resident.age);
  return ageList.every(ageIndex => ageIndex >= age);
}

function employeeByName(employeeName = '') {
  const employerFound = (employeeName !== '') ? data.employees.find(employer => (employeeName === employer.firstName || employeeName === employer.lastName)) : {};
  return employerFound;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const employerFound = data.employees.find(employer => employer.id === id);
  return employerFound.managers.length <= 1;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObject = [{
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  }];
  data.employees = [...data.employees, ...newObject];
  return data.employees;
}

function animalCount(species = '') {
  const quantiForSpecieObject = data.animals.reduce((previousValue, currentValue) => {
    previousValue[currentValue.name] = currentValue.residents.length;
    return previousValue;
  }, {});
  const specieObject = data.animals.find(object => object.name === species);
  const count = (species === '') ? quantiForSpecieObject : specieObject.residents.length;
  return count;
}

function entryCalculator(entrants = '') {
  // seu código aqui
  const { Adult, Senior, Child } = data.prices;
  const { Adult: entrantAdult = 0, Senior: entrantSenior = 0, Child: entrantChild = 0 }
  = entrants;
  return (Adult * entrantAdult) + (Senior * entrantSenior) + (Child * entrantChild);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const employerObject = data.employees.find(employer => employer.id === id);
  const specieId = employerObject.responsibleFor[0];
  const specieObject = data.animals.find(specie => specie.id === specieId);
  const biggAge = specieObject.residents.reduce((biggerAge, animal) =>
  ((biggerAge > animal.age) ? biggerAge : animal.age));
  const animalObject = specieObject.residents.find(animal => animal.age === biggAge);
  const { name, sex, age } = animalObject;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  data.prices = {
    Adult: Math.ceil(Adult * (100 + percentage)) / 100,
    Senior: Math.ceil(Senior * (100 + percentage)) / 100,
    Child: Math.ceil(Child * (100 + percentage)) / 100,
  };
  return data.prices;
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
