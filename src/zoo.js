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

function animalsByIds(ids2, ids1) {
  if (ids2 === undefined && ids1 === undefined) { return []; }
  const buscaBicho = animals.filter(elemento => elemento.id === ids2);
  const buscaBicho2 = animals.filter(elemento => elemento.id === ids1);
  return [...buscaBicho, ...buscaBicho2];
}

function animalsOlderThan(animal, age) {
  const procuraNome = animals.find(elemento => elemento.name === animal);
  const residentes = procuraNome.residents;
  const comparaIdade = residentes.every(idade => idade.age > age);
  return comparaIdade;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  const trabalhadores = employees.find(elemento =>
    elemento.lastName === employeeName || elemento.firstName === employeeName);
  return trabalhadores;
}

function createEmployee(personalInfo, associatedWith) {
  const perfilZoo = Object.assign(personalInfo, associatedWith);
  return perfilZoo;
}

function isManager(id) {
  return employees.some(manager => manager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    const bichosEqtd = animals.reduce((anterior, atual) => {
      anterior[atual.name] = atual.residents.length;
      return anterior;
    }, {});
    return bichosEqtd;
  }
  const procuraBicho = animals.find(especie => especie.name === species);
  const contaBicho = procuraBicho.residents.length;
  return contaBicho;
}

function entryCalculator(entrants) {
  if (entrants === undefined) { return 0; }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const contaTotal = (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
  return contaTotal;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const semana = Object.keys(hours);
  const previsao = semana.reduce((prev, acc) => {
    if (acc === 'Monday') {
      prev[acc] = 'CLOSED';
      return prev;
    }
    prev[acc] = `Open from ${hours[acc].open}am until ${hours[acc].close - 12}pm`;
    return prev;
  }, {});
  if (dayName !== undefined) {
    return { [dayName]: previsao[dayName] };
  }
  return previsao;
}

function oldestFromFirstSpecies(id) {
  const buscaId = employees.find(elemento => elemento.id === id);
  const primeiroIdBicho = buscaId.responsibleFor[0];
  const buscaIdLista = animals.find(elemento => elemento.id === primeiroIdBicho);
  const buscaListaResidentes = buscaIdLista.residents;
  const maisVelho = buscaListaResidentes.reduce((anterior, atual) => {
    if (anterior > (atual.age)) { return anterior; }
    return atual.age;
  }, {});
  const localiza = buscaListaResidentes.find(element => element.age === maisVelho);
  const arr = Object.keys(localiza).map(entrada => localiza[entrada]);
  return arr;
}

function increasePrices(percentage) {
  const inflacao = 1 + (percentage / 100);
  Object.keys(prices).forEach((valor) => {
    prices[valor] = Math.round(((prices[valor] * inflacao)) * 100) / 100;
  });
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
