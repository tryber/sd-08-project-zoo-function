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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  if (!ids) return [];
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, inputAge) {
  return animals.find(theAnimal => theAnimal.name === animal)
  .residents.every(resident => resident.age >= inputAge);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees.filter(employee => employeeName)
  .find(employee => employeeName === employee.firstName || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee, index) => employee.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  return species ? animals.find(animal => animal.name === species)
  .residents.length : animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants = {}) {
  return Object.entries(entrants).reduce((accumulator, [person, amount]) => {
    accumulator += prices[person] * amount;
    return accumulator;
  }, 0);
}

function animalMap(options) {
  const locationObj = { NE: [], NW: [], SE: [], SW: [] };
  if (options === undefined || options === {} || !options.includeNames) {
    animals.forEach(({ name, location }) => {
      locationObj[location].push(name);
    });
    return locationObj;
  }
  animals.forEach(({ name, location, residents }) => {
    const animalsNames = {};
    animalsNames[name] = residents.reduce((accumulator, { name: residentName, sex }) => {
      const auxiliar = accumulator;
      if (!options.sex) auxiliar.push(residentName);
      else if (options.sex === sex) auxiliar.push(residentName);
      return auxiliar;
    }, []);
    if (options.sorted) animalsNames[name].sort();

    locationObj[location].push(animalsNames);
  });

  return locationObj;
};

function schedule(dayName) {
  const allDays = Object.keys(data.hours);
  const workDay = {};

  allDays.forEach((day) => {
    if (day === 'Monday') {
      workDay[day] = 'CLOSED';
    } else {
      const openHours = data.hours[day].open;
      const closeHours = data.hours[day].close - 12;
      workDay[day] = `Open from ${openHours}am until ${closeHours}pm`;
    }
  });
  if (dayName === undefined) return workDay;
  return { [dayName]: workDay[dayName] };
}

function oldestFromFirstSpecies(id) {
  const especieId = employees.find(employee => employee.id === id).responsibleFor[0];
  const especie = animals.find(animal => animal.id === especieId);
  const olderAnimalAge = Math.max(...especie.residents.map(resident => resident.age));
  return Object.values(especie.residents.find(resident => resident.age === olderAnimalAge));
}

function increasePrices(percentage) {
  const increase = percentage / 100;
  Object.entries(data.prices).forEach(([key, val]) => {
    const newPrice = val * (increase + 1);
    data.prices[key] = Math.round(newPrice * 100) / 100;
  });

}

function employeeCoverage(idOrName) {
 
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
