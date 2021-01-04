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
    return [];
  }
  const speciesFromId = animals.filter(species => ids.includes(species.id));
  return speciesFromId;
}

function animalsOlderThan(animal, age) {
  return data.animals.find(animalName => animalName.name === animal)
    .residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employee => (
    employee.firstName === employeeName || employee.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const noParameter = data.animals.reduce((animal, current) => {
      animal[current.name] = current.residents.length;
      return animal;
    }, {});
    return noParameter;
  }
  const search = data.animals.find(specimen => specimen.name === species);
  const counter = search.residents.length;
  return counter;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const profit = (data.prices.Adult * Adult)
  + (data.prices.Child * Child)
  + (data.prices.Senior * Senior);
  return profit;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  if (dayName === undefined) {
    return {
      'Tuesday': 'Open from 8am until 6pm',
      'Wednesday': 'Open from 8am until 6pm',
      'Thursday': 'Open from 10am until 8pm',
      'Friday': 'Open from 10am until 8pm',
      'Saturday': 'Open from 8am until 10pm',
      'Sunday': 'Open from 8am until 8pm',
      'Monday': 'CLOSED'
    }
  }
  return data.hours.find(day => day.hours === dayName);
}

function oldestFromFirstSpecies(id) {
  const searchEmployee = data.employees.find(employee => employee.id === id);
  const firstAnimal = searchEmployee.responsibleFor[0];
  const idList = animals.find(elemento => elemento.id === firstAnimal);
  const residentsId = idList.residents;
  const oldest = residentsId.reduce((animal, current) => {
    if (animal > (current.age)) { return animal; }
    return current.age;
  }, {});
  const locate = residentsId.find(element => element.age === oldest);
  const arr = Object.keys(locate).map(entry => locate[entry]);
  return arr;
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
