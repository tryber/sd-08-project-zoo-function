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

const { prices } = require('./data');
const { employees } = require('./data');
const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.some(id => animal.id === id));
  // return animals.map(ids => animals.find(id => animals.id === id));
}
console.log(animalsByIds());

function animalsOlderThan(animal, age) {
  const animalAgora = animals.find(amm => amm.name === animal);
  return animalAgora.residents.every(name => name.age >= age);
}
console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  let retorno;
  if (typeof employeeName === 'undefined') {
    retorno = {};
  } else {
    retorno = employees.find(empregado => empregado.firstName === employeeName
      || empregado.lastName === employeeName);
  }
  return retorno;
}
console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // const verificar = employees.find(obj => obj.id === id);
  return employees.some(empregado => empregado.managers.includes(id));
}
console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (!managers) {
    managers = [];
  }
  if (!responsibleFor) {
    responsibleFor = [];
  }
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  const novoEmpregado = createEmployee(personalInfo, associatedWith);
  employees.push(novoEmpregado);
}

function animalCount(species) {
  let contagem = {};
  if (!species) {
    animals.forEach((animal) => {
      contagem[animal.name] = animal.residents.length;
    });
  } else {
    contagem = animals.find(obj => species === obj.name).residents.length;
  }
  return contagem;
}
console.log(animalCount());

function entryCalculator(entrants) {
  let total;
  if (!entrants) {
    total = 0;
    return total;
  } else if (Object.keys(entrants).length === 0) {
    total = 0;
    return total;
  }
  let valorAdulto = 0;
  let valorSenior = 0;
  let valorInfantil = 0;

  if (Object.keys(entrants).includes('Adult')) {
    valorAdulto = entrants.Adult * prices.Adult;
  }
  if (Object.keys(entrants).includes('Senior')) {
    valorSenior = entrants.Senior * prices.Senior;
  }
  if (Object.keys(entrants).includes('Child')) {
    valorInfantil = entrants.Child * prices.Child;
  }
  total = valorAdulto + valorSenior + valorInfantil;
  return total;
}
console.log(entryCalculator({ Adult: 2, Child: 3, Senior: 1 }));

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
