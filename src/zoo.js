const { animals, employees, prices, hours } = require('./data');
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
  if (!ids) {
    return [];
  }
  return animals.filter(animal => ids.find(elem => elem === animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find(elem => elem.name === animal)
    .residents.every(elem => elem.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    return {};
  }
  return employees.find(elem => elem.firstName === employeeName || elem.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newObj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newObj;
}

function isManager(id) {
  // seu código aqui
  return employees.some((elem, index) => elem.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newObj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newObj);
}

function animalCount(species) {
  // seu código aqui
  const newObj = {};
  if (!species) {
    animals.forEach((elem) => {
      const obj = {
        [elem.name]: elem.residents.length,
      };
      Object.assign(newObj, obj);
    });
    return newObj;
  }
  return animals.find(elem => elem.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const sum = (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
  return sum;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  const animal = animals.find(specie => specie.id === animalId);
  let oldestAge = 0;
  let oldestAnimal;
  animal.residents.forEach((elem) => {
    if (elem.age > oldestAge) {
      oldestAge = elem.age;
      oldestAnimal = Object.values(elem);
    }
  });
  return oldestAnimal;
}

function increasePrices(percentage) {
  // seu código aqui
  const percent = percentage / 100;
  const adult = (percent * prices.Adult) + prices.Adult;
  const child = (percent * prices.Child) + prices.Child;
  const senior = (percent * prices.Senior) + prices.Senior;
  prices.Adult = Math.round(adult * 100) / 100;
  prices.Child = Math.round(child * 100) / 100;
  prices.Senior = Math.round(senior * 100) / 100;
}

function employeeById(id) {
  return employees.find(employee => employee.id === id);
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const result = employees.reduce((acc, employee) => {
    const { firstName, lastName, responsibleFor } = employee;
    acc[`${firstName} ${lastName}`] = responsibleFor.map(id => animalsByIds(id)[0].name);
    return acc;
  }, {});
  if (typeof idOrName === 'string' && idOrName.length !== 0) {
    const employee = employeeByName(idOrName) || employeeById(idOrName);
    const { firstName, lastName } = employee;
    const name = `${firstName} ${lastName}`;
    return { [name]: result[name] };
  }
  return result;
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
