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
const { prices } = require('./data');
const { hours } = require('./data');

const arr = data.animals;

const employee = data.employees;


function animalsByIds(ids, ids2) {
  if (ids === '' || ids === ' ' || ids === undefined) { return []; }
  const arr1 = arr.filter(id => (id.id === ids));
  const arr2 = arr.filter(id => (id.id === ids2));
  const newA = [...arr1, ...arr2];
  return newA;
}

function animalsOlderThan(animal, age) {
  const arr3 = arr.filter(x => (x.name === animal));
  const arr4 = arr3[0].residents;
  const arr5 = arr4.filter(y => y.age > age);

  if (arr5.length === arr4.length) { return true; }

  return false;
}

function employeeByName(employeeName) {
  if (employeeName === '' || employeeName === ' ' || employeeName === undefined) { return {}; }
  const arr6 = employee.filter(x => (x.firstName === employeeName || x.lastName === employeeName));
  return arr6[0];
}

function createEmployee({ id, firstName, lastName }, { managers = [], responsibleFor = [] }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const arr7 = employee.filter(x => (x.managers.find(y => (y === id))));
  if (arr7.length > 0) {
    return true;
  }
  return false;
}
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employee.push({ id, firstName, lastName, managers, responsibleFor });
}
function animalCount(species) {
  if (species === '' || species === ' ' || species === undefined) {
    const lista = {};
    data.animals.forEach((x) => {
      lista[x.name] = x.residents.length;
    });
    return lista;
  }
  const animalSelect = arr.filter(x => (x.name === species))[0];
  return animalSelect.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === '' || entrants === ' ' || entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const valores = (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);

  return valores;
}

function animalMap(options) {
  // seu código aqui
}
function schedule(dayName) {
  const arrayTeste = {};
  const horas = Object.entries(hours);
  horas.forEach((element) => {
    const key = element[0];
    if (element[0] === 'Monday') {
      arrayTeste[`${key}`] = 'CLOSED';
      return;
    }
    arrayTeste[`${key}`] = `Open from ${element[1].open}am until ${element[1].close - 12}pm`;
  });
  if (dayName === undefined) {
    return arrayTeste;
  }
  const arrr = Object.entries(arrayTeste);
  const ret = arrr.find(key => key[0] === dayName);
  const keyy = ret[0];
  const value = ret[1];
  const objFin = {};
  objFin[`${keyy}`] = value;
  return objFin;
}

function oldestFromFirstSpecies(id) {
  const primeiroanimal = data.employees.find(func => func.id === id).responsibleFor[0];

  const objAnimal = data.animals.find(animal => animal.id === primeiroanimal).residents;

  const animalOld = objAnimal.reduce((acumulador, valoratual) => {
    if (acumulador.age > valoratual.age) return acumulador;
    return valoratual;
  });
  return Object.values(animalOld);
}

function increasePrices(percentage) {
  const porcentagem = percentage / 100;
  const aumentoAdulto = (Math.round(prices.Adult * (porcentagem + 1) * 100)) / 100;
  const aumentoSenior = (Math.round(prices.Senior * (porcentagem + 1) * 100)) / 100;
  const aumentoCrian = (Math.round(prices.Child * (porcentagem + 1) * 100)) / 100;

  prices.Adult = aumentoAdulto;
  prices.Senior = aumentoSenior;
  prices.Child = aumentoCrian;
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
