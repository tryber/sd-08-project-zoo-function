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
    const objNames = {};
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
  const { hours } = data;
  const result = Object.entries(hours).reduce((acumulador, [key, value]) => {
    const [am, pm] = Object.values(value);
    acumulador[key] = key === 'Monday' ? 'CLOSED' : `Open from ${am}am until ${pm % 12}pm`;
    return acumulador;
  }, {});
  if (dayName) {
    const day = result[dayName];
    return {
      [dayName]: day,
    };
  }
  return result;
}

const idFirstAnimal = (employees, id) => employees.filter(el => el.id === id)
  .map(el => el.responsibleFor.shift());

function oldestFromFirstSpecies(id) {
  const { employees, animals } = data;
  const idFirst = idFirstAnimal(employees, id);
  const idAnimal = animals.filter(animal => animal.id === idFirst[0]);
  const { residents } = idAnimal[0];
  const result = residents.reduce((ac, value) => {
    ac = ac.age > value.age ? ac : value;
    return ac;
  });
  return Object.values(result);
}
const calcPorcent = (value, tx) => Math.round((value + (value * (tx / 100))) * 100) / 100;
function increasePrices(percentage) {
  const { prices } = data;
  const key = Object.keys(prices);
  const value = Object.values(prices);
  const result = key.reduce((acc, k, index) => {
    acc[k] = calcPorcent(value[index], percentage);
    return acc;
  }, {});
  data.prices = result;
  return result;
}

const getAnimals = (animals, ids, key) => ids.map(id => animals.find(animal => animal[key] === id))
  .map(lista => lista.name);

const getResponseAnimal = (animal, employees) => {
  const result = employees.reduce((acumulator, previous) => {
    const name = `${previous.firstName} ${previous.lastName}`;
    acumulator[name] = getAnimals(animal, previous.responsibleFor, 'id');
    return acumulator;
  }, {});
  console.log(result);
  return result;
};

const getFind = (idOrName, animal, employees) => {
  const result = employees.reduce((acc, employee) => {
    const name = `${employee.firstName} ${employee.lastName}`;
    if (name.includes(idOrName) || employee.id === idOrName) {
      acc[name] = getAnimals(animal, employee.responsibleFor, 'id');
    }
    return acc;
  }, {});
  return result;
};

function employeeCoverage(idOrName) {
  // seu código aqui
  const { animals, employees } = data;
  if (idOrName === undefined) return getResponseAnimal(animals, employees);
  return getFind(idOrName, animals, employees);
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
