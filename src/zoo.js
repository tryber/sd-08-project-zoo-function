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
  if (!ids) return [];
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const animalsFilter = animals.filter(species => species.name === animal);
  return animalsFilter
    .every(species => species.residents.every(individuo => individuo.age > age));
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(person => person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {};
  Object.assign(newEmployee, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  return employees
    .some(person => person.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {};
  if (!managers) managers = [];
  if (!responsibleFor) responsibleFor = [];
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;
  employees.push(newEmployee);
}

function animalCount(species) {
  const animalsFind = {};
  if (!species) {
    animals.forEach((animal) => {
      const objectAnimal = {};
      objectAnimal[animal.name] = animal.residents.length;
      Object.assign(animalsFind, objectAnimal);
    });
    return animalsFind;
  }
  const objectAnimal = animals.find(animal => animal.name === species);
  return objectAnimal.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) return 0;
  let total = 0;
  const keys = Object.keys(entrants);
  const values = Object.values(entrants);
  keys.forEach((person, index) => {
    if (prices[person]) {
      total += (prices[person] * values[index]);
    }
  });
  return total;
}

function animalMap(options) {
  const map = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  if (!options || options.includeNames !== true) {
    animals.forEach((animal) => {
      map[animal.location].push(animal.name);
    });
  } else if (options.includeNames === true) {
    animals.forEach((animal) => {
      let sexAnimals = animal.residents;
      if (options.sex) {
        sexAnimals = animal.residents.filter(resident => resident.sex === options.sex);
      }
      const residentsNames = sexAnimals.map(resident => resident.name);
      if (options.sorted === true) {
        residentsNames.sort();
      }
      map[animal.location].push({ [animal.name]: residentsNames });
    });
  }
  return map;
}

function schedule(dayName) {
  const availableHours = {};
  if (!dayName) {
    const days = Object.keys(hours);
    days.forEach((day) => {
      availableHours[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
      if (day === 'Monday') availableHours[day] = 'CLOSED';
    });
  }
  if (dayName === 'Monday') {
    availableHours[dayName] = 'CLOSED';
  } else if (dayName) {
    availableHours[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  }
  return availableHours;
}

function oldestFromFirstSpecies(id) {
  const personByID = employees.find(person => person.id === id);
  const firstSpecie = personByID.responsibleFor[0];
  const specieFound = animals.find(animal => animal.id === firstSpecie);
  const oldestFromSpecie = specieFound.residents.reduce((acc, actual) => {
    if (actual.age > acc.age) acc = actual;
    return acc;
  }, { age: 0 });
  return Object.values(oldestFromSpecie);
}

function increasePrices(percentage) {
  const person = Object.keys(prices);
  const multiplier = 1 + (percentage / 99.99);
  person.forEach((entry) => {
    const num = parseFloat((prices[entry] * multiplier).toFixed(2));
    prices[entry] = num;
  });
  return prices;
}

function listAllEmployees() {
  const employeeList = {};
  employees.forEach((person) => {
    const animalsCovered = [];
    person.responsibleFor.forEach((animal) => {
      const findAnimal = animals.find(specie => animal === specie.id);
      animalsCovered.push(findAnimal.name);
    });
    employeeList[`${person.firstName} ${person.lastName}`] = animalsCovered;
  });
  return employeeList;
}

function employeeCoverage(idOrName) {
  const employeeList = {};
  if (!idOrName) {
    return listAllEmployees();
  }
  const employee = employees.find(person => person.id === idOrName
  || person.firstName === idOrName
  || person.lastName === idOrName);
  const animalsCovered = [];
  employee.responsibleFor.forEach((animal) => {
    const filter = animals.find(element => element.id === animal);
    animalsCovered.push(filter.name);
  });
  employeeList[`${employee.firstName} ${employee.lastName}`] = animalsCovered;
  return employeeList;
}
console.log(employeeCoverage('Stephanie'));

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
