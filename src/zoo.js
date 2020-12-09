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
  const arr = [];
  ids.forEach((id, index) => {
    arr[index] = data.animals.find(animal => animal.id === id);
  });
  return arr;
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal).residents
  .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  const newObj = data.employees
    .find(employee => (employee.firstName === employeeName || employee.lastName === employeeName));
  if (newObj === undefined) return {};
  return newObj;
}

function createEmployee({ ...personalInfo }, { managers, responsibleFor }) {
  return {
    ...personalInfo,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees
  .some(employee => employee.managers
  .find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees = data.employees.concat({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const newObj = {};
  if (!species) {
    data.animals.map(({ name, residents }) => (newObj[name] = residents.length));
    return newObj;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator({ Adult = 0, Senior = 0, Child = 0 } = 0) {
  const arrArg = [Adult, Senior, Child];
  return Object.values(data.prices)
    .reduce((acc, curr, index) => (acc + (curr * arrArg[index])), 0);
}

function animalMap({ includeNames = false, sorted = false, sex = '' } = {}) {
  const filterLocation = (location => data.animals
    .filter(animal => animal.location === location)
    .map(animal => animal.name)
  );
  const filterResidents = ((name) => {
    let animalByName = data.animals
      .find(animal => animal.name === name).residents;
    if (sex !== '') {
      animalByName = animalByName
        .filter(resident => resident.sex === sex);
    }
    if (sorted) {
      animalByName = animalByName
        .map(resident => resident.name)
        .sort();
      return animalByName;
    }
    return animalByName
      .map(resident => resident.name);
  });
  const residentNames = ((location) => {
    const arr = filterLocation(location);
    arr.forEach((name, index) => {
      arr[index] = { [name]: filterResidents(name) };
    });
    return arr;
  });
  if (includeNames) {
    return {
      NE: residentNames('NE'),
      NW: residentNames('NW'),
      SE: residentNames('SE'),
      SW: residentNames('SW'),
    };
  }
  return {
    NE: filterLocation('NE'),
    NW: filterLocation('NW'),
    SE: filterLocation('SE'),
    SW: filterLocation('SW'),
  };
}

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
