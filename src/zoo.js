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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const values = [];
  ids.forEach((element) => {
    values.push(animals.find(animal => animal.id === element));
  });
  return values;
}

function animalsOlderThan(animal, age) {
  let result;
  animals.filter((element) => {
    if (element.name === animal) {
      result = element.residents.every(elem => elem.age >= age);
    }
    return result;
  });
  return result;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(elem => elem.firstName === employeeName || elem.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  let result = [];
  employees.forEach((elem) => {
    result.push(elem.managers);
    result = result.flat(Infinity);
  });
  return result.some(num => num === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(obj);
}

function animalCount(species) {
  let value;
  const obj = {};
  if (species === undefined) {
    animals.forEach((elem) => {
      obj[elem.name] = elem.residents.length;
    });
    return obj;
  }
  animals.find((elem) => {
    if (elem.name === species) {
      value = elem.residents.length;
    }
    return value;
  });
  return value;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce(
    (acc, value) => acc + (prices[value] * entrants[value]), 0);
}

function animalMap(options) {
  const list = {
    NE: animals.filter(value => value.location === 'NE').map(animal => animal.name),
    NW: animals.filter(value => value.location === 'NW').map(animal => animal.name),
    SE: animals.filter(value => value.location === 'SE').map(animal => animal.name),
    SW: animals.filter(value => value.location === 'SW').map(animal => animal.name),
  };
  return list;
}
// function oneDay(dayName) {
//   let obj = {};
//   Object.keys(hours).find((elem) => {
//     if (dayName === 'Monday') {
//       obj = { [elem]: 'CLOSED' };
//     } else if (elem === dayName) {
//       obj = { [elem]: `Open from ${hours[elem].open}am until ${hours[elem].close - 12}pm` };
//     }
//     return obj;
//   });
//   return obj;
// }

function open(elem) {
  return { [elem]: `Open from ${hours[elem].open}am until ${hours[elem].close - 12}pm` };
}

function schedule(dayName) {
  let obj = {};
  let obj2 = {};
  Object.keys(hours).find((elem) => {
    if (dayName === 'Monday') {
      obj = { [dayName]: 'CLOSED' };
    } else {
      obj = open(elem);
    }
    return obj;
  });
  if (dayName === undefined) {
    Object.keys(hours).forEach((elem) => {
      if (elem === 'Monday') {
        obj2 = { [elem]: 'CLOSED' };
      } else {
        obj2 = open(elem);
      }
      Object.assign(obj, obj2);
    });
  }
  return obj;
}

function oldestFromFirstSpecies(id) {
  const result = employees.find(elem => elem.id === id);
  const resultAnimal = animals.find(elem => result.responsibleFor[0] === elem.id);
  const oldest = resultAnimal.residents.map(elem => elem.age).sort((b, a) => a - b);
  return Object.values(resultAnimal.residents.find(elem => elem.age === oldest[0]));
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
