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
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
};

const isManager = (id) => {
  const listManagerId = [];
  data.employees.forEach((employee) => {
    employee.managers.forEach((manager) => {
      if (!listManagerId.includes(manager)) {
        listManagerId.push(manager);
      }
    });
  });
  if (listManagerId.includes(id)) {
    return true;
  }
  return false;
};

console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

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
