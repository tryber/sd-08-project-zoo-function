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
const { animals, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const animalSpecie = data.animals.filter(species => species.name === animal);
  return animalSpecie[0].residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  } return data.employees.find(name =>
      name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, lastName, firstName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newVacancy = { id, firstName, lastName, managers, responsibleFor };
  return newVacancy;
}

function isManager(id) {
  const managerOrNot = data.employees.some(employee =>
    employee.managers.includes(id));
  return managerOrNot;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((animalOBject, animal) => {
      animalOBject[animal.name] = animal.residents.length;
      return animalOBject;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || (Object.entries(entrants).length === 0)) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const totalAdult = Adult * prices.Adult;
  const totalSenior = Senior * prices.Senior;
  const totalChild = Child * prices.Child;

  return (totalAdult + totalSenior + totalChild);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const scheduleWeek = {};
  Object.keys(hours).forEach(function (hour) {
    if (hours[hour].open === hours[hour].close) {
      scheduleWeek[hour] = 'CLOSED';
    } else {
      scheduleWeek[hour] = `Open from ${hours[hour].open}am until ${hours[hour].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: scheduleWeek[dayName] };
  }
  return scheduleWeek;
}

function oldestFromFirstSpecies(id) {
  const employeeID = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const getResidents = data.animals.find(animal => animal.id === employeeID).residents;
  const sortingAnimals = getResidents.sort((ageA, ageB) => ageB.age - ageA.age)[0];
  return Object.values(sortingAnimals);
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  data.prices.Adult = Math.round((Adult + ((Adult * percentage) / 100)) * 100) / 100;
  data.prices.Senior = Math.round((Senior + ((Senior * percentage) / 100)) * 100) / 100;
  data.prices.Child = Math.round((Child + ((Child * percentage) / 100)) * 100) / 100;
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
