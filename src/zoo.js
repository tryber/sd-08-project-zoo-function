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
  if (!ids) {
    return undefined;
  }
  const found = ids
  .map(id => animals.find(element => element.id === id));
  return found;
  // seu código aqui
}
console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function animalsOlderThan(animal, age) {
  const found = animals
  .find(element => element.name === animal)
  .residents.every(element => element.age > age);
  return found;
}

console.log(animalsOlderThan('otters', 7));
console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const found = employees
  .find(element => element.firstName === employeeName || element.lastName === employeeName);
  return found;
  // seu código aqui
}
console.log(employeeByName());
console.log(employeeByName('Nigel'));

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
  // seu código aqui
}

function isManager(id) {
  const trueOrFalse = employees
  .some(element => element.managers.includes(id));
  return trueOrFalse;
  // seu código aqui
}
console.log(isManager('b0dc644a-5335-489b-8a2c-4e086c7819a2'));
console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  // seu código aqui
}

function animalCount(species) {
  if (!species) {
    const objeto = {};
    objeto.lions = animals[0].residents.length;
    objeto.tigers = animals[1].residents.length;
    objeto.bears = animals[2].residents.length;
    objeto.penguins = animals[3].residents.length;
    objeto.otters = animals[4].residents.length;
    objeto.frogs = animals[5].residents.length;
    objeto.snakes = animals[6].residents.length;
    objeto.elephants = animals[7].residents.length;
    objeto.giraffes = animals[8].residents.length;
    return objeto;
  }
  const number = animals.find(element => element.name === species);
  return number.residents.length;
}

console.log(animalCount('giraffes'));
console.log(animalCount());
function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const ingressos = Object.keys(entrants);
  const valorFinal = ingressos
  .reduce((acumulador, pessoa) => acumulador + (entrants[pessoa] * prices[pessoa]), 0);
  return valorFinal;
  // seu código aqui
}
console.log(entryCalculator());
console.log(entryCalculator({}));
console.log(entryCalculator({ Adult: 2, Child: 3, Senior: 1 }));
console.log(entryCalculator({ Adult: 1 }));
console.log(entryCalculator({ Senior: 1 }));

function animalMap(options) {
// seu código aqui
}


function schedule(dayName) {
  const objeto = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return objeto;
  }
  const resposta = {
    [dayName]: objeto[dayName],
  };
  return resposta;

  // seu código aqui
}
console.log(schedule());
console.log(schedule('Tuesday'));
console.log(schedule('Monday'));

function oldestFromFirstSpecies(id) {
  const found = employees.find(element => element.id === id);
  const animalSelecionado = found.responsibleFor[0];
  const achar = animals
  .find(element => element.id === animalSelecionado)
  .residents.sort((elementA, elementB) => elementB.age - elementA.age);
  const div = achar[0];
  const array = [div.name, div.sex, div.age];
  return array;// seu código aqui
}

console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
function increasePrices(percentage) {
  const chaves = Object.keys(prices);
  chaves.forEach((element) => {
    prices[element] = Math.round(prices[element] * (1 + (percentage / 100)) * 100) / 100;
  });
  return prices;
}
function getAnimalsById(animalIds) {
  return animalIds.map(id => animals.find(animal => animal.id === id).name);
}
function employeeCoverage(idOrName) {
  const tabela = {};
  employees.forEach((employee) => {
    const { firstName, lastName, responsibleFor } = employee;
    const nomeCompleto = `${firstName} ${lastName}`;
    const response = getAnimalsById(responsibleFor);
    tabela[nomeCompleto] = response;
  });
  if (!idOrName) return tabela;
  const resposta = {};
  const names = employees.find(
    employee =>
      idOrName === employee.firstName || idOrName === employee.lastName || idOrName === employee.id,
  );
  const nome = `${names.firstName} ${names.lastName}`;
  const responsible = tabela[nome];
  resposta[nome] = responsible;
  return resposta;
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
