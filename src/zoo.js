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
  const emptArr = [];
  ids.forEach(newId => emptArr.push(animals.find(animal => animal.id === newId)));
  return emptArr;
}

function animalsOlderThan(animal, age) {
  const species = animals.find(specie => specie.name === animal).residents
  .every(resident => resident.age > age);
  return species;
}

function employeeByName(employeeName = false) {
  let emptObj = {};
  if (!employeeName) return emptObj;
  emptObj = employees
  .find(info => info.firstName === employeeName || info.lastName === employeeName);
  return emptObj;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some(emp => emp.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species) {
    const animalSpecies = animals.find(animal => animal.name === species);
    const numberOfAnimals = animalSpecies.residents.length;
    return numberOfAnimals;
  }
  return animals.reduce((acc, value) => {
    acc[value.name] = value.residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const totalPpl = Object.keys(entrants);
  const totalPrice = totalPpl.reduce((acc, value) => acc + (prices[value] * entrants[value]), 0);
  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const objHours = {};
  const totalDay = Object.keys(hours);
  totalDay.forEach((days) => {
    objHours[days] = `Open from ${hours[days].open}am until ${hours[days].close - 12}pm`;
    if (hours[days].open === hours[days].close) {
      objHours[days] = 'CLOSED';
    }
  });
  if (dayName === undefined) return objHours;
  return { [dayName]: objHours[dayName] };
}

function oldestFromFirstSpecies(id) {
  const { responsibleFor: animalId } = employees
  .find(({ id: idEmp }) => id === idEmp);
  const animal = animalId[0];
  const { residents: list } = animalsByIds(animal)[0];
  list.sort((a, b) => b.age - a.age);
  const { name, sex, age } = list[0];
  return [name, sex, age];
}
// ids.forEach(newId => emptArr.push(animals.find(animal => animal.id === newId)));

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
