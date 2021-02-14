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
  if (ids === undefined) return [];
  return animals.filter(({ id }) => ids.includes(id));
}
function animalsOlderThan(animal, ageAnimal) {
  return animals.find(({ name }) => name === animal)
  .residents
  .every(({ age }) => age >= ageAnimal);
}
function employeeByName(employeeName) {
  return employees.find(({ firstName, lastName }) =>
  firstName === employeeName || lastName === employeeName)
  || {};
}
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}
function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
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
  const result = animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
  if (species === undefined) return result;
  return result[species];
}
function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  return Object.keys(entrants).reduce((acc, cur) => acc + (entrants[cur] * prices[cur]), 0);
}
function getResidentsByName(animalName) {
  return animals.find(({ name }) => name === animalName);
}
function getAnimalResidentsName(animalName, sort, sex) {
  let residents = getResidentsByName(animalName).residents || [];
  if (sex) residents = residents.filter(resident => resident.sex === sex);
  const names = residents.map(resident => resident.name);
  if (sort) names.sort();
  return { [animalName]: names };
}
function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex } = options;
  let result = animals.reduce((acc, animal) => {
    if (!acc[animal.location]) acc[animal.location] = [];
    acc[animal.location].push(animal.name);
    return acc;
  }, {});
  if (includeNames) {
    result = Object.entries(result).reduce((acc, [key, animalNames]) => {
      acc[key] = animalNames.map(animal => getAnimalResidentsName(animal, sorted, sex));
      return acc;
    }, {});
  }
  return result;
}
function schedule(dayName) {
  const result = Object.entries(hours).reduce((acc, [key, hour]) => {
    const { open, close } = hour;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (dayName !== undefined) return { [dayName]: result[dayName] };
  return result;
}
function employeeById(id) {
  return employees.find(employee => employee.id === id);
}
function oldestFromFirstSpecies(id) {
  const employee = employeeById(id);
  const firstSpecies = animalsByIds(employee.responsibleFor[0]);
  const residents = firstSpecies[0].residents;
  const older = residents.reduce((acc, cur) => acc.age > cur.age ? acc : cur);
  return Object.values(older);
}
function increasePrices(percentage) {
  Object.entries(prices).forEach(([category, price]) => {
    const newPrice = price * ((1 + percentage) / 100);
    prices[category] = Math.round(newPrice * 100) / 100;
  });
}
function getEmployeeFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
function employeeCoverage(idOrName) {
  const result = employees.reduce((acc, employee) => {
    acc[getEmployeeFullName(employee)] = (employee.responsibleFor
      || []).map(animalId => animalsByIds(animalId)[0].name);
    return acc;
  }, {});
  if (idOrName !== undefined) {
    const employee = employeeById(idOrName) || employeeByName(idOrName);
    const employeeName = getEmployeeFullName(employee);
    return { [employeeName]: result[employeeName] };
  }
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
