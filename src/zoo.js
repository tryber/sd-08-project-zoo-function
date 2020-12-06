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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) return ([]);
  const allids = [];
  ids.forEach(identifier => allids.push(animals.find(element => element.id === identifier)));
  return allids;
}

function animalsOlderThan(animal, age) {
  const loco = animals.find(element => element.name === animal).residents;
  const mapear = loco.map(element => element.age);
  const verificar = mapear.every(element => element > age);
  return verificar;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return ({});
  const f = employees.find(e => e.firstName === employeeName || e.lastName === employeeName);
  return f;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const mapa = employees.map(element => element);
  const lookFor = mapa.some(element => element.managers.includes(id));
  return lookFor;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {};
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;
  employees.push(newEmployee);
  return employees;
}

function animalCount(species) {
  if (species !== undefined) return animals.find(e => e.name === species).residents.length;
  const fullName = {};
  animals.forEach((e) => {
    fullName[e.name] = e.residents.length;
  });
  return fullName;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  let conta = 0;
  if (entrants.Adult !== undefined) conta += entrants.Adult * prices.Adult;
  if (entrants.Child !== undefined) conta += entrants.Child * prices.Child;
  if (entrants.Senior !== undefined) conta += entrants.Senior * prices.Senior;

  return conta;
}
function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
// const {Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Monday} = hours

  const itens = Object.entries(hours);
  const result = {};
  itens.forEach((element) => {
    if (element[0] === 'Monday') {
      result[element[0]] = 'CLOSED';
    } else {
      result[element[0]] = `Open from ${hours[element[0]].open}am until ${hours[element[0]].close - 12}pm`;
    }
  });
  if (dayName !== undefined) return { [dayName]: result[dayName] };
  return result;
}
// console.log(schedule('Tuesday'))

function oldestFromFirstSpecies(id) {
  const recipient = [];
  const workers = employees.find(element => element.id === id).responsibleFor;
  const finder = animals.filter(element => element.id === workers[0]);
  const resi = finder[0].residents;
  const ager = resi.sort((a, b) => b.age - a.age);
  const oldest = ager[0];
  recipient.push(oldest.name, oldest.sex, oldest.age);
  return recipient;
}
function increasePrices(p) {
  prices.Adult = Number(((prices.Adult + (Math.ceil(prices.Adult) * (p / 100)))).toFixed(2));
  prices.Child = Number(Math.round(prices.Child * (1 + (p / 100)) * 100) / 100);
  prices.Senior = Number(Math.round(prices.Senior * (1 + (p / 100)) * (99 + 1)) / 100);
  return prices;
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
