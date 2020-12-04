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
  return ids ? ids.map((id) => data.animals.find((animal) => id === animal.id)) : [];
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find((anim) => anim.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  return employeeName ? data.employees
    .find(
      (employee) => employee.firstName === employeeName || employee.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  return {...personalInfo, ...associatedWith};
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
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
  return species ? 
    data.animals.find((animal) => species === animal.name).residents.length :
    data.animals.reduce(
      (acc, curr) => {
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
  const timeArray = Object.keys(data.hours).map((day) => {
    const obj = {};
    let { open, close } = data.hours[day];

    open = open > 12 ? `${open - 12}pm` : `${open}am`;
    close = close > 12 ? `${close - 12}pm` : `${close}am`;

    obj[day] = (open === close) ? 'CLOSED' : `Open from ${open} until ${close}`;

    return obj;
  });

  return dayName ?
    timeArray.find((day) => day[dayName]) :
    timeArray.reduce((acc, curr) => {
      return {...acc, ...curr}
    }, {});
}

function oldestFromFirstSpecies(id) {
  const speciesId = data.employees.find((employee) => employee.id === id).responsibleFor[0];

  const animalsFromSpecies = data.animals.find((animal) => animal.id === speciesId);

  const { name, sex, age } = animalsFromSpecies.residents.reduce(
    (acc, curr) => (acc.age > curr.age) ? acc : curr
  );

  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = data.prices;

  data.prices = {
    'Adult': (Math.ceil(((1 + (percentage/100)) * Adult)*100))/100,
    'Child': (Math.ceil(((1 + (percentage/100)) * Child)*100))/100,
    'Senior': (Math.ceil(((1 + (percentage/100)) * Senior)*100))/100,
  }
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
