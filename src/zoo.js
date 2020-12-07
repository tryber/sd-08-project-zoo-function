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

function animalsByIds(...ids) {
  // seu código aqui
  if (ids.length > 0) {
    const animals = ids.map(idEl => data.animals.find(el => el.id === idEl));
    return animals;
  }
  return [];
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalVeiry = data.animals.find(el => el.name === animal);
  return animalVeiry.residents.every(el => el.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(el => el.firstName === employeeName || el.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(el => el.managers.some(m => m === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployees = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployees);
}

function animalCount(species) {
  // seu código aqui
  if (species !== undefined) {
    const n = data.animals.find(el => el.name === species);
    return n.residents.length;
  }
  const a = data.animals.reduce((ac, value) => {
    ac[value.name] = value.residents.length;
    return ac;
  }, {});
  return a;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined) {
    return 0;
  }
  const prices = Object.entries(data.prices);
  const ent = Object.entries(entrants);
  let tot = 0;
  ent.forEach((elEnt) => {
    prices.forEach((elPrices) => {
      tot += elPrices[0] === elEnt[0] ? elPrices[1] * elEnt[1] : 0;
    });
  });
  return tot;
}

const locations = () => data.animals.map(el => el.location)
  .filter((el, index, arr) => arr.indexOf(el) === index);

const isLocalName = locals => data.animals.filter(el => el.location === locals)
  .map(el => el.name);

const listNameAnimals = allLocals => allLocals.reduce((acumulator, value) => {
  acumulator[value] = isLocalName(value);
  return acumulator;
}, {});

const getNamesAnimalarr = classAnimal => classAnimal.map(animal => animal.name);
const getNamesAnimalsex = (classAnimal, sex) => classAnimal.filter(animal => animal.sex === sex)
  .map(animal => animal.name);

const isSex = (residents, sex) => (
sex !== undefined ? getNamesAnimalsex(residents, sex) : getNamesAnimalarr(residents));

const getNameAnimals = (args) => {
  const { sex, sorted } = args;
  const result = data.animals.reduce((acumulador, animal) => {
    if (!acumulador[animal.location]) acumulador[animal.location] = [];
    const { name: key, residents } = animal;
    const objNames = { };
    const arr = isSex(residents, sex);
    objNames[key] = sorted ? arr.sort() : arr;
    acumulador[animal.location].push(objNames);
    return acumulador;
  }, {});
  return result;
};

function animalMap(options) {
  if (options === undefined) return listNameAnimals(locations());
  const { includeNames } = options;
  if (includeNames === true) return getNameAnimals(options);
  return listNameAnimals(locations());
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
