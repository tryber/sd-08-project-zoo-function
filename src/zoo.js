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
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animalName, age) {
  return data.animals
    .filter(animal => animal.name === animalName)
    .every(animal => animal.residents.every((resident => resident.age > age)));
}

function employeeByName(employeeName) {
  return data.employees.find(employee => employee.firstName === employeeName ||
    employee.lastName === employeeName) || {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return ({ id, firstName, lastName, managers, responsibleFor });
}

function isManager(id) {
  return data.employees.reduce((acc, val) => acc.concat(val.managers), [])
    .some(val => val === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (typeof species === 'undefined') {
    return data.animals.reduce((acc, val) => {
      acc[val.name] = val.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(specie => specie.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'object') {
    return Object.keys(entrants).reduce((acc, val) => acc + (entrants[val] * data.prices[val]), 0);
  }
  return 0;
}

/*
function animalMap(options = {}) {
  const {includeNames, sorted, sex} = options;
  return data.animals.reduce((locations, animal) => (locations.includes(animal.location))
    ? locations : [...locations, animal.location], [])
      .reduce((finalObject, location) => {
        finalObject[location] = data.animals.filter(animal => animal.location === location)
          .reduce((finalArray, anima) => [...finalArray, ((includeNames) ?
            ({[anima.name]: ((st, sx, rs, rsn, rsx, stf, mpf, ftf) =>
              ((st) ? ((sx) ? (rs[ftf](rsx)[mpf](rsn)[stf]()) :
                (rs[mpf](rsn)[stf]())) : (sx) ? (rs[ftf](rsx)[mpf](rsn))
                  : (rs[mpf](rsn))))
                    (sorted, sex, anima.residents, resident => resident.name,
                      resident => resident.sex === sex, 'sort', 'map', 'filter')}) :
                anima.name)], []);
        return finalObject;
      }, {});
}
*/

const dummyArray = Array;

const dummyObject = Object;

dummyArray.prototype.merge = function (source) {
  source.forEach((element) => {
    if (!this.includes(element)) this.push(element);
  });
  return this;
};

dummyObject.prototype.deepMerge = function (source) {
  if (Array.isArray(this)) {
    this.merge(source);
    return this;
  }
  Object.entries(source).forEach(([key, value]) => {
    if (typeof this[key] === 'object') {
      this[key].deepMerge(value);
    } else {
      this[key] = value;
    }
  });
  return this;
};

dummyObject.prototype.transformIf = function (condition, lambda) {
  if (condition) {
    return lambda(this);
  }
  return this;
};

function animalMap(opts) {
  opts = opts || {};
  const { includeNames, sex, sorted } = opts;
  return data.animals.reduce((acc, animal) =>
    acc.deepMerge({
      [animal.location]: [
        animal
        .transformIf(includeNames,
          animalObj =>
          ({ [animalObj.name]:
              animalObj.residents
              .transformIf(sex, residents => residents.filter(resident => resident.sex === sex))
              .transformIf(true, residents => residents.map(resident => resident.name))
              .transformIf(sorted, residents => residents.sort()) }))
        .transformIf(!includeNames, animalObj => animalObj.name),
      ] })
  , {});
}

/*
Object.prototype.transformIf = function (condition,
  [successFn, successArgs], [failFn, failArgs]) {
  return (condition) ? this[successFn](successArgs) : this[failFn](failArgs);
}
*/

/*
function animalMap(options = {}) {
  const { includeNames, sex, sorted } = options;
  return data.animals.reduce((acc, animal) =>
    deepMerge(acc,
      ({
        [animal.location]: [
        animal.transformIf(includeNames,
          ['justDoIt', animal => ({
            [animal.name]:
            animal.residents
              .transformIf(sex,
                ['filter', resident => resident.sex == sex],
                ['doNothing', undefined])
                  .map(resident => resident.name)
                  .transformIf(sorted,
                    ['sort', undefined],
                    ['doNothing', undefined])
          })],
          ['justDoIt', animal => animal.name]) ]
      }))
    , {});
}*/

/*
function animalMap(opt) {
  const options = {
    includeNames: false,
    sorted: false,
    sex: '',
  };
  Object.assign(options, opt);
  return data.animals
    .reduce(
      (locations, animal) =>
      (locations.includes(animal.location) ? locations : [...locations, animal.location]),
      [],
    )
    .reduce((finalObject, location) => {
      finalObject[location] = data.animals
        .filter(animal => animal.location === location)
        .reduce(
          (finalArray, animal) => [
            ...finalArray,
            options.includeNames
              ? {
                [animal.name]: animal.residents.map(resident => resident.name),
              }
              : animal.name,
          ],
          [],
        );
      return finalObject;
    }, {});
}
*/

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
