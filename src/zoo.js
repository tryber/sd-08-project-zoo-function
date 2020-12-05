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
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const idadeMinima = animals
  .find(({ name }) => (name === animal))
  .residents.every(animalAge => animalAge.age >= age);

  return idadeMinima;
}

function employeeByName(employeeName) {
  // seu código aqui
  return !employeeName ? {} : employees
  .filter(({ firstName, lastName }) =>
  employeeName.includes(firstName) || employeeName.includes(lastName))[0];
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.filter(idManager => idManager.managers[0] === id)
  .some(isTrue => isTrue.managers);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species = 'all') {
  // seu código aqui
  const countAll = Object.fromEntries(animals
  .map(({ name, residents }) => [name, residents.length]));
  species = species === 'all' ? countAll :
  animals.filter(especie => especie.name === species)[0].residents.length;
  return species;
}

function entryCalculator(entrants) {
  // seu código aqui
  return !entrants || Object.keys(entrants).length === 0 ? 0 : Object.keys(entrants)
    .reduce((acc, curr) => acc +
    (entrants[curr] * prices[curr]), 0);
}

const popularObj = (locations) => {
  const obj = {};
  locations.forEach((location) => {
    obj[location] = animals.filter(lo => lo.location === location)
    .map(animal => animal.name);
  });
  return obj;
};

const porpularObjIncludes = (locations, sorted, sex) => {
  const obj = {};
  locations.forEach((lo) => {
    const name =
      animals
    .filter(local => local.location === lo)
      .map((animal) => {
        const imprimeChaveNome = animal.name;
        const imprimeValorNome = animal.residents
        .filter((residentFil) => {
          const ambigousSex = sex;
          return ambigousSex ? residentFil.sex === sex : 1;
        })
        .map(resident => resident.name);
        if (sorted) imprimeValorNome.sort();
        return { [imprimeChaveNome]: imprimeValorNome };
      });
    obj[lo] = name;
  });
  return obj;
};

function animalMap(options) {
  // seu código aqui
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return popularObj(locations);
  const { includeNames, sorted, sex } = options;
  if (includeNames === true) return porpularObjIncludes(locations, sorted, sex);
  return popularObj(locations);
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const colaboradorResponsable = employees.find(idU => idU.id === id).responsibleFor[0];
  const animalResponsable = animals.find(ids => ids.id === colaboradorResponsable).residents;
  const moreOld = animalResponsable.sort((a, b) => (b.age - a.age)).find(old => old);
  return Object.values(moreOld);
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
