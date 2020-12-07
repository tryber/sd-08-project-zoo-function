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
const data = require('./data');

const animalsByIds = (...ids) => animals.filter(animal => ids.includes(animal.id));

const animalsOlderThan = (animal, age) => animals.find(specie => specie.name === animal)
  .residents.every((specie => specie.age >= age));


const employeeByName = employeeName => employees.find(employee =>
  employee.firstName === employeeName || employee.lastName === employeeName) || {};


const createEmployee = (personalInfo, associatedWith) => Object
  .assign(personalInfo, associatedWith);


const isManager = id => employees.some(employee => employee.managers.includes(id));


const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  employees.push(createEmployee(personalInfo, associatedWith));
};

const animalCount = (species) => {
  const specie = animals.reduce((acc, currentValue) => {
    acc[currentValue.name] = currentValue.residents.length;
    return acc;
  }, {});
  if (species === undefined) {
    return specie;
  }
  return specie[species];
};
console.log(animalCount('lion'));

const entryCalculator = (entrants) => {
  if (typeof entrants === 'undefined') return 0;
  return Object.entries(entrants).reduce((acc, [key, value]) => (
    acc + (prices[key] * value)
  ), 0);
};

function animalMap(options) {
  // seu código aqui
}
function schedule(dayName) {
  const result = Object.entries(hours).reduce((acc, [key, value]) => {
    const { open, close } = value;
    acc[key] = close - open > 0 ? `Open from ${value.open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: result[dayName] };
  return result;
}


console.log(schedule());

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
