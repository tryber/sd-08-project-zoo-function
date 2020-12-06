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

const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  // return ids.map(id => animals.find(animal => animal.id === id));
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animalName, age) {
  let result = animals.find(animal => animal.name === animalName);
  if (result) result = result.residents.every(animal => animal.age >= age);
  return result;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  // return employees.find(employee => {
  //   return employee.firstName === employeeName || employee.lastName === employeeName
  // });
  return employees.find(employee => (
    employee.firstName === employeeName || employee.lastName === employeeName
  ));
}

function createEmployee(personalInfo, associatedWith) {
  // return Object.assign({}, personalInfo, associatedWith);
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  employees.push(createEmployee(personalInfo, associatedWith));
}

function animalCount(species) {
  const result = animals.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
    // return Object.assign(acc, {
    //   [cur.name]: cur.residents.length
    // });
  }, {});

  // if (species) return result[species];
  if (typeof species === 'string' && species.length !== 0) return result[species];

  return result;
  // return animals.find(animal => animal.name === species).residents
  //   .length;
}

// function animalCount(species) {
//   if (!species) {
//     return animals.reduce((acc, cur) => {
//       acc[cur.name] = cur.residents.length;
//       return acc;
//     }, {});
//   }
//   return animals.find(a => a.name === species).residents.length || 0;
// }

function entryCalculator(entrants) {
  if (typeof entrants !== 'object' || Object.keys(entrants).length === 0) return 0;

  // return Object.keys(entrants).reduce((acc, key) => {
  //   return acc + (prices[key] * entrants[key]);
  // }, 0);

  // return Object.keys(entrants).reduce((previousValue, currentValue) =>
  //   previousValue + (entrants[currentValue] * prices[currentValue]), 0);

  return Object.keys(entrants).reduce((acumulador, chave) => (
    acumulador + (entrants[chave] * prices[chave])
  ), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // acumulador: {}, key: Tuesday, val: { open: 8, close: 18 }
  // acumulador: {Tuesday: { open: 8, close: 18 }}, key: Wednesday, val: { open: 8, close: 18 }
  const result = Object.entries(hours).reduce((acumulador, [key, val]) => {
    const { open, close } = val;
    acumulador[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acumulador;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: result[dayName] };
  return result;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(current => current.id === id);
  const firstSpeciesId = employee.responsibleFor[0];
  const animal = animalsByIds(firstSpeciesId)[0];
  const { residents } = animal;
  const oldest = residents.reduce((maisVelho, atual) => (
    atual.age > maisVelho.age ? atual : maisVelho
  ));
  return Object.values(oldest);
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach(key => (
    prices[key] = Math.round(prices[key] * increase * 100) / 100
  ));
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
