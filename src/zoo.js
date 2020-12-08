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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(aniObj => aniObj.name === animal).residents.every(aniObj => aniObj.age > age);
}

function employeeByName(emp) {
  if (emp === undefined) return {};
  return employees.find(n => n.firstName === emp || n.lastName === emp);
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return employees.some(idManager => idManager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employ = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(employ);
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  const entrantsArray = Object.keys(entrants);
  return entrantsArray.reduce((acc, curr) => acc + (entrants[curr] * prices[curr]), 0);
}

// Sem parâmetros, retorna animais categorizados por localização
// Com a opção includeNames: true especificada, retorna nomes de animais
// Com a opção sorted: true especificada, retorna nomes de animais ordenados
// Com a opção sex: 'female' ou sex: 'male' especificada, retorna somente nomes
// de animais macho/fêmea
// Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada,
// retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
// Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada

function getResidentsNames(animalName, sorted, sex) {
  let result = animals.find(animal => animal.name === animalName);
  result = result.residents;
  if (typeof sex === 'string') {
    result = result.filter(animal => animal.sex === sex);
  }
  result = result.map(resident => resident.name);
  if (sorted) result.sort();
  return { [animalName]: result };
}

function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex } = options;
  let result = animals.reduce((acc, curr) => {
    const { name, location } = curr;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(name);
    return acc;
  }, {});
  if (includeNames) {
    result = Object.entries(result).reduce((acc, [key, animalName]) => {
      acc[key] = animalName.map(name => getResidentsNames(name, sorted, sex));
      return acc;
    }, {});
  }
  return result;
}

function schedule(dayName) {
  const arrayHours = Object.entries(hours);
  const result = arrayHours.reduce((acc, [key, val]) => {
    const { open, close } = val;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (typeof dayName === 'string') {
    return ({ [dayName]: result[dayName] });
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(emp => emp.id === id);
  const firstId = employee.responsibleFor[0];
  const animal = animalsByIds(firstId)[0];
  const { residents } = animal;
  const oldest = residents.reduce((maisVelho, atual) => {
    if (atual.age > maisVelho.age) {
      return atual;
    }
    return maisVelho;
  });
  return Object.values(oldest);
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.round(prices[key] * increase * 100) / 100;
  });
  return prices;
}

function employeeById(id) {
  return employees.find(emp => emp.id === id);
}

function employeeCoverage(idOrName) {
  const result = employees.reduce((acc, curr) => {
    const { firstName, lastName, responsibleFor } = curr;
    const responsible = responsibleFor.map(id => animalsByIds(id)[0].name);
    acc[`${firstName} ${lastName}`] = responsible;
    return acc;
  }, {});
  if (typeof idOrName === 'string' && idOrName.length !== 0) {
    const employee = employeeByName(idOrName) || employeeById(idOrName);
    const { firstName, lastName } = employee;
    const name = `${firstName} ${lastName}`;
    return { [name]: result[name] };
  }
  return result;
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
