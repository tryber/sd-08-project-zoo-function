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

const animalsByIds = (...rest) => animals.filter(({ id }) => rest.some(idKey => idKey === id));

const animalsOlderThan = (animal, key) =>
  animals.some(({ residents, name }) => residents.every(({ age }) => name === animal && age > key));

const employeeByName = employeeName =>
  employees.find(
    ({ firstName, lastName }) => firstName === employeeName || lastName === employeeName) || {};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = id =>
  employees.some(({ managers, id: idKey }) => managers.length === 1 && idKey === id);

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) =>
  employees.push({ id, firstName, lastName, managers, responsibleFor });

const animalCount = (species) => {
  if (species) return animals.find(animal => animal.name === species).residents.length;
  return animals.reduce(
    (accAnimal, currAnimal) =>
    Object.assign(accAnimal, { [currAnimal.name]: currAnimal.residents.length }),
    {});
};

const entryCalculator = (entrants = 0) => {
  let countAnimals = 0;
  Object.keys(entrants).forEach(key => (countAnimals += prices[key] * entrants[key]));
  return countAnimals;
};

function animalMap(options) {
  // seu código aqui
}

const schedule = (dayName) => {
  let week = {};
  Object.keys(hours).forEach((day) => {
    const weekDay = !dayName ? day : dayName;
    if (hours[weekDay].open === 0) {
      week = { ...week, [weekDay]: 'CLOSED' };
    } else {
      week = {
        ...week,
        [weekDay]: `Open from ${hours[weekDay].open}am until ${hours[weekDay].close - 12}pm`,
      };
    }
  });
  return week;
};

const oldestFromFirstSpecies = (id) => {
  const animalId = employees.find(({ id: idKey }) => idKey === id).responsibleFor;
  const { residents } = animals.find(({ id: idKey }) => idKey === animalId[0]);
  const firstAnimal = residents.reduce((accAnimal, currAnimal) => {
    if (accAnimal.age > currAnimal.age) return accAnimal;
    return currAnimal;
  });
  return Object.values(firstAnimal);
};

const increasePrices = (percentage) => {
  const discount = ((percentage / 100) + 1);
  prices.Adult = Math.round(prices.Adult * 100 * discount) / 100;
  prices.Child = Math.round(prices.Child * 100 * discount) / 100;
  prices.Senior = Math.round(prices.Senior * 100 * discount) / 100;
  return prices;
};

function coverage(idOrName) {
  const animalManager = employees.find(({ id, firstName, lastName }) =>
  id === idOrName
  || firstName === idOrName
  || lastName === idOrName);

  const residents = animalManager
  .responsibleFor.map(animalsMannered => animals
    .find(({ id }) => animalsMannered === id));

  return {
    [`${animalManager.firstName} ${animalManager.lastName}`]: residents.map(animalsMannered => animalsMannered.name) };
}

const employeeCoverage = (idOrName) => {
  if (idOrName) {
    return coverage(idOrName);
  }

  let employeesCoverage = {};
  const employeesId = employees.map(({ id }) => id);
  employeesId.forEach((id) => {
    employeesCoverage = { ...employeesCoverage, ...coverage(id) };
  });
  return employeesCoverage;
};

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
