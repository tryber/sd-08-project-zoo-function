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
const { animals, prices, employees, hours } = require('./data.js');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => animal.id === id));
}


function animalsOlderThan(animal, age) {
  return animals.find(animaLs => animaLs.name === animal).residents
    .every(ageAnimal => ageAnimal.age >= age);
}


function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees
    .find(nome => nome.firstName === employeeName
      || nome.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employeeS => employeeS.managers.includes(id));
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
  const obj = {};
  if (species) {
    return data.animals.find(animal => animal.name === species).residents.length;
  }
  data.animals.forEach((specie) => {
    obj[specie.name] = specie.residents.length;
  });
  return obj;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}
function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {  // REFERÊNCIA TIRADA DO GITHUB DO CLEBERTON FRANCISCO https://github.com/tryber/sd-08-project-zoo-function/blob/Cleberton-zoo-function/src/zoo.js
  if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  if (!dayName) {
    return {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED'
    }
  }
  const obj = { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
  return obj;
}

function oldestFromFirstSpecies(id) {
  const specie = animals.find(speciE => speciE.id === employees
    .find(employee => employee.id === id).responsibleFor[0]);
  const AnimalOlder = Math.max(...specie.residents.map(animal => animal.age));
  return Object.values(specie.residents.find(animal => animal.age === AnimalOlder));
}

function increasePrices(percentage) {
  Object.entries(prices).forEach(([chave, valor]) => {
    prices[chave] = Math.round((valor * (percentage / 100 + 1) * 100)) / 100;
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
