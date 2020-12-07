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
  const array = [];
  const bringId = element => array.push(animals.filter(animalId => animalId.id === element)[0]);
  ids.forEach(bringId);
  return array;
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(animalName => animalName.name === animal);
  const mapAge = findAnimal.residents.map(animalInfo => animalInfo.age);
  const checkAge = animalsAge => animalsAge.every(minAge => minAge > 7);
  return checkAge(mapAge);
}

function employeeByName(employeeName) {
  const firstName = employees.find(employeeInfo => employeeInfo.firstName === employeeName);
  const lastName = employees.find(employeeInfo => employeeInfo.lastName === employeeName);
  if (firstName !== undefined) {
    return firstName;
  } else if (lastName !== undefined) {
    return lastName;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const objeto = {};
  Object.assign(objeto, personalInfo, associatedWith);
  return objeto;
}

function isManager(id) {
  let Manager = false;
  const mapAge = employees.map(employeeId => employeeId.managers);
  mapAge.forEach((element) => {
    if (element.includes(id) === true) {
      Manager = true;
    }
  });
  return Manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
  return employees.length;
}

function animalCount(species) {
  if (species === undefined) {
    const animais = animals.map(raca => raca.name);
    const animaisQtt = animals.map(qtt => qtt.residents.length);

    const object = {};
    for (let index = 0; index < animais.length; index += 1) {
      const insert = { [animais[index]]: animaisQtt[index] };
      Object.assign(object, insert);
    }
    return object;
  }
  const findAnimal = animals.find(animalName => animalName.name === species);
  return findAnimal.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const array = [];
  Object.keys(entrants).forEach((element) => {
    array.push(entrants[element] * prices[element]);
  });
  return array.reduce((accumulator, currentValue) => (
    accumulator + currentValue
  ), 0);
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
  const multiplier = (100 + percentage) / 100;
  Object.keys(prices).forEach((element) => {
    const currentPrice = prices[element];
    prices[element] = Math.round(currentPrice * multiplier * 100) / 100;
  });
  return prices;
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
