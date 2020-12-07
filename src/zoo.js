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

function animalMap(options) {
  if (options === undefined) {
    const local = animals.map(animal => ({ [animal.location]: animal.name, }));
    console.log(local)
    const animalMap1 = local.reduce((acc, curr) => {
      console.log(acc)
      console.log(curr)
      const chave = Object.keys(curr);
      console.log(curr.name)
      console.log(chave)
      console.log(acc[chave])
      if (acc[chave] === undefined) {
        acc[chave] = curr.name
      } else {
        acc[chave].push(curr[chave]);
      }
      return acc;
    }, {})
    return animalMap1;
  }
};

function schedule(dayName) {
  const objHours = Object.entries(hours);
  const result = objHours.reduce((acc, [key, val]) => {
    const { open, close } = val;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (typeof dayName === 'string') {
    return ({[dayName]: result[dayName]})
  } else {
    return result;
  };
};

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
