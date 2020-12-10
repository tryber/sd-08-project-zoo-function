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

function confirmHour(day) {
  const object = {};
  let { open, close } = data.hours[day];

  open = open < 12 ? `${open}am` : `${open - 12}pm`;
  close = close < 12 ? `${close}am` : `${close - 12}pm`;

  object[day] = (open === close) ? 'CLOSED' : `Open from ${open} until ${close}`;

  return object;
}

function schedule(dayName) {
  const arrayOfTime = Object.keys(data.hours).map(confirmHour);

  return dayName ? arrayOfTime.find(day => day[dayName]) :
  arrayOfTime.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

function arrumandoCodeclimate(acc, curr) {
  return acc.age > curr.age ? acc : curr;
}

function oldestFromFirstSpecies(id) {
  const responsible = data.employees.find(employe => employe.id === id).responsibleFor[0];
  const animals = data.animals.find(animal => animal.id === responsible);

  const { name, sex, age } = animals.residents.reduce(arrumandoCodeclimate);

  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;

  data.prices = {
    Adult: Adult + (Adult * (percentage / 100)),
    Senior: Senior + (Senior * (percentage / 100)),
    Child: Child + (Child * (percentage / 100)),
  };
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
