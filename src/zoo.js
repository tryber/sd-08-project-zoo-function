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

function animalsByIds(...ids) {
  if (typeof ids[0] !== 'string') { return []; }
  return data.animals.filter(animal => animal.id === ids[0] || animal.id === ids[1]);
}

function animalsOlderThan(animal, age) {
  const animalSpecies = data.animals.find(animalSpecie => animalSpecie.name === animal);
  return animalSpecies.residents.every(animalResidents => animalResidents.age >= age);
}

function employeeByName(employeeName) {
  if (typeof employeeName !== 'string') {
    return {};
  }
  return data.employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employee =>
  employee.managers[0] === id || employee.managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (!species) {
    const animalSelector = {};
    data.animals.map(animal => (
      animalSelector[animal.name] = animal.residents.length
    ));
    return animalSelector;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (Adult * 49.99) + (Senior * 24.99) + (Child * 20.99);
}

function animalMap(options) {
  // const zoneFilter = zone => data.animals.filter(animal => animal.location === zone);
  // const mapAnimals = animalZone => animalZone.map(animal => animal.name);
  // const animalList = {
  //   NE: mapAnimals(zoneFilter('NE')),
  //   NW: mapAnimals(zoneFilter('NW')),
  //   SE: mapAnimals(zoneFilter('SE')),
  //   SW: mapAnimals(zoneFilter('SW')),
  // };
  // const lion = ['zoe', 'clo'];
  // if (options.includeNames === true) {
  //   // como inserir objeto dentro de objeto
  //   animalList.NE[0] = lion;
  //   return animalList;
  // }
  // return animalList
}
// console.log(animalMap({ includeNames: true }))

function schedule(dayName) {
  // const scheduleList = {
  //   'Tuesday': `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
  //   'Wednesday': `Open from ${data.hours.Wednesday.open}am
  // until ${data.hours.Wednesday.close - 12}pm`,
  //   'Thursday': `Open from ${data.hours.Thursday.open}am
  // until ${data.hours.Thursday.close - 12}pm`,
  //   'Friday': `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
  //   'Saturday': `Open from ${data.hours.Saturday.open}am
  // until ${data.hours.Saturday.close - 12}pm`,
  //   'Sunday': `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
  //   'Monday': 'CLOSED'
  // };
  // if (typeof dayName === 'string') {
  //   return `${dayName}: ${scheduleList[dayName]}`
  // }
  // return scheduleList;
}
// console.log(schedule('Tuesday'))

function oldestFromFirstSpecies(id) {
  const firstAnimalId = data.employees.find(ids => ids.id === id).responsibleFor[0];
  const residents = data.animals.find(animal => animal.id === firstAnimalId).residents;
  const oldestAnimal = residents.sort((a, b) => b.age - a.age)[0];
  return Object.values(oldestAnimal);
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
