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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return animals.filter(actua => actua.id === ids[0] || actua.id === ids[1]);
}

const getAllEmployee = () => {
  const output = {};
  employees.map((person) => {
    const fullname = `${person.firstName} ${person.lastName}`;
    const animalsId = person.responsibleFor;
    const animalsName = getAnimal(animalsId);
    const obj = { [fullname]: animalsName };
    return Object.assign(output, obj);
  });
  return output;
};

function animalsOlderThan(...ids) {
  return animals.find(tipobicho => tipobicho.name === ids[0])
    .residents.every(tipobicho => tipobicho.age >= 7);
}

const getAnimal = (animalId) => {
  const output = [];
  for (let index = 0; index < animalId.length; index += 1) {
    animals.forEach((animal) => {
      if (animalId[index] === animal.id) {
        output.push(animal.name);
      }
    });
  }
  return output;
};

function employeeByName(ids) {
  if (!ids) return {};
  return employees.find(func => func.firstName === ids || func.lastName === ids);
}

function createEmployee(...ids) {
  return {
    ...ids[0],
    ...ids[1],
  };
}

function isManager(...ids) {
  const trazid = employees.find(employ => employ.managers);
  const arr = (trazid.managers);
  if (arr.some(str => str === ids[0])) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if ((!managers) || (!responsibleFor)) {
    const container = Object.assign(
      {},
      { id },
      { firstName },
      { lastName },
      { managers: [] },
      { responsibleFor: [] },
    );
    data.employees.push(container);
  } else if (managers !== undefined || responsibleFor !== undefined) {
    const container = Object.assign(
      {},
      { id },
      { firstName },
      { lastName },
      { managers },
      { responsibleFor },
    );
    data.employees.push(container);
  }
}

function animalCount(species) {
  const container = {};
  if (!species) {
    animals.filter(anima => (container[anima.name] = anima.residents.length));
    return container;
  }
  const numerAnima = animals.find(anima => anima.name === species);
  const lgth = numerAnima.residents.length;
  return lgth;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const entrantsKeys = Object.keys(entrants).map(eachKey =>
  data.prices[eachKey] * entrants[eachKey]);
  const soma = entrantsKeys.reduce((previus, current) => previus + current);
  return parseFloat(soma.toFixed(2));
}


function animalMap(options) {
  // fica para o final
}

function schedule(dayName) {
  const scheduleKeys = Object.keys(data.hours);
  const scheduleValues = Object.values(data.hours);
  let output;

  const week = {};
  scheduleKeys.map((elem, index) => {
    const openHour = (scheduleValues[index].open !== 0) ?
    `Open from ${scheduleValues[index].open}am until ${(scheduleValues[index].close - 12)}pm` :
    'CLOSED';
    return Object.assign(week, { [elem]: openHour });
  });

  if (dayName !== undefined) {
    Object.entries(week).forEach((key) => {
      if (dayName === key[0]) {
        output = { [key[0]]: key[1] };
      }
    });
  } else {
    output = week;
  }

  return output;
}

function oldestFromFirstSpecies(id) {
  const finderById = employees.find(employee => employee.id === id);
  const firstSpecies = finderById.responsibleFor[0];
  const finderByCode = animals.find(animal => animal.id === firstSpecies);
  const finderOldest = finderByCode.residents.reduce((acc, curr) =>
    ((acc.age > curr.age) ? acc : curr));
  return Object.values(finderOldest);
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  let output = {};
  if (idOrName === undefined) { return getAllEmployee(); }
  const getEmployee = employees.find((person) => {
    const { id, firstName, lastName } = person;
    return id === idOrName || firstName === idOrName || lastName === idOrName;
  });
  const fullname = `${getEmployee.firstName} ${getEmployee.lastName}`;
  const animalId = getEmployee.responsibleFor;
  output = { [fullname]: getAnimal(animalId) };
  return output;
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
