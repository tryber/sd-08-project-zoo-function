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

function animalsByIds(...ids) {
  if (!ids || ids.length === 0) return [];
  return animals.filter(animal => ids.includes(animal.id));
}
function animalsOlderThan(animal, age) {
  return animals
    .find(animalss => animalss.name === animal)
    .residents.every(resident => resident.age > age);
}
function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(
    e => e.firstName === employeeName || e.lastName === employeeName);
}
function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}
function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}
function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    const obj = {};
    animals.forEach((e, index) => {
      obj[e.name] = e.residents.length;
    });
    return obj;
  }
  return animals.filter(e => species === e.name)[0].residents.length;
}
function entryCalculator(entrants) {
  if (!entrants) return 0;
  return Object.keys(entrants).reduce(
    (accumulator, currentValue) =>
      accumulator + (entrants[currentValue] * prices[currentValue]), 0);
}
function getResidents(animalName, sorted = false, sex) {
  let { residents } = animals.find(animal => animal.name === animalName);
  if (sex) residents = residents.filter(resident => resident.sex === sex);
  const names = residents.map(resident => resident.name);
  if (sorted) names.sort();
  return { [animalName]: names };
}
function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex } = options;
  const result = animals.reduce((previousValue, currentValue) => {
    const { location, name } = currentValue;
    if (!previousValue[location]) previousValue[location] = [];
    previousValue[location].push(name);
    return previousValue;
  }, {});
  if (includeNames) {
    return Object.entries(result).reduce((previousValue, [keys, value]) => {
      previousValue[keys] = value.map(name => getResidents(name, sorted, sex));
      return previousValue;
    }, {});
  }
  return result;
}
function rewriteHours() {
  const arr = Object.keys(hours);
  const result = {};
  arr.forEach((element) => {
    if (element !== 'Monday') {
      result[element] = `Open from ${hours[element].open}am until ${hours[element].close - 12}pm`;
    } else {
      result[element] = 'CLOSED';
    }
  });
  return result;
}
function schedule(dayName) {
  if (!dayName) return rewriteHours();
  return { [dayName]: rewriteHours()[dayName] };
}
function oldestFromFirstSpecies(id) {
  const employee = employees.find(animal => animal.id === id).responsibleFor[0];
  const managedAnimal = animals.find(animal => animal.id === employee).residents;
  const getAge = managedAnimal.reduce((acc, cur) => (acc.age > cur.age ? acc : cur));
  return Object.values(getAge);
}

function increasePrices(percentage) {
  Object.keys(prices)
    .forEach((level) => {
      prices[level] = Math.ceil(prices[level] * (percentage + 100)) / 100;
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
