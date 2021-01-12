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
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  // iniciando
  if (!ids) {
    return [];
  }
  return animals.filter(animalsId => ids.includes(animalsId.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(getAnimal =>
    getAnimal.name === animal,
  ).residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    return {};
  }
  return employees.find(eName => (
    eName.firstName === employeeName || eName.lastName === employeeName
    ));
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  // seu código aqui
  return employees.some(ids => ids.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  return species ?
  animals.find(animalsAmount => species === animalsAmount.name).residents.length :
  animals.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants) {
  // seu código aqui
  // Olhei o código do colega Erick Massaki para entender como adicionar a multip. ao acc.
  return entrants ?
    Object.keys(entrants).reduce((acc, curr) => acc + (entrants[curr] * prices[curr]), 0) :
    0;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = hours;
  const daySchedule = {};
  const convertHours = hour => (hour > 12 ? hour - 12 : hour);
  const weekDaysSchedule = {
    Tuesday: `Open from ${Tuesday.open}am until ${convertHours(Tuesday.close)}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${convertHours(Wednesday.close)}pm`,
    Thursday: `Open from ${Thursday.open}am until ${convertHours(Thursday.close)}pm`,
    Friday: `Open from ${Friday.open}am until ${convertHours(Friday.close)}pm`,
    Saturday: `Open from ${Saturday.open}am until ${convertHours(Saturday.close)}pm`,
    Sunday: `Open from ${Sunday.open}am until ${convertHours(Sunday.close)}pm`,
    Monday: 'CLOSED',
  };
  daySchedule[dayName] = weekDaysSchedule[dayName];
  return !dayName ?
  weekDaysSchedule :
  daySchedule;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const firstAnimal = employees.find(employee => employee.id === id).responsibleFor[0];
  const chosenAnimal = animals.find(animal => animal.id === firstAnimal).residents;
  const oldest = chosenAnimal.reduce((oldestAnimal, currentAnimal) => {
    if (oldestAnimal.age > currentAnimal.age) {
      return oldestAnimal;
    }
    return currentAnimal;
  });
  return Object.values(oldest);
}

function increasePrices(percentage) {
  // seu código aqui
  const { Adult, Senior, Child } = data.prices;
  const pct = (percentage / 100) + 1;
  data.prices.Adult = parseFloat(((Adult * pct) + 0.001).toFixed(2));
  data.prices.Senior = parseFloat(((Senior * pct) + 0.001).toFixed(2));
  data.prices.Child = parseFloat(((Child * pct) + 0.001).toFixed(2));
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
