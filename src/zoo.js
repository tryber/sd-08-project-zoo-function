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

const { employees } = require('./data');
const { animals } = require('./data');
const { prices } = require('./data');
// const { hours } = require('./data');

const animalsByIds = (...ids) => (animals.filter(animal => ids.find(id => (animal.id === id))));

const animalsOlderThan = (animal, ages) => {
  const animalName = animals.find(({ name }) => (name === animal));
  return animalName.residents.every(({ age }) => age >= ages);
};

const employeeByName = (employeeName) => {
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) => (firstName === employeeName
    || lastName === employeeName));
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = id => employees.some(({ managers }) =>
managers.find(identifier => identifier === id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const insertEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(insertEmployee);
};

const animalCount = (species) => {
  const sum = animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
  return (!species) ? sum : sum[species];
};

const entryCalculator = (entrants) => {
  if (!entrants) return 0;
  const visits = Object.entries(entrants);
  return visits.reduce((sum, [type, value]) => sum + (prices[type] * value), 0);
};

const animalMap = (options) => {
  // seu código aqui
};

const schedule = () => {

};

const oldestFromFirstSpecies = (identifier) => {
  const employee = employees.find(({ id }) => id === identifier).responsibleFor[0];
  const animal = animals.find(({ id }) => id === employee).residents;
  const oldestOfTheSpecies = animal.reduce((old, { age }) => (old > age ? old : age));
  return Object.values(animal.find(({ age }) => age === oldestOfTheSpecies));
};

const increasePrices = (percentage) => {
  const price = Object.entries(prices);
  price.forEach(([type, value]) => {
    const perc = (percentage / 100) + 1;
    prices[type] = Math.round(value * perc * 100) / 100;
  });
};

const getEmployee = employee => employees.find(({ id, firstName, lastName }) =>
(id === employee || firstName === employee || lastName === employee));

const responsibleForTheAnimal = () => employees.reduce(
  (acc, { firstName, lastName, responsibleFor }) => {
    acc[`${firstName} ${lastName}`] = responsibleFor.map(animal => animals.find(({ id }) => id === animal).name);
    return acc;
  }, {});

const employeeCoverage = (idOrName) => {
  const responsible = responsibleForTheAnimal();
  if (!idOrName) return responsible;
  const employee = getEmployee(idOrName);
  const { firstName, lastName } = employee;
  const name = `${firstName} ${lastName}`;
  return { [name]: responsible[name] };
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
