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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter(animal => animal.id === ids.find(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.filter(element => element.name === animal)
  .every(element => element.residents
    .every(resident => resident.age >= age));
}

function employeeByName(employeeName) {
  // seu código aqui
  if (typeof employeeName === 'undefined') {
    return {};
  }
  return employees.find(employee =>
  employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee({ id: nId, firstName: nFirstName, lastName: nLastName },
  { managers: nManagers, responsibleFor: nResponsilbleFor }) {
  // seu código aqui
  return {
    id: nId,
    firstName: nFirstName,
    lastName: nLastName,
    managers: nManagers,
    responsibleFor: nResponsilbleFor,
  };
}

function isManager(id) {
  // seu código aqui
  return employees.some(employee => employee.id === id && employee.responsibleFor.length === 4);
}

function addEmployee(nId, nFirstName, nLastName, nManagers = [], nResponsibleFor = []) {
  // seu código aqui
  employees.push(
    {
      id: nId,
      firstName: nFirstName,
      lastName: nLastName,
      managers: nManagers,
      responsibleFor: nResponsibleFor,
    },
  );
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length || 0;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || entrants === {}) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, key) =>
  acc + (data.prices[key] * entrants[key]), 0);
}

function animalMap(options) {
  // seu código aqui

}

function schedule(dayName) {
  // seu código aqui
  if (!dayName) {
    return {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED',
    };
  }
  return Object.keys(data.hours).reduce((acc, weekDay) => {
    if (dayName === 'Monday') {
      acc[dayName] = 'CLOSED';
      return acc;
    }
    acc[dayName] =
    `Open from ${Object.values(data.hours[dayName])[0]}am until ${
    Object.values(data.hours[dayName])[1] - 12}pm`;
    return acc;
  }, {});
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const employ = data.employees.find(objt => objt.id === id);
  const animalId = employ.responsibleFor[0];
  const objtAnimal = data.animals.find(objts => objts.id === animalId);
  const { residents } = objtAnimal;
  let olderAnimal = { age: 0 };
  residents.forEach((obj) => {
    if (obj.age > olderAnimal.age) {
      olderAnimal = obj;
    }
  });
  return [olderAnimal.name, olderAnimal.sex, olderAnimal.age];
}
 // atencao
function increasePrices(percentage) {
  // seu código aqui
  const adult = data.prices.Adult + (data.prices.Adult * (percentage / 100));
  const senior = data.prices.Senior + (data.prices.Senior * (percentage / 100));
  const child = data.prices.Child + (data.prices.Child * (percentage / 100));
  data.prices.Adult = Math.round(adult * 100) / 100;
  data.prices.Senior = Math.round(senior * 100) / 100;
  data.prices.Child = Math.round(child * 100) / 100;
  return data.prices;
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
