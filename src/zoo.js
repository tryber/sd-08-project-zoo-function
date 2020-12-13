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
  if (ids === undefined) return [];
  const id = ids.map(animals => (data.animals.find(animal => animal.id.includes(animals))));
  return id;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const nargas = data.animals.find(elemt => elemt.name === animal);
  return nargas.residents.every(elemt => elemt.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  const funcionarios = data.employees
  .find(name => (name.firstName === employeeName || name.lastName === employeeName));
  return funcionarios;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newPerson = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newPerson;
}

function isManager(id) {
  // seu código aqui
  const verify = data.employees.map(name => name.managers);
  const verifyManagement = verify.some(name => name.includes(id));
  return verifyManagement;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newAddEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newAddEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species !== undefined) {
    const retorno = data.animals.find(name => name.name === species);
    return retorno.residents.length;
  }
  const animals = data.animals.reduce((name, value) => {
    name[value.name] = value.residents.length;
    return name;
  }, {});
  return animals;
}

function entryCalculator(entrants = {}) {
  // seu código aqui
  return Object.entries(entrants).reduce((totalPrice, [pessoa, valor]) => {
    totalPrice += data.prices[pessoa] * valor;
    return totalPrice;
  }, 0);
}

function animalsByRegion() {
  const regions = ['NE', 'NW', 'SE', 'SW'];
  return regions.reduce((acc, curr) => {
    acc[curr] = data.animals
      .filter(animal => animal.location === curr)
      .map(animal => animal.name);
    return acc;
  }, {});
}

function getAnimalsFromSpecies(specie, sex) {
  return sex ?
    data.animals
      .find(animal => animal.name === specie)
      .residents.filter(animal => animal.sex === sex)
      .map(animal => animal.name) :
    data.animals
      .find(animal => animal.name === specie)
      .residents.map(animal => animal.name);
}

function sortArray(array, sorted) {
  if (sorted) {
    array.sort();
  }
}

function animalsByRegionWithNames(sex, sorted) {
  const regions = ['NE', 'NW', 'SE', 'SW'];
  return regions.reduce((regionObj, nextRegion) => {
    regionObj[nextRegion] = data.animals
      .filter(animal => animal.location === nextRegion)
      .map(animal => animal.name)
      .map((animal) => {
        const objPerRegion = {};
        objPerRegion[animal] = getAnimalsFromSpecies(animal, sex);
        sortArray(objPerRegion[animal], sorted);
        return objPerRegion;
      });

    return regionObj;
  }, {});
}

function animalMap(options) {
  if (!options) {
    return animalsByRegion();
  }
  const { includeNames = false, sorted = false, sex = false } = options;
  const animals = includeNames ? animalsByRegionWithNames(sex, sorted) : animalsByRegion();
  return animals;
}

function createObjectSchedule(day) {
  const obj = {};
  let { open, close } = data.hours[day];
  open = open > 12 ? `${open - 12}pm` : `${open}am`;
  close = close > 12 ? `${close - 12}pm` : `${close}am`;
  obj[day] = (open === close) ? 'CLOSED' : `Open from ${open} until ${close}`;
  return obj;
}

function schedule(dayName) {
  const timeArray = Object.keys(data.hours).map(createObjectSchedule);

  return dayName ?
    timeArray.find(day => day[dayName]) :
    timeArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

function checkGreaterAge(acc, curr) {
  return acc.age > curr.age ? acc : curr;
}

function oldestFromFirstSpecies(id) {
  const speciesId = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const animalsFromSpecies = data.animals.find(animal => animal.id === speciesId);
  const { name, sex, age } = animalsFromSpecies.residents.reduce(checkGreaterAge);
  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = data.prices;
  data.prices = {
    Adult: (Math.ceil(((1 + (percentage / 100)) * Adult) * 100)) / 100,
    Child: (Math.ceil(((1 + (percentage / 100)) * Child) * 100)) / 100,
    Senior: (Math.ceil(((1 + (percentage / 100)) * Senior) * 100)) / 100,
  };
}

function findEmployee(idOrName) {
  return data.employees.find(
    employee => employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName,
  );
}

function getEmployeeAnimals(employee) {
  const animalArray = animalsByIds(...employee.responsibleFor);
  return animalArray.map(animal => animal.name);
}

function createSingleEmployee(employee) {
  const employeeAnimals = getEmployeeAnimals(employee);
  const name = `${employee.firstName} ${employee.lastName}`;
  const result = {};
  result[name] = employeeAnimals;
  return result;
}

function getAllEmployeesAnimals() {
  const result = data.employees.reduce((acc, curr) => {
    const employee = createSingleEmployee(curr);
    return { ...acc, ...employee };
  }, {});
  return result;
}

function employeeCoverage(idOrName) {
  const employee = findEmployee(idOrName);
  return employee ?
    createSingleEmployee(employee) :
    getAllEmployeesAnimals();
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
