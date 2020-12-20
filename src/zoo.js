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

const { animals } = require('./data');
const data = require('./data');
const { employees } = require('./data');
const data2 = require('./data');
const { prices } = require('./data');
const data3 = require('./data');
const { hours } = require('./data');
const data4 = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return animals.filter(({ id }) => ids[0] === id || ids[1] === id);
}

function animalsOlderThan(animalType, ageTest) {
  const find = animals.find(({ name }) => name === animalType);
  return find.residents.every(({ age }) => age >= ageTest);
}

function employeeByName(...employeeName) {
  if (employeeName.length === 0) return {};
  return employees.find(({ firstName, lastName }) => {
    const testFirst = firstName === employeeName[0];
    const testLast = lastName === employeeName[0];
    return testFirst || testLast;
  });
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  let retorno = false;
  employees.forEach((element, index, array) => {
    const test = array.some(el => id === el.managers[index]);
    if (test === true) retorno = true;
  });
  return retorno;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (!managers) managers = [];
  if (!responsibleFor) responsibleFor = [];
  const newEmploy = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmploy);
}

function animalCount(species) {
  const AnimalObject = {};
  if (species === undefined) {
    for (let index = 0; index < animals.length; index += 1) {
      const animalName = `${animals[index].name}`;
      const AnimalNumber = `${animals[index].residents.length}`;
      AnimalObject[animalName] = Number(AnimalNumber);
    }
    return AnimalObject;
  }
  const find = animals.find(({ name }) => species === name);
  return find.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  const { Adult: ad, Senior: se, Child: ch } = prices;
  const entrantsArray = Object.entries(entrants);
  let sum = 0;
  entrantsArray.forEach((el, index) => {
    if (el[0] === 'Adult') sum += (ad * el[1]);
    if (el[0] === 'Child') sum += (ch * el[1]);
    if (el[0] === 'Senior') sum += (se * el[1]);
  });
  return sum;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const horarios = Object.entries(hours);
  const retorno = {};
  let mensagem;
  // console.log(typeof dayName);
  horarios.forEach(([chave, valor]) => {
    if (dayName === undefined) {
      if (chave === 'Monday') {
        mensagem = 'CLOSED';
      } else {
        mensagem = (`Open from ${valor.open}am until ${valor.close - 12}pm`);
      }
      retorno[chave] = mensagem;
    }
    if (chave === dayName && dayName === 'Monday') {
      mensagem = 'CLOSED';
      retorno[chave] = mensagem;
    } else if (chave === dayName) {
      mensagem = (`Open from ${valor.open}am until ${valor.close - 12}pm`);
      retorno[chave] = mensagem;
    }
  });
  // console.log(retorno);
  return retorno;
}
// schedule();

function oldestFromFirstSpecies(idTratador) {
  const tratador = employees.find(({ id }) => id === idTratador);
  const idAnimal = tratador.responsibleFor[0];
  const animal = animals.find(({ id }) => id === idAnimal);
  const { residents } = animal;
  const oldAnimal = residents.reduce((acc, valor) => {
    if (acc.age > valor.age) return acc;
    return valor;
  });
  return Object.values(oldAnimal);
}

function increasePrices(percentage) {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  Object.keys(prices).forEach((key) => {
    const inc = percentage / 100;
    const price1 = prices[key] + (prices[key] * inc);
    prices[key] = Number(formatter.format(price1));
  });
}
// API para arredondamento(https://qastack.com.br/programming/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript)

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
