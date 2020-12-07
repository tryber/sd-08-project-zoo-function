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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const anim = data.animals.find(a => a.name === animal).residents.every(a => a.age > age);
  return anim;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(p => p.firstName === employeeName || p.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return data.employees.some(m => m.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const objectAnimal = data.animals.reduce((cont, a) => {
    cont[a.name] = a.residents.length;
    return cont;
  }, {});
  if (species === undefined) {
    return objectAnimal;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  const people = data.prices;
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((cont, [key, valor]) => cont + (people[key] * valor), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const { hours } = data;
  const resut = Object.entries(hours).reduce((cont, [key, value]) => {
    cont[key] = value.open === 0 && value.close === 0 ? 'CLOSED' : `Open from ${value.open}am until ${value.close - 12}pm`;
    return cont;
  }, {});
  if (dayName === undefined) {
    return resut;
  }
  return { [dayName]: resut[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find(animal => animal.id === id).responsibleFor[0];
  const animalId = data.animals.find(a => a.id === employee).residents;
  const ageId = animalId.reduce((cont, a) => (cont.age > a.age ? cont : a));
  return Object.values(ageId);
}

function increasePrices(percentage) {
  const porcentagem = 1 + (percentage / 100);
  return Object.entries(data.prices).forEach(([key, value]) => {
    data.prices[key] = Math.round(value * porcentagem * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return data.employees.reduce((cont, employee) => {
      const { firstName, lastName, responsibleFor } = employee;
      cont[`${firstName} ${lastName}`] = responsibleFor.map(i => data.animals.find(animal => animal.id === i).name);
      return cont;
    }, {});
  }
  return data.employees.reduce((cont, nome) => {
    nome = data.employees.find(x => x.id === idOrName || x.firstName === idOrName || x.lastName === idOrName);
    const { firstName, lastName, responsibleFor } = nome;
    cont[`${firstName} ${lastName}`] = responsibleFor.map(x => data.animals.find(animal => animal.id === x).name);
    return cont;
  }, {});
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
