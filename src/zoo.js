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
  const animals = data.animals;
  const result = [];
  ids.forEach((id) => {
    animals.forEach((animal) => {
      if (animal.id === id) result.push(animal);
    });
  });
  return result;
}

function animalsOlderThan(animal, age) {
  const animals = data.animals;
  const animalObj = animals.find(animalGroup => animalGroup.name.match(animal));
  const ages = [];
  animalObj.residents.forEach(prop => ages.push(prop.age));
  const minAge = Math.min(...ages);
  if (minAge >= age) return true;
  return false;
}

function employeeByName(employeeName) {
  const employees = data.employees;
  if (employeeName === undefined) return {};
  return employees.find((employee) => {
    const { firstName, lastName } = employee;
    return employeeName === firstName || employeeName === lastName;
  });
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const employees = data.employees;
  const managerList = [];
  employees.forEach(employee => managerList.push(...employee.managers));
  return managerList.some(managerId => managerId === id);
}

function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  const employees = data.employees;
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const animals = data.animals;
  const result = {};
  animals.forEach((animal) => {
    result[`${animal.name}`] = animal.residents.length;
  });
  if (species === undefined) return result;
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const prices = data.prices;
  const entrantsArray = Object.entries(entrants);
  let total = 0;
  entrantsArray.forEach((entrant) => {
    total += entrant[1] * prices[`${entrant[0]}`];
  });
  return parseFloat(total.toFixed(2));
}

function animalMap(options) {
  const optionsList = { ...options };
  const { includeNames, sex, sorted } = optionsList;
  let result = {};
  if (options === undefined || !includeNames) {
    return returnDefault();
  }
  if (includeNames && sex !== undefined) result = returnBySex(sex);
  else result = returnByNames();
  if (sorted) {
    Object.keys(result).forEach(key =>
      result[key].forEach(value => value[Object.keys(value)].sort()),
    );
  }
}

function schedule(dayName) {
  const hours = Object.entries(data.hours);
  const scheduleWeek = {};
  hours.forEach((day) => {
    if (day[1].open === 0) {
      scheduleWeek[`${day[0]}`] = 'CLOSED';
    } else {
      scheduleWeek[`${day[0]}`] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    }
  });
  if (dayName === undefined) return scheduleWeek;
  const dayInfo = Object.entries(scheduleWeek).find(day => day[0] === dayName);
  const scheduleDay = {};
  scheduleDay[`${dayInfo[0]}`] = dayInfo[1];
  return scheduleDay;
}

function oldestFromFirstSpecies(id) {
  const { animals, employees } = data;
  const employeeFromId = employees.find(employee => employee.id === id);
  const { responsibleFor } = { ...employeeFromId };
  const firstAnimalGroup = animals.find(animal => animal.id === responsibleFor[0]);
  const result = [];
  const ageOfOldest = firstAnimalGroup.residents.reduce((acc, curr) => {
    if (curr.age > acc) acc = curr.age;
    return acc;
  }, 0);
  firstAnimalGroup.residents.forEach((animal) => {
    if (animal.age === ageOfOldest) result.push(animal.name, animal.sex, animal.age);
  });
  return result;
}

function increasePrices(percentage) {
  const prices = Object.entries(data.prices);
  const percent = (percentage / 100) + 1;
  prices.forEach((price) => {
    data.prices[`${price[0]}`] = Math.round((price[1] * percent) * 100) / 100;
  });
  return data.prices;
}

function employeeCoverage(idOrName) {
  const { employees, animals } = data;
  const idToName = respTo => respTo.map(id => animals.find(animal => animal.id === id).name);
  const allEmployesInfo = {};
  employees.forEach((employee) => {
    const { firstName, lastName } = employee;
    allEmployesInfo[`${firstName} ${lastName}`] = idToName(employee.responsibleFor);
  });
  if (idOrName === undefined) return allEmployesInfo;
  const employeeMatch = employees.filter((employee) => {
    const { id, firstName, lastName } = employee;
    return (id === idOrName || firstName === idOrName || lastName === idOrName);
  });
  const result = {};
  const { firstName, lastName } = employeeMatch[0];
  result[`${firstName} ${lastName}`] = idToName(employeeMatch[0].responsibleFor);
  return result;
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
