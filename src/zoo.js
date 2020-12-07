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
  if (ids.length === 0) {
    return [];
  }
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

const animalsOlderThan = (animal, age) => data.animals
  .find(species => species.name === animal)
  .residents.every(resident => resident.age >= age);

// console.log(animalsOlderThan('otters', 40));

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(function (employee) {
    return employee.firstName === employeeName || employee.lastName === employeeName;
  });
}

const createEmployee = (personalInfo, associatedWith) =>
  Object.assign({}, personalInfo, associatedWith);

const isManager = id =>
data.employees.some(person => person.managers.some(manager => manager === id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) =>
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, curr) => acc + (entrants[curr] * data.prices[curr]), 0);
}

function animalMap(options) {
//   if (options === undefined) {
//     return data.animals.reduce((acc, animal) => {
//       acc[animal.location] = data.animals.name;
//     }, {});
//   }
}
// console.log(animalMap());

function schedule(dayName) {
  // if (dayName === undefined) {
  //   return data.hours.reduce((acc, hour) =>
  //   acc[Object.keys(hour)] = `Open from ${hour.open}am to ${hour.close}pm`, {}
  //   );
  // }
}

// console.log(schedule());

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find(person => person.id === id);
  const species = data.animals.find(animal => employee.responsibleFor[0] === animal.id).residents;
  const olderResidents = species.sort((pos1, pos2) => pos2.age - pos1.age);
  return [olderResidents[0].name, olderResidents[0].sex, olderResidents[0].age];
}


function increasePrices(percentage) {
  const multiply = 1 + (percentage / 100);
  const ticketPrices = Object.keys(data.prices);
  ticketPrices.forEach(price => (
    data.prices[price] = Math.round(data.prices[price] * multiply * 100) / 100
  ));
}

function employeeCoverage(idOrName) {
  // if (idOrName === data.employees.id ||
  // idOrName === data.employees.firstName || idOrName === data.employees.lastName)
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
