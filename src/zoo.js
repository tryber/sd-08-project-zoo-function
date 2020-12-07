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

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const newEmployeeForAdd = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(newEmployeeForAdd);
};

const animalCount = (species) => {
  const listSpecies = [];
  data.animals.forEach(animal => listSpecies.push(animal.name));

  if (listSpecies.includes(species)) {
    return (data.animals.find(animal => animal.name === species)).residents.length;
  }
  const allCounted = {};
  listSpecies.forEach((animalSpecies) => {
    (allCounted[animalSpecies]) =
      (data.animals.find(animal => animal.name === animalSpecies)).residents.length;
  });
  return allCounted;
};

const entryCalculator = (entrants) => {
  if (typeof entrants === 'object' && entrants !== {}) {
    const visitors = entrants;
    const defaultVisitors = { Adult: 0, Child: 0, Senior: 0 };
    Object.assign(defaultVisitors, visitors);
    const adultPay = data.prices.Adult * defaultVisitors.Adult;
    const childPay = data.prices.Child * defaultVisitors.Child;
    const seniorPay = data.prices.Senior * defaultVisitors.Senior;

    return (adultPay + childPay + seniorPay);
  }
  return 0;
};

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
