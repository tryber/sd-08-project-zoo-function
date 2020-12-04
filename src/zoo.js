/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]  
git status  
*/

const { prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return data.animals.filter((e) => ids.includes(e.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find((e) => e.name === animal).residents.every((e) => e.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined || employeeName.length === 0) return {};
  return data.employees.find((e) => e.firstName === employeeName || e.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.find((e) => e.id === id).managers.length === 0;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const answer = {};
    data.animals.forEach((e) => (answer[e.name] = e.residents.length));
    return answer;
  }
  return data.animals.find((e) => e.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return data.prices.Adult * Adult + data.prices.Senior * Senior + data.prices.Child * Child;
}

function animalsByRegionArray() {
  const locations = [...new Set(data.animals.map((e) => e.location))];
  const animalsByLocation = {};
  locations.forEach((region) => {
    const animalsNames = data.animals.filter((animal) => animal.location === region).map((animal) => animal.name);
    animalsByLocation[region] = animalsNames;
  });
  return animalsByLocation;
}

function grabAnimalsListName(animal, sex = '', sorted = false) {
  const animalObj = data.animals.find((element) => element.name === animal);
  const answer = animalObj.residents
    .filter((element) => {
      if (sex === 'male' || sex === 'female') return element.sex === sex;
      return element;
    })
    .map((element) => element.name);
  if (sorted) answer.sort();
  return answer;
}

function animalMap(options) {
  if (options === undefined || !options.hasOwnProperty('includeNames')) return animalsByRegionArray();
  const { sex = '', sorted = false } = options;
  const animalsByRegion = animalsByRegionArray();
  for (const region in animalsByRegion) {
    const arrayAnimals = animalsByRegion[region].map((element) => {
      const newObj = {};
      newObj[element] = grabAnimalsListName(element, sex, sorted);
      return newObj;
    });
    animalsByRegion[region] = arrayAnimals;
  }
  return animalsByRegion;
}

console.log(animalMap({ includeNames: true, sex: 'female', sorted: true }));

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
