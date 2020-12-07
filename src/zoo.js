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
  return animals.filter(animal => ids.find(idAnimal => animal.id === idAnimal));
}
console.log(animalsByIds());

function animalsOlderThan(animal, age) {
  return animals.find(animalCallBack => animalCallBack.name === animal)
  .residents.every(resident => resident.age > age);
}
console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees
  .find(name => name.firstName === employeeName || name.lastName === employeeName);
}
console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees
  .some(person => person.managers
    .some(manager => manager === id));
}
  /* console.log(`${person.managers[1]} === ${id}`);*/
    /* console.log(`${manager} === ${id}`);*/
console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees
  .push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  // seu código aqui
}
// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));
// console.log(employees.length);
// console.log(employees[8]);
// console.log(employees);

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((result, currentValue) => {
      result[currentValue.name] = currentValue.residents.length;
      return result;
    }, {});
  }
  return animals.find(animalSpecie => species === animalSpecie.name).residents.length;
  // seu código aqui
}
console.log(animalCount('lions'));

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
