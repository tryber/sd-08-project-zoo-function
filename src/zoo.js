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
const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  return ids.map(itemId => animals.find(itemAnimal => itemAnimal.id === itemId));
}

function animalsOlderThan(animal, age) {
  return animals.find(item => item.name === animal).residents.every(some => some.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(obj => obj.firstName === employeeName || obj.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(item => item.managers.find(byId => byId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const peopleNew = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(peopleNew);
}

function animalCount(species) {
  if (species !== undefined) {
    return animals.find(item => item.name === species).residents.length;
  }
  return animals.reduce((rolAnimals, eachAnimal) =>
    ({ ...rolAnimals, [eachAnimal.name]: eachAnimal.residents.length })
  , {});
}

function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const { Adult: adultPrice, Senior: seniorPrice, Child: childPrice } = prices;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (adultPrice * Adult) + (seniorPrice * Senior) + (childPrice * Child);
}


function animalMap(options) {

}

function schedule(dayName) {
  const openTime = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  return !dayName ? openTime : Object.fromEntries([[dayName, openTime[dayName]]]);
}

function oldestFromFirstSpecies(id) {
  const findAnimalById = employees.find(person => person.id === id).responsibleFor[0];
  const findAnimalBySpecies = animals.find(animal => animal.id === findAnimalById);
  const oldestAnimal = findAnimalBySpecies.residents.reduce((oldest, next) => {
    if (next.age > oldest.age) {
      oldest = next;
    }
    return oldest;
  });
  const { name, sex, age } = oldestAnimal;
  return [name, sex, age];
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((element) => {
    prices[element[0]] = Math.round(element[1] * ((percentage / 100) + 1) * 100) / 100;
  });
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
