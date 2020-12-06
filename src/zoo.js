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
  if (ids === undefined) {
    return [];
  } else if (ids.length === 1) {
    return data.animals.filter(animal => animal.id === ids[0]);
  }
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const selectedAnimal = data.animals.find(
    animalName => animalName.name === animal,
  );
  const result = selectedAnimal.residents.reduce(
    (previousValue, currentValue) => {
      if (currentValue.age >= age) {
        return previousValue;
      }
      return false;
    },
    true,
  );
  return result;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  const result = {};
  Object.assign(result, personalInfo, associatedWith);
  return result;
}

function isManager(id) {
  let result = false;
  data.employees.forEach((employee) => {
    if (employee.managers.includes(id)) {
      result = true;
    }
  });
  return result;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    const returnObj = {};
    data.animals.forEach((animal) => {
      returnObj[animal.name] = animal.residents.length;
    });
    return returnObj;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce(
    (previousValue, currentValue) =>
      previousValue + (data.prices[currentValue] * entrants[currentValue]),
    0,
  );
}

function animalMap(options) {
  // seu código aqui
}

function isClosed(openTime, closeTime) {
  if (openTime === 0 && closeTime === 0) {
    return true;
  }
  return false;
}

function openAmPm(openTime) {
  return openTime > 11 ? `${openTime - 12}pm` : `${openTime}am`;
}

function closeAmPm(closeTime) {
  return closeTime > 11 ? `${closeTime - 12}pm` : `${closeTime}am`;
}

function sayTheTimeOpen(day) {
  const open = data.hours[day].open;
  const close = data.hours[day].close;
  let timeOpen = '';
  if (isClosed(open, close)) {
    timeOpen = 'CLOSED';
  } else {
    timeOpen = `Open from ${openAmPm(open)} until `;
    timeOpen += `${closeAmPm(close)}`;
  }
  return timeOpen;
}

function schedule(dayName) {
  const returnObj = {};
  if (dayName === undefined) {
    Object.keys(data.hours).forEach((day) => {
      const timeInString = sayTheTimeOpen(day);
      returnObj[day] = timeInString;
    });
    return returnObj;
  }
  returnObj[dayName] = sayTheTimeOpen(dayName);
  return returnObj;
}

console.log(schedule('Monday'));

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
