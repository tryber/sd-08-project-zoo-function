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

const animals = data.animals;
const employees = data.employees;

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animalsGroup => animalsGroup.id === id));
}

function animalsOlderThan(animal, yearsOld) {
  const pickAnimal = animals.find(({ name }) => name === animal);
  return pickAnimal.residents.every(({ age }) => age >= yearsOld);
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return employees.find(({ firstName, lastName }) => {
    const verification = firstName === employeeName || lastName === employeeName;
    return verification;
  });
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(employeeId) {
  return employees.some(({ managers }) => managers.some(id => id === employeeId));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(specie) {
  if (typeof specie === 'undefined') {
    return animals.reduce((result, { name, residents }) => {
      result[name] = residents.length;
      return result;
    }, {});
  }
  return animals.find(({ name }) => name === specie).residents.length;
}

function entryCalculator(visitants = {}) {
  const visitantsTypes = Object.keys(visitants);
  if (visitantsTypes.length === 0) return 0;
  const visitantsNumbers = Object.values(visitants);
  const prices = data.prices;
  return visitantsTypes.reduce((sum, type, index) => {
    sum += prices[type] * visitantsNumbers[index];
    return sum;
  }, 0);
}

function pickName(...arrAndSex) {
  return arrAndSex[0].map(({ name }) => name);
}

function pickResidents(...arrAndSex) {
  const result = arrAndSex[0].map(({ name, residents }) => {
    const mapReturn = { [name]: pickName(residents) };
    return mapReturn;
  });
  return result;
}

function pickResidentsAndSort(...arrAndSex) {
  const result = arrAndSex[0].map(({ name, residents }) => {
    const mapReturn = { [name]: pickName(residents).sort() };
    return mapReturn;
  });
  return result;
}

function pickResidentsBySex(...arrAndSex) {
  const result = arrAndSex[0].map(({ name, residents }) => {
    const mapReturn = { [name]: pickName(residents.filter(({ sex }) => sex === arrAndSex[1])) };
    return mapReturn;
  });
  return result;
}

function pickResidentsBySexAndSort(...arrAndSex) {
  const result = arrAndSex[0].map(({ name, residents }) => {
    const mapReturn = { [name]: pickName(residents.filter(({ sex }) => sex === arrAndSex[1]))
    .sort() };
    return mapReturn;
  });
  return result;
}

function filterRegion(arr, region) {
  return arr.filter(({ location }) => location === region);
}

function chooseFunctionByOptions(includeNames, sorted, animalSex) {
  let chosen;
  if (!includeNames) return pickName;
  if (sorted && (animalSex !== undefined)) chosen = pickResidentsBySexAndSort;
  else if (sorted) chosen = pickResidentsAndSort;
  else if (animalSex !== undefined) chosen = pickResidentsBySex;
  else chosen = pickResidents;
  return chosen;
}

function animalMap(options = {}) {
  const { includeNames, sorted, sex: animalSex } = options;
  const regions = ['NE', 'NW', 'SE', 'SW'];
  const animalsPerRegion = regions.map(region => filterRegion(animals, region));
  const chosenFunction = chooseFunctionByOptions(includeNames, sorted, animalSex);
  const animalsMaped = regions.reduce((result, region, index) => {
    result[region] = chosenFunction(animalsPerRegion[index], animalSex);
    return result;
  }, {});
  return animalsMaped;
}

function transformInPhrase({ open, close }) {
  if (open === 0) return 'CLOSED';
  return `Open from ${open}am until ${close - 12}pm`;
}

function schedule(dayName) {
  const days = Object.keys(data.hours);
  const openClose = Object.values(data.hours);
  if (dayName !== undefined) {
    const dayIndex = days.indexOf(dayName);
    return { [dayName]: transformInPhrase(openClose[dayIndex]) };
  }
  return days.reduce((result, day, index) => {
    result[day] = transformInPhrase(openClose[index]);
    return result;
  }, {});
}
console.log(schedule());
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
