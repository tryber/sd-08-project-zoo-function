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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (!ids) return [];
  return animals.filter(animal => ids.find(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find(a => {
      a.name = animal;
    })
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees.find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some(someId => someId.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}
function entryCalculator(entrants) {
  // seu código aqui
  if (entrants == null || Object.keys(entrants).length === 0) {
    return 0;
  }
  const clientes = Object.keys(entrants);
  const calculo = clientes.map(individuo => data.prices[individuo]);
  const valor = Object.values(entrants);
  const soma = valor.reduce(
    (acumulador, posAtual, indice) => (acumulador + calculo[indice]) * posAtual,
    0,
  );
  return soma;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  // const animalSpecie = animals.find(
  //   animal => animal.id === employees.find(employee => employee.id === id).responsibleFor[0],
  // );
  // let maior = animalSpecie.residents[0].age;
  // animalSpecie.residents.map(element => {
  //   if (element.age > maior) return (maior = element);
  // });
  // ({ name, sex, age } = maior);
  // return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  Object.entries(prices).forEach(([key, value]) => {
    prices[key] = parseFloat((((value + 0.001) * percentage) / (100 + 1)).toFixed(2));
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
