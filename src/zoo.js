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
  return ids ? ids.map(id => data.animals.find(animal => id === animal.id)) : [];
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find(animalName => animal === animalName.name);
  const animalsAge = animals.residents.every(resident => resident.age >= age);
  return animalsAge;
}

function employeeByName(employeeName) {
  return employeeName ? data.employees.find(
    name => name.firstName === employeeName || name.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  return species ? data.animals.find(animal => species === animal.name).residents.length :
  data.animals.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants) {
  return entrants ?
  Object.keys(entrants).reduce(
    (acc, curr) => acc + (data.prices[curr] * entrants[curr]), 0) :
  0;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  let confirmHour = (dayName) => {
    let object = {}
    let { open, close } = data.hours[dayName];

    if(open < 12) {
      open = `${open}am`;
    }else{
      open = `${open - 12}pm`;
    }

    if(close < 12) {
      close = `${close}am`;
    }else{
      close = `${close - 12}pm`;
    }

    //utilizando if ternario
    object[dayName] = (open === close) ? 'CLOSED' : `Open from ${open} until ${close}`;

    return object;
  }

  const arrayOfTime = Object.keys(data.hours).map(confirmHour);

  return dayName ? arrayOfTime.find(day => day[dayName]) :
  arrayOfTime.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
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
