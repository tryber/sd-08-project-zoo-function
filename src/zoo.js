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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return ids.map(paramId => animals.find(species => species.id === paramId));
}

function animalsOlderThan(animal, age) {
  const species = animals.find(element => element.name === animal);
  return species.residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  const employee = employees.find(element => (
    element.firstName === employeeName
    || element.lastName === employeeName));
  return employee || {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return Boolean(employees.find(employee => employee.managers.includes(id)));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  employees.push(
    {
      id,
      firstName,
      lastName,
      managers: managers || [],
      responsibleFor: responsibleFor || [],
    },
  );
}

function animalCount(species) {
  if (species) {
    return animals.find(animal => animal.name === species).residents.length;
  }
  const countArray = animals.map(animal => ({ [animal.name]: animal.residents.length }));
  return countArray.reduce((accumulator, currentValue) => ({ ...accumulator, ...currentValue }));
}

function entryCalculator(entrants) {
  if (!entrants) { return 0; }
  return Object.entries(entrants).reduce(((acc, val) => acc + (val[1] * prices[val[0]])), 0);
}

function animalsByLocation() {
  const sortedAnimals = animals.sort((a, b) => a.location.localeCompare(b.location));
  const mappedAnimals = sortedAnimals.map(element => ({
    [element.location]: element.name,
  }));
  return mappedAnimals.reduce(((acc, obj) => {
    const key = Object.keys(obj)[0];
    if (key in acc) {
      acc[key].push(obj[key]);
    } else {
      acc[key] = [obj[key]];
    }
    return acc;
  }), {});
}

function animalMap(options) {
  const { includeNames = false, sort = false, sex } = options || {};

  if (includeNames && !sort && !sex) {
    return animalNames();
  }

  if (includeNames && sort && !sex) {
    return animalSortedNames();
  }

  if (includeNames && !sort && sex) {
    return animalGenderNames();
  }

  if (includeNames && sort && sex) {
    return animalGenderSortedNames();
  }

  return animalsByLocation();
}

console.log(animalMap());

function schedule(dayName) {
  // seu código aqui
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
