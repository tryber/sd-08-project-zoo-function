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

const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) return [];
  return animals.filter(element => ids.includes(element.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find(element => element.name === animal)
    .residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(
    element =>
      element.firstName === employeeName || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some(element => element.managers.includes(id));
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
  if (species === undefined) {
    const objeto = {};
    animals.forEach((element) => {
      objeto[element.name] = element.residents.length;
    });
    return objeto;
  }
  return animals.filter(element => species === element.name)[0].residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  const { Adult, Senior, Child } = prices;
  let total = 0;
  const arr = Object.entries(entrants);
  arr.forEach((element) => {
    if (element[0] === 'Adult') {
      total += Adult * element[1];
    }
    if (element[0] === 'Child') {
      total += Child * element[1];
    }
    if (element[0] === 'Senior') {
      total += Senior * element[1];
    }
  });
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const obj = {};
  Object.keys(hours).forEach((element) => {
    obj[element] = `Open from ${hours[element].open}am until ${(hours[element].close) - 12}pm`;
  });
  obj.Monday = 'CLOSED';
  if (dayName === undefined) return obj;

  return { [dayName]: obj[dayName] };
}

function oldestFromFirstSpecies(id) {
  const idAnimal = employees.find(element => element.id === id).responsibleFor[0];
  const residentsAnimals = animals.find(element => element.id === idAnimal).residents;
  let oldAnimal = residentsAnimals[0].age;
  residentsAnimals.forEach((element) => {
    if (element.age > oldAnimal) {
      oldAnimal = element;
    }
  });
  const { name, sex, age } = oldAnimal;
  return [name, sex, age];
}


function increasePrices(percentage) {
  Object.keys(prices)
    .forEach((categoria) => {
      prices[categoria] = Math.ceil(prices[categoria] * (percentage + 100)) / 100;
    });
}

function localizaAnimal(id) {
  return animals.filter(element => id === element.id)[0].name;
}
function employeeCoverage(idOrName) {
  const obj = {};
  let result = 0;
  employees.forEach((element) => {
    obj[`${element.firstName} ${element.lastName}`] = element.responsibleFor
      .map(elemento => localizaAnimal(elemento));
  });
  if (idOrName === undefined) {
    result = obj;
  } else if (idOrName.length === 36) {
    const firstName = employees.find(element => element.id === idOrName).firstName;
    const lastName = employees.find(element => element.id === idOrName).lastName;
    result = { [`${firstName} ${lastName}`]: obj[`${firstName} ${lastName}`] };
  } else {
    const n = employees.find(e => e.firstName === idOrName || e.lastName === idOrName);
    result = { [`${n.firstName} ${n.lastName}`]: obj[`${n.firstName} ${n.lastName}`] };
  }
  return result;
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
