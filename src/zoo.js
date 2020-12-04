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

const animalsByIds = (...ids) => {
  const listId = [...ids];
  const listAnimalsById = [];
  listId.forEach((id) => {
    listAnimalsById.push(data.animals.find(animal => animal.id === id));
  });
  return listAnimalsById.reduce((acc, curr) => acc.concat(curr), []);
};

const animalsOlderThan = (species, age) => {
  const animalsSearch = data.animals.find(animal => animal.name === species);
  const animalsResidents = Object.values(animalsSearch.residents);
  return ((animalsResidents.filter(animal => animal.age < age)).length === 0);
};

const employeeByName = (EmployeeName) => {
  const finder = data.employees.find(employee =>
    (employee.firstName === EmployeeName || employee.lastName === EmployeeName));
  if (typeof finder === 'object') {
    return finder;
  }
  return {};
};


const createEmployee = ({ id, firstName, lastName }, { managers, responsibleFor }) => {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
};

const info1 = {
  id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
  firstName: 'John',
  lastName: 'Doe',
};

const info2 = {
  managers: ['c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1', '9e7d4524-363c-416a-8759-8aa7e50c0992'],
  responsibleFor: ['0938aa23-f153-4937-9f88-4858b24d6bce', '89be95b3-47e4-4c5b-b687-1fabf2afa274', 'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'],
};
console.log(info1, info2);

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
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
