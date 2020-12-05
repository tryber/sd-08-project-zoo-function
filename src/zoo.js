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
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animalName, age) {
  return animals
    .find(animal => animal.name === animalName)
    .residents.every(animal => animal.age > age);
}

function employeeByName(employeeName) {
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName)
    || {};
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return (employees
    .filter(employee => employee.managers.includes(id))
    .length > 0);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  let numberAnimals = {};
  if (!species) {
    animals.forEach((animal) => {
      numberAnimals[animal.name] = animal.residents.length;
    });
  } else {
    const animalResidents = animals.find(animal => animal.name === species).residents;
    numberAnimals = animalResidents.length;
  }
  return numberAnimals;
}

function entryCalculator(entrants) {
  let total = 0;
  if (entrants) {
    Object.keys(entrants)
      .forEach((currentEntrant) => {
        total += prices[currentEntrant] * entrants[currentEntrant];
      });
  }
  return total;
}
function mapWithOutIncludeNames() {
  const output = animals.reduce((objMapAnimals, { name, location }) => {
    if (objMapAnimals[location] === undefined) objMapAnimals[location] = [];
    objMapAnimals[location].push(name);
    return objMapAnimals;
  }, {});
  return output;
}

function sortAnimalsResidentsCallback(a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
}
function goSortNameIfSorted(sorted, residents) {
  const sortingResidents = residents.slice();
  if (sorted === undefined) return residents;
  const output = sortingResidents.sort(sortAnimalsResidentsCallback);
  return output;
}
function filterSexAnimalResidents(sex, residents) {
  let output = residents;
  if (sex) output = residents.filter(resident => resident.sex === sex);
  return output;
}
function goFilterSexIfFiltered(sex, name, residents) {
  const output = {};
  output[name] = filterSexAnimalResidents(sex, residents)
    .map(resident => resident.name);
  return output;
}
function mapWithIncludeNames({ sorted, sex }) {
  const output = animals.reduce((objMapAnimals, { location, residents, name }) => {
    if (objMapAnimals[location] === undefined) objMapAnimals[location] = [];
    const animalsNameIfSorted = goSortNameIfSorted(sorted, residents);
    const animalsNameIfFiltered = goFilterSexIfFiltered(sex, name, animalsNameIfSorted);
    const animalsNameByLocationFinal = animalsNameIfFiltered;
    objMapAnimals[location].push(animalsNameByLocationFinal);
    return objMapAnimals;
  }, {});
  return output;
}

function animalMap(options = { includeNames: false, sorted: false, sex: '' }) {
  const { includeNames, ...okInclude } = options;
  if (includeNames) return mapWithIncludeNames(okInclude);
  return mapWithOutIncludeNames();
}

function evaluateSchedule(dayName) {
  const output = {};
  const { open, close } = hours[dayName];
  if (!open && !close) output[dayName] = 'CLOSED';
  else {
    const closeToPm = close % 12;
    output[dayName] = `Open from ${open}am until ${closeToPm}pm`;
  }
  return output;
}

function schedule(dayName) {
  let output = 0;
  if (!dayName) {
    output = Object.keys(hours).reduce((objSchedule, day) => {
      objSchedule = { ...objSchedule, ...evaluateSchedule(day) };
      return objSchedule;
    }, {});
  } else output = evaluateSchedule(dayName);
  return output;
}

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
