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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return animals.filter((cur, idx) => cur.id === ids[idx]);
}

function animalsOlderThan(animal, age) {
  return animals.find(cur => cur.name === animal).residents.every(cur => cur.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(cur => employeeName === cur.firstName || employeeName === cur.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(cur => cur.managers.find(item => item === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const lista = {};
    animals.forEach((cur) => {
      lista[cur.name] = cur.residents.length;
    });
    return lista;
  }
  return animals.find(cur => cur.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, cur) => acc + (entrants[cur] * prices[cur]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const cronograma = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName === undefined) {
    return cronograma;
  }
  return {
    [dayName]: cronograma[dayName],
  };
}

function oldestFromFirstSpecies(id) {
  const idDaEspecie = employees.find(cur => cur.id === id).responsibleFor[0];
  const animais = animals.find(cur => cur.id === idDaEspecie).residents;
  const maisVelho = animais.sort((a, b) => b.age - a.age)[0];
  return Object.values(maisVelho);
}

function increasePrices(percentage) {
  const adulto = parseFloat((prices.Adult + ((percentage / 100) * prices.Adult) + 0.005)
  .toFixed(2));
  prices.Adult = adulto;
  const idoso = parseFloat((prices.Senior + ((percentage / 100) * prices.Senior) + 0.005)
  .toFixed(2));
  prices.Senior = idoso;
  const criança = parseFloat((prices.Child + ((percentage / 100) * prices.Child) + 0.005)
  .toFixed(2));
  prices.Child = criança;
  return prices;
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const lista = {};
    employees.forEach((cur) => {
      lista[`${cur.firstName} ${cur.lastName}`] = cur.responsibleFor
      .map((speciesId) => {
        const especie = animals
        .find(cur => cur.id === speciesId).name;
        return especie;
      });
    });
    return lista;
  } else {
    const employee = employees
    .find(cur => cur.id === idOrName ||
      cur.firstName === idOrName || cur.lastName === idOrName);
    return {
      [`${employee.firstName} ${employee.lastName}`]: employee.responsibleFor
      .map((speciesId) => {
        const especie = animals
        .find(cur => cur.id === speciesId).name;
        return especie;
      }),
    };
  }
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
