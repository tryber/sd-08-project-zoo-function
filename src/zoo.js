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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return (ids = []);
  }

  return ids.map(eachId => animals.find(animal => animal.id === eachId));
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(element => element.name === animal);
  return findAnimal.residents.every(elem => elem.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return (employeeName = {});
  }

  return employees.find(
    eachName =>
      eachName.firstName === employeeName || eachName.lastName === employeeName,
  );
}


function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(eachEmployee => eachEmployee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const obj = { id, firstName, lastName, managers: [], responsibleFor: [] };
  if (!managers === undefined) {
    obj.managers.push(managers);
    obj.responsibleFor.push(responsibleFor);
  }
  employees.push(obj);
  console.log(managers);
}


function animalCount(species) {
  let animais = {};
  animals.forEach((eachOne) => {
    if (!species) {
      return (animais[eachOne.name] = eachOne.residents.length);
    }
    animais = animals.find(each => species === each.name).residents.length;
    return null;
  });
  return animais;
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
