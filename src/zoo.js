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
  // seu código aqui
  const arr = data.animals.filter(element => ids.includes(element.id));
  return arr;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals
    .find(element => element.name === animal)
    .residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  let result = data.employees
    .filter(element => element.firstName === employeeName || element.lastName === employeeName)[0];
  if (result === undefined) {
    result = {};
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  // seu código aqui
  const obj = {};
  data.animals.forEach((element) => {
    obj[element.name] = element.residents.length;
  });
  if (species === undefined) {
    return obj;
  }
  return obj[species];
}

function entryCalculator(entrants = {}) {
  // seu código aqui
  const ageRange = Object.keys(data.prices);
  const price = Object.values(data.prices);
  const people = Object.entries(entrants);
  return people
    .reduce((acc, element) => acc + (price[ageRange.indexOf(element[0])] * element[1]), 0);
}

const includeName = (obj) => {
  data.animals.forEach((element) => {
    const animal = {};
    animal[element.name] = element.residents.map(element2 => element2.name);
    obj[element.location].push(animal);
  });
};

const sortNames = (obj, condition) => {
  if (condition) {
    const keys = Object.keys(obj);
    keys.forEach((location) => {
      obj[location].forEach((animal) => {
        const key = Object.keys(animal);
        animal[key].sort();
      });
    });
  }
};

const helpFunction = resident => resident.name;

const genderFilter = (obj, gender) => {
  if (gender !== undefined) {
    data.animals.forEach((element) => {
      obj[element.location]
        .find(animal => Object.keys(animal).includes(element.name))[element.name] =
          element.residents.filter(resident => resident.sex === gender)
          .map(helpFunction);
    });
  }
};

function animalMap({ includeNames, sorted, sex } = {}) {
  // seu código aqui
  const obj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  if (includeNames) {
    includeName(obj);
    genderFilter(obj, sex);
    sortNames(obj, sorted);
  } else {
    data.animals.forEach((element) => {
      obj[element.location].push(element.name);
    });
  }
  return obj;
}

function schedule(dayName) {
  // seu código aqui
  const days = Object.keys(data.hours);
  const time = Object.values(data.hours);
  let obj = {};
  days.forEach((element, index) => {
    obj[element] = (element !== 'Monday')
        ? `Open from ${time[index].open}am until ${time[index].close - 12}pm`
        : 'CLOSED';
  });
  const objArray = Object.keys(obj);
  if (objArray.includes(dayName)) {
    obj = { [dayName]: obj[dayName] };
  }
  return obj;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const animalId = data.employees.find(employee => employee.id === id).responsibleFor[0];
  return Object.values(data.animals
      .find(animal => animal.id === animalId).residents
      .sort((animalA, animalB) => animalB.age - animalA.age)[0]);
}

function increasePrices(percentage) {
  // seu código aqui
  const price = Object.entries(data.prices);
  price.forEach((element) => {
    const priceIncreased = (element[1] + (element[1] * (percentage/100)));
    data.prices[element[0]] = Math.round(priceIncreased * 100)/100;
// source: https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
  });
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
