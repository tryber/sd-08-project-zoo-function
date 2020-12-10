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

const { animals } = data;
const { employees } = data;
let { prices } = data;
const { hours } = data;

function animalsByIds(...ids) {
  return animals.filter(animalInfo => ids.includes(animalInfo.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(animalInfo => animalInfo.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  return (
    employees.find(
      employeeInfo =>
        employeeInfo.firstName === employeeName ||
        employeeInfo.lastName === employeeName) || {}
  );
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(employeeInfo => employeeInfo.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []) {
  employees.push(
    createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));
}

function animalCount(species) {
  const speciesCount = animals.find(
    animalInfo => animalInfo.name === species);

  const animalListCount = animals.reduce((accumulator, animalInfo) => {
    accumulator[animalInfo.name] = animalInfo.residents.length;
    return accumulator;
  }, {});

  return species === undefined
    ? animalListCount
    : speciesCount.residents.length;
}

function entryCalculator(entrants = 0) {
  let entrySum = 0;
  Object.entries(entrants).forEach((entry) => {
    if (entry[0] === 'Adult') {
      entrySum += prices.Adult * entry[1];
    } else if (entry[0] === 'Child') {
      entrySum += prices.Child * entry[1];
    } else {
      entrySum += prices.Senior * entry[1];
    }
  });
  return entrySum;
}

function filterBySex(allAnimals, sex) {
  return allAnimals.residents
  .filter(residents => residents.sex === sex)
  .map(species => species.name);
}

function getSpecies(key, sex, bool) {
  return animals
  .filter(animalInfo => animalInfo.location === key)
  .map((animal) => {
    const speciesName =
    sex !== undefined ? filterBySex(animal, sex) :
    animal.residents.map(resident => resident.name);
    return { [animal.name]: bool ? speciesName.sort() : speciesName };
  });
}

function animalsByLocation(boolN, sex, boolS) {
  const animalsLocation = { NE: [], NW: [], SE: [], SW: [] };
  Object.keys(animalsLocation).forEach((key) => {
    animalsLocation[key] = boolN ? getSpecies(key, sex, boolS) :
    animals.filter(animalInfo => animalInfo.location === key)
    .map(animal => animal.name);
  });
  return animalsLocation;
}

function animalMap(options) {
  if (options === undefined) return animalsByLocation(false);

  const namesOption = Object.keys(options)
  .some(key => key === 'includeNames' && options[key] === true);

  const filterSex = Object.values(options)
  .find(value => value === 'female' || value === 'male');

  const sortOption = Object.keys(options)
  .some(key => key === 'sorted' && options[key] === true);

  return animalsByLocation(namesOption, filterSex, sortOption);
}

function schedule(dayName) {
  const weekSchedule = Object.entries(hours).reduce((accumulator, day) => {
    accumulator[day[0]] =
      day[0] !== 'Monday'
        ? `Open from ${Object.values(day[1])[0]}am until ${
            Object.values(day[1])[1] - 12
          }pm`
        : 'CLOSED';
    return accumulator;
  }, {});
  if (dayName !== undefined) {
    const daySchedule = Object.entries(weekSchedule).find(week => week[0] === dayName);
    return { [daySchedule[0]]: daySchedule[1] };
  }
  return weekSchedule;
}

function oldestFromFirstSpecies(id) {
  const firstId = employees.find(employeeInfo => employeeInfo.id === id)
    .responsibleFor[0];
  const residentsById = animalsByIds(firstId)[0].residents;

  let oldestAge = null;
  residentsById.forEach((resident) => {
    if (oldestAge < resident.age) oldestAge = resident.age;
  });

  const oldestFromSpecies = residentsById.find(
    resident => resident.age === oldestAge);
  return Object.values(oldestFromSpecies);
}

function increasePrices(percentage) {
  prices = Object.entries(prices).reduce((accumulator, priceInfo) => {
    accumulator[priceInfo[0]] =
    Math.ceil((priceInfo[1] + (priceInfo[1] * (percentage / 100))) * 100) / 100;
    data.prices = accumulator;
    return accumulator;
  }, {});
  return prices;
}

function animalsByIdsName(...ids) {
  const animalName = ids.map(id => animalsByIds(id)[0].name);
  return animalName;
}

function employeeCoverage(idOrName) {
  const allEmployeesResponsibility = employees.reduce((accumulator, employeeInfo) => {
    accumulator[`${employeeInfo.firstName} ${employeeInfo.lastName}`] =
    animalsByIdsName(...employeeInfo.responsibleFor);
    return accumulator;
  }, {});
  if (idOrName === undefined) return allEmployeesResponsibility;
  const employeeResponsibility = employees.find(employeeInfo =>
    idOrName === employeeInfo.firstName || idOrName === employeeInfo.lastName
    || idOrName === employeeInfo.id);
  return { [`${employeeResponsibility.firstName} ${employeeResponsibility.lastName}`]: animalsByIdsName(...employeeResponsibility.responsibleFor) };
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
