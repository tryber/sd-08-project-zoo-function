/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(element => ids.includes(element.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(element => element.name === animal)
    .residents.every(elementTwo => elementTwo.age >= age);
}

function employeeByName(employeeName) {
  return (employees.find(e => e.firstName === employeeName || e.lastName === employeeName) || {});
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.some(element => element === id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(element => element.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  return Object.keys(entrants).reduce((acc, key) => acc + (entrants[key] * prices[key]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  if (!dayName) {
    return Object.entries(hours).reduce((acc, [key, value]) => {
      const { open, close } = value;
      acc[key] = close + open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
      return acc;
    }, {});
  } else if (dayName === 'Monday') {
    return { [dayName]: 'CLOSED' };
  }
  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close % 12}pm` };
}

function oldestFromFirstSpecies(id) {
  const responsibleFor = employees.find(element => element.id === id).responsibleFor[0];
  const animalsResidents = animals.find(element => element.id === responsibleFor).residents;
  return Object.values(animalsResidents.sort((a, b) => b.age - a.age)[0]);
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
