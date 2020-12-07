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

const { employees, animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal)
  .residents.every(age1 => age1.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(
    employee => employee.firstName === employeeName || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(
    occupation => occupation.managers.find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species !== undefined) {
    return animals.find(specific => specific.name === species).residents.length;
  }
  const noParam = {};
  animals.forEach((all) => { noParam[all.name] = all.residents.length; });
  return noParam;
}

function entryCalculator(entrants) {
  return entrants && Object.keys(entrants).length > 0
  ? Object.keys(entrants)
    .reduce((acc, quantity) => (acc + (data.prices[quantity] * entrants[quantity])), 0)
  : 0;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const crono = {};
  if (dayName) {
    crono[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    if (dayName === 'Monday') {
      crono[dayName] = 'CLOSED';
    }else {(!dayName)
    Object.keys(data.hours).map((list) => {
      const arr = `Open from ${data.hours[list].open}am until ${data.hours[list].close - 12}pm`;
      crono[list] = arr;
      if (list === 'Monday') crono[list] = 'CLOSED';
      return crono;
    });
  }
  return crono;
}
}

function oldestFromFirstSpecies(id) {
  return Object.values(data.animals.find(el => el.id === data.employees
      .find(animal => animal.id === id).responsibleFor[0]).residents
      .sort((first, second) => second.age - first.age)[0]);
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  const target = {};
  let resp = {};

  if (!idOrName) {
    data.employees.forEach(element => Object.assign(target, searchAnimal(element)));
  } else {
    resp = searchResp(idOrName);
    Object.assign(target, searchAnimal(resp));
  }
  return target;
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
