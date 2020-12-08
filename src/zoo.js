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
  if (ids === undefined) {
    return [];
  }
  return data.animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals
  .find(animale => animale.name === animal)
  .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employee =>
    employee.firstName === employeeName ||
    employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(employee => employee.managers.includes(id));
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };

  data.employees.push(createEmployee(personalInfo, associatedWith));
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    /*  Seguido a lógica vista em vídeo do Simões,
    consegui entender o processo feito por ele,
    porém não havia pensado nesse raciocínio.*/
    return data.animals.reduce((acc, curr) => Object.assign(acc, {
      [curr.name]: curr.residents.length,
    }), {});
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  return Object.entries(entrants)
  .reduce((Total, valor) => Total + (valor[1] * data.prices[valor[0]]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const result = Object.entries(data.hours).reduce((acumulador, [key, val]) => {
    const { open, close } = val;
    acumulador[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acumulador;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: result[dayName] };
  return result;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const funcionario = data.employees.find(employee => employee.id === id);
  const animalId = data.employees
  .find(funcio => funcio === funcionario).responsibleFor[0];
  const animalResidents = data.animals.find(aniId => aniId.id === animalId).residents;
  const maisVelho = animalResidents.reduce((velho, atual) =>
  (atual.age > velho.age ? atual : velho));
  return Object.values(maisVelho);
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(data.prices).forEach(key => (
    data.prices[key] = Math.round(data.prices[key] * increase * 100) / 100
  ));
  // return Object.entries(data.prices).reduce((object, [key, value]) =>{
  //   object[key] = value * ( 1 + percentage / 100)
  //   return object
  // },{})
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
