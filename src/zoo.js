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
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(name, age) {
  const typeOfAnimal = animals.find(animal => animal.name === name);
  return typeOfAnimal.residents.every(resident => resident.age >= age);
}

function employeeByName(name) {
  if (!name) return {};
  return employees.find(person => person.firstName === name || person.lastName === name);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(person => person.managers.find(personId => personId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((list, animal) => {
      list[animal.name] = animal.residents.length;
      return list;
    }, {});
  } return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(...entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}
console.log(animalMap({ includeNames: true }));

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const findAnimalId = employees.find(person => person.id === id).responsibleFor[0];
  const findAnimalSpecies = animals.find(animal => animal.id === findAnimalId);
  const oldestAnimal = findAnimalSpecies.residents.reduce((oldest, next) => {
    if (next.age > oldest.age) {
      oldest = next;
    }
    return oldest;
  });
  const { name, sex, age } = oldestAnimal;
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    return employees.reduce((list, person) => {
      list[`${person.firstName} ${person.lastName}`] = person.responsibleFor.map(id => animals.find(animal => animal.id === id).name);
      return list;
    }, {});
  }
  const employee = employees.find(info =>
    info.firstName === idOrName ||
    info.lastName === idOrName ||
    info.id === idOrName);
  return {
    [`${employee.firstName} ${employee.lastName}`]: employee.responsibleFor.map(id => animals.find(animal => animal.id === id).name),
  };
}
console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
