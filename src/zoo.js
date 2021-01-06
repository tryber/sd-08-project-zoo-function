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
  if (ids.length < 1) {
    return [];
  }
  const animById = [];
  ids.forEach((elem1, index) => {
    animById[index] = data.animals.find(elem => elem1 === elem.id);
  });
  return animById;
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(elem => elem.name === animal)
  .every((elem1, index) => elem1.residents[index].age > age);
}

function employeeByName(employeeName) {
  if (employeeName == null) {
    return {};
  }
  return data.employees.find(elem =>
  (elem.firstName === employeeName || elem.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some((elem, index) => id === elem.managers[index]);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((obj, animal) => {
      obj[animal.name] = animal.residents.length;
      return obj;
    }, {});
  }
  return (data.animals.find(animal => animal.name === species).residents.length);
}

function entryCalculator(entrants) {
  if ((entrants == null) || (entrants === {})) {
    return (0);
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return ((Adult * 49.99) + (Child * 20.99) + (Senior * 24.99));
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const day = Object.keys(data.hours);
  const result = day.reduce((schedule1, day1) => {
    if (day1 === 'Monday') {
      schedule1[day1] = 'CLOSED';
      return (schedule1);
    }
    console.log(schedule1);
    schedule1[day1] = `Open from ${data.hours[day1].open}am until ${data.hours[day1].close - 12}pm`;
    return (schedule1);
  }, {});
  if (dayName) return { [dayName]: result[dayName] };
  return result;
}

function getFirstIdResponsibleFor(id) {
    const employee = data.employees.find(elem => elem.id === id);
    return employee.responsibleFor[0];
}

function getAnimals(id) {
    const animals = data.animals.find(elem => elem.id === getFirstIdResponsibleFor(id));
    return animals;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const employee = data.employees.find(elem => elem.id === id);
  const animals = data.animals.find(elem => elem.id === employee.responsibleFor[0]);
  const older = animals.residents.sort((a1, a2) => a2.age - a1.age)[0];
  const { name, sex, age } = older;
  return [name, sex, age];
}
console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
