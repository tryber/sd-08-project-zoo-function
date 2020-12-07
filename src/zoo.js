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

const {
  animals, employees, prices, hours,
} = data;

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(elemt => elemt.name === animal)
    .residents.every(elemt => elemt.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(
    elemt => elemt.firstName === employeeName || elemt.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(elemt => elemt.managers.some(e => e === id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  employees.push(createEmployee(personalInfo, associatedWith));
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  let sum = 0;
  Object.entries(entrants).forEach(item => {
    sum += item[1] * prices[item[0]];
  });
  return sum;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  if (!dayName) {
    return Object.entries(hours).reduce((acc, [key, value]) => {
      acc[key] = value.open > 0
        ? `Open from ${value.open}am until ${value.close - 12}pm`
        : 'CLOSED';
      return acc;
    }, {})
  }
  if (dayName === 'Monday') return { [dayName]: 'CLOSED' };
  return {
    [dayName]: `Open from ${hours[dayName].open}am until ${
      hours[dayName].close - 12
    }pm`,
  };
}

function oldestFromFirstSpecies(id) {
  const employeeResponsable = employees.find(employee => employee.id === id)
    .responsibleFor[0];
  const animalsResidents = animals.find(
    animal => animal.id === employeeResponsable,
  ).residents;
  const oldAnimals = animalsResidents.sort((age1, age2) => age2.age - age1.age);
  return [oldAnimals[0].name, oldAnimals[0].sex, oldAnimals[0].age];
}

function increasePrices(percentage) {
  const increase = 1 + percentage / 100;
  Object.keys(prices).forEach(key => {
    prices[key] = Math.round(prices[key] * increase * 100) / 100;
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
