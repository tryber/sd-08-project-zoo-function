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
  if (ids === undefined) {
    return [];
  }
  return data.animals.filter(registro => ids.includes(registro.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(animalName => animalName.name === animal).residents
    .every(range => range.age >= age);
}
function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(workerName => workerName.firstName === employeeName
    || workerName.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return data.employees.some(register => register.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(animalName => animalName.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acc, curr) =>
    acc + (entrants[curr] * data.prices[curr]), 0);
}


function animalMap(options) {
  const NE = data.animals.filter(region => region.location === 'NE');
  const NW = data.animals.filter(region => region.location === 'NW');
  const SE = data.animals.filter(region => region.location === 'SE');
  const SW = data.animals.filter(region => region.location === 'SW');
  if (options === undefined) {
    const resultRegion = {
      NE: NE.map(nome => nome.name),
      NW: NW.map(nome => nome.name),
      SE: SE.map(nome => nome.name),
      SW: SW.map(nome => nome.name),
    };
    return resultRegion;
  }
  return undefined;
}


function schedule(dayName) {
  const scheduleDay = Object.entries(data.hours).reduce((acc, [chave, valor]) => {
    acc[chave] = valor.open - valor.close < 0 ? `Open from ${valor.open}am until ${valor.close - 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (dayName === undefined) {
    return scheduleDay;
  }
  return { [dayName]: scheduleDay[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find(register => register.id === id);
  const creature = Object.values(employee.responsibleFor)[0];
  const result = data.animals.find(animalId => creature.includes(animalId.id))
    .residents.reduce((acc, curr) => {
      if (acc.age < curr.age) {
        acc = curr;
        return acc;
      }
      return acc;
    });

  return Object.values(result);
}

function increasePrices(percentage) {
  const percent = 1 + (percentage / 100);
  Object.keys(data.prices).forEach((chave) => {
    data.prices[chave] = Math.round(data.prices[chave] * percent * 100) / 100;
  });
}


function employeeCoverage(idOrName) {
  const workers = Object.values(data.employees).reduce((acc, curr) => {
    acc[`${curr.firstName} ${curr.lastName}`] = curr.responsibleFor.map(id => animalsByIds(id)[0].name);
    return acc;
  }, {});
  if (idOrName === undefined) {
    return workers;
  }
  const finder = data.employees.find(worker => worker.firstName === idOrName ||
    worker.lastName === idOrName || worker.id === idOrName);
  const name = `${finder.firstName} ${finder.lastName}`;

  return { [name]: workers[name] };
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
