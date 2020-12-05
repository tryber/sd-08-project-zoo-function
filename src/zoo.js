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

const data = require('./data');

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(zooAnimal => zooAnimal.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.filter(employee => employee.managers.includes(id))
  .length > 0;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const entries = Object.keys(entrants);
  return entries.reduce((total, each) => total + (entrants[each] * prices[each]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const weekdays = Object.keys(hours);
  const result = weekdays.reduce((agenda, day) => {
    if (day === 'Monday') {
      agenda[day] = 'CLOSED';
      return agenda;
    }
    agenda[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    return agenda;
  }, {});
  if (dayName !== undefined) {
    const response = {};
    response[dayName] = result[dayName];
    return response;
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const firstResponsibleFor = employees.find(employee => employee.id === id)
    .responsibleFor[0];
  const caredAnimals = animals.find(
    animal => animal.id === firstResponsibleFor
  ).residents;
  const oldest = caredAnimals.sort(
    (animal1, animal2) => animal2.age - animal1.age
  )[0];
  const { name, sex, age } = oldest;
  return [name, sex, age];
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
