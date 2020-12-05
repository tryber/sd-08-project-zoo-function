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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const result = [];
  if (ids.length === 0) return result;
  const findById = param => animals.find(animal => animal.id === param);
  ids.forEach(param => result.push(findById(param)));
  return result;
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(element => element.name === animal);
  return findAnimal.residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(employee => employee.firstName === employeeName ||
    employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {};
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;

  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const animalsAndNumbers = {};
    animals.forEach((animal) => {
      animalsAndNumbers[animal.name] = animal.residents.length;
    });
    return animalsAndNumbers;
  }
  const animalBySpecie = animals.find(animal => animal.name === species);
  return animalBySpecie.residents.length;
}

function entryCalculator(entrants) {
  let needToBePayed = 0;
  if (entrants === undefined || Object.keys(entrants).length === 0) return needToBePayed;

  const keys = Object.keys(entrants);
  keys.forEach((key) => {
    if (key === 'Adult') {
      needToBePayed += parseFloat(entrants[key] * 49.99);
    }
    if (key === 'Child') {
      needToBePayed += parseFloat(entrants[key] * 20.99);
    }
    if (key === 'Senior') {
      needToBePayed += parseFloat(entrants[key] * 24.99);
    }
  });

  return needToBePayed;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
    // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const findEmployeeById = employees.find(employee => employee.id === id);
  const animalId = findEmployeeById.responsibleFor[0];
  const findAnimalById = animals.find(animal => animal.id === animalId);
  const animalsResidents = findAnimalById.residents;
  animalsResidents.sort((a, b) => b.age - a.age);
  return [animalsResidents[0].name, animalsResidents[0].sex, animalsResidents[0].age];
}

function increasePrices(percentage) {
  const multiplier = 1 + (percentage / 100);
  Object.keys(prices).forEach((key) => {
    let increase = prices[key];
    increase = Math.round(increase * multiplier * 100) / 100;
    prices[key] = increase;
  });
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    let employeeFullName = [];
    let animalCoveredNames = [];
    const noParam = {};

    employees.forEach(employee => {
      employeeFullName = [];
      animalCoveredNames = [];
      employeeFullName.push(`${employee.firstName} ${employee.lastName}`);
      const animalCoveredIds = employee.responsibleFor;
      animalCoveredIds.forEach((animalId) => {
        let animalCoveredInfos = animals.find(animal => animal.id === animalId);
        animalCoveredNames.push(animalCoveredInfos.name);
        noParam[employeeFullName] = animalCoveredNames;
     });
    });
    return noParam;
  }
  const employeeByIdOrName = employees.find((employee) => {
    return employee.id === idOrName || employee.firstName === idOrName || employee.lastName === idOrName;
  })
  const employeeFullName = `${employeeByIdOrName.firstName} ${employeeByIdOrName.lastName}`;
  const animalCoveredIds = employeeByIdOrName.responsibleFor;
  let animalCoveredNames = [];
  animalCoveredIds.forEach((animalId) => {
    let animalCoveredInfos = animals.find(animal => animal.id === animalId);
    animalCoveredNames.push(animalCoveredInfos.name);
  });
  return {[employeeFullName]: animalCoveredNames};
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
