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
  // seu código aqui
  return data.animals.filter(animal => ids.some(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // const specie = data.animals.find(specie => specie.name === animal);
  // return specie.residents.every(resident => resident.age >= age);
  return data.animals
    .find(specie => specie.name === animal)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
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
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return data.animals.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
  }
  const animalSearch = data.animals.find(animal => animal.name === species);
  return animalSearch.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  const { prices } = data;
  return Object.keys(entrants).reduce(
    (acc, key) => (acc += prices[key] * entrants[key]),
    0,
  );
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const hours = data.hours;

  const message = Object.entries(hours).reduce((acc, [key, value]) => {
    const { open, close } = value;
    acc[key] =
      close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (dayName === undefined) {
    return message;
  }
  return { [dayName]: message[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const { responsibleFor } = data.employees.find(
    employee => employee.id === id,
  );
  return Object.values(
    data.animals
      .find(animal => animal.id === responsibleFor[0])
      .residents.reduce((acc, value) => (value.age > acc.age ? value : acc)),
  );
}

function increasePrices(percentage) {
  // seu código aqui
  const percent = percentage / 100;
  const prices = Object.entries(data.prices);
  prices.map(
    element =>
      (element[1] = Math.round(element[1] * (percent + 1) * 100) / 100),
  );
  prices.forEach(value => (data.prices[value[0]] = value[1]));
  return data.prices;
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
