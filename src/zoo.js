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

const { employees, animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal)
  .residents.every(age1 => age1.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(
    employee => employee.firstName === employeeName || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(
    occupation => occupation.managers.find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species !== undefined) {
    return animals.find(specific => specific.name === species).residents.length;
  }
  const noParam = {};
  animals.forEach((all) => { noParam[all.name] = all.residents.length; });
  return noParam;
}

function entryCalculator(entrants) {
  return entrants && Object.keys(entrants).length > 0
  ? Object.keys(entrants)
    .reduce((acc, quantity) => (acc + (data.prices[quantity] * entrants[quantity])), 0)
  : 0;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const allDays = Object.keys(data.hours);
  const workDay = {};

  allDays.forEach((day) => {
    if (day === 'Monday') {
      workDay[day] = 'CLOSED';
    } else {
      const openHours = data.hours[day].open;
      const closeHours = data.hours[day].close - 12;
      workDay[day] = `Open from ${openHours}am until ${closeHours}pm`;
    }
  });
  if (dayName === undefined) return workDay;
  return { [dayName]: workDay[dayName] };
}

function oldestFromFirstSpecies(id) {
  return Object.values(data.animals.find(el => el.id === data.employees
      .find(animal => animal.id === id).responsibleFor[0]).residents
      .sort((first, second) => second.age - first.age)[0]);
}

function increasePrices(percentage) {
  const arrayPrices = Object.keys(data.prices);
  const obj = {};
  arrayPrices.map((element) => {
    (obj[element] = Math.round((((data.prices[element] * percentage) / 100) +
    data.prices[element]) * 100) / 100);
    return obj;
  });
  return (data.prices = obj);
}

function employeeCoverage(idOrName) {
  const result = {};
  let filteredEmployees;
  if (!idOrName) {
    filteredEmployees = data.employees;
  } else {
    filteredEmployees = data.employees.filter(
      employee => employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName,
    );
  }
  filteredEmployees.forEach((employee) => {
    const mappedAnimals = employee.responsibleFor.map(
      (animalIdResponsibleFor) => {
        const foundAnimalName = data.animals.find(
          animal => animal.id === animalIdResponsibleFor).name;
        return foundAnimalName;
      });
    result[`${employee.firstName} ${employee.lastName}`] = mappedAnimals;
  });
  return result;
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
