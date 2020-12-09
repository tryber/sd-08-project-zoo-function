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

// const data = require('./data');

const { animals, employees, hours, prices } = require('./data');

function animalsByIds(...ids) {
  let results = [];
  results = animals.filter(animal => ids.some(id => id === animal.id));
  return results;
}

function animalsOlderThan(animal, age) {
  const theAnimal = animals.find(anim => anim.name === animal);
  return theAnimal.residents.every(anim => anim.age >= age);
}

function employeeByName(employeeName) {
  const employee = employees.find(emp => emp.firstName === employeeName ||
    emp.lastName === employeeName);

  if (employee) {
    return employee;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(employee => employee.managers.find(manager => id === manager));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, animal) => {
      Object.assign(acc, { [animal.name]: animal.residents.length });
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return ((Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior));
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  if (!dayName) {
    return {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED',
    };
  } else if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close % 12}pm` };
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(emp => emp.id === id);
  const animal = animals.find(anim => anim.id === employee.responsibleFor[0]);
  const oldest = animal.residents.reduce((acc, item) =>
    (acc.age > item.age ? acc : item),
  );
  return [oldest.name, oldest.sex, oldest.age];
}

function increasePrices(percentage) {
  const p = 1 + (percentage / 100);
  const { Adult, Child, Senior } = prices;
  prices.Adult = Math.round(Adult * p * 100) / 100;
  prices.Child = Math.round(Child * p * 100) / 100;
  prices.Senior = Math.round(Senior * p * 100) / 100;
}

const nameById = (id) => {
  const animal = animals.find(anim => anim.id === id);
  return animal.name;
};

const animalArray = (arr) => {
  const array = [];
  arr.forEach((animal) => {
    array.push(nameById(animal));
  });
  return array;
};

function employeeCoverage(idOrName) {
  if (!idOrName) {
    return employees.reduce((acc, emp) => {
      Object.assign(acc, { [`${emp.firstName} ${emp.lastName}`]: animalArray(emp.responsibleFor) });
      return acc;
    }, {});
  }
  const employee = employees.find(emp => Object.values(emp).find(name => name === idOrName));
  return { [`${employee.firstName} ${employee.lastName}`]: animalArray(employee.responsibleFor) };
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
