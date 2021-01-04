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


const { animals, prices, employees, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(animalsID => animalsID.name === animal)
    .residents.every(residents => residents.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  return !employeeName ? {} : data.employees
    .find(employer => employer.firstName === employeeName || employer.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(managerss => managerss.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    const animaList = {};
    animals.forEach((allAnimals) => {
      animaList[allAnimals.name] = allAnimals.residents.length;
    });
    return animaList;
  }
  return animals.find(animal => species === animal.name).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants) {
    return 0;
  }
  return Object.keys(entrants).reduce((acumulador, valorAtual) => (
    acumulador + (entrants[valorAtual] * prices[valorAtual])), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const dayTimes = {};
  Object.keys(hours).forEach((day) => {
    if (day === 'Monday') {
      dayTimes[day] = 'CLOSED';
    } else {
      dayTimes[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });
  if (!dayName) return dayTimes;
  const result = dayTimes[dayName];
  return { [dayName]: result };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const animalID = employees.find(empl => empl.id === id).responsibleFor[0];
  const animalName = animals.find((animalResponsible =>
    animalResponsible.id === animalID)).residents;
  const oldestResident = animalName.reduce((firstAnimal, currentAnimal) =>
    (firstAnimal.age > currentAnimal.age ? firstAnimal : currentAnimal));
  return Object.values(oldestResident);
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(prices).forEach((valueOfPrices) => {
    prices[valueOfPrices] = Math.ceil(prices[valueOfPrices] * (percentage + 100)) / 100;
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
