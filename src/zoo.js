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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(dataAnimal => dataAnimal.name === animal).residents
    .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  return employeeName ? data.employees.find(employee => (employee.firstName === employeeName)
    || (employee.lastName === employeeName)) : {};
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return !!(data.employees.find(employee => employee.managers.includes(id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  return species ? data.animals.find(animal => animal.name === species).residents.length :
    data.animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
}

function entryCalculator(entrants = {}) {
  return Object.entries(entrants).reduce((acc, [person, amount]) => {
    acc += data.prices[person] * amount;
    return acc;
  }, 0);
}

function getEspeciesIncludeNames(animal, sex, sorted) {
  const residentsBySex = sex ? animal.residents.filter(resident => resident.sex === sex)
    .map(resident => resident.name) : animal.residents.map(resident => resident.name);
  const residentsSorted = sorted ? residentsBySex.sort() : residentsBySex;
  return { [animal.name]: residentsSorted };
}

function animalMap(options = {}) {
  const { includeNames, sex, sorted } = options;
  return data.animals.reduce((acc, animal) => {
    if (acc[animal.location]) {
      acc[animal.location].push(includeNames ?
        getEspeciesIncludeNames(animal, sex, sorted) : animal.name);
    } else {
      acc[animal.location] = [includeNames ?
        getEspeciesIncludeNames(animal, sex, sorted) : animal.name];
    }
    return acc;
  }, {});
}

function formatSchedule(scheduleData) {
  return (scheduleData.open === 0 && scheduleData.close === 0) ? 'CLOSED'
    : `Open from ${scheduleData.open}am until ${scheduleData.close > 12 ?
      scheduleData.close - 12 : scheduleData.close}pm`;
}

function schedule(dayName) {
  return dayName ? { [dayName]: formatSchedule(data.hours[dayName]) }
    : Object.entries(data.hours).reduce((acc, [day, scheduleData]) => {
      acc[day] = formatSchedule(scheduleData);
      return acc;
    }, {});
}

function oldestFromFirstSpecies(id) {
  const especieId = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const especie = data.animals.find(animal => animal.id === especieId);
  const olderAnimalAge = Math.max(...especie.residents.map(resident => resident.age));
  return Object.values(especie.residents.find(resident => resident.age === olderAnimalAge));
}

function increasePrices(percentage) {
  Object.keys(data.prices)
    .forEach((ageGroup) => {
      data.prices[ageGroup] = Math.ceil(data.prices[ageGroup] * (percentage + 100)) / 100;
    });
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
