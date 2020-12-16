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
  // if (options === 'teste') {
  //   const resultName = {
  //     NE: NE.map((nome) => Object.entries(nome.residents)).
  //   }
  //   return console.log(resultName);
  // }
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
