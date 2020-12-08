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
  const result = [];
  if (ids.length === 0) return result;
  const findById = param => animals.find(animal => animal.id === param);
  ids.forEach(param => result.push(findById(param)));
  return result;
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(element => element.name === animal);
  return findAnimal.residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(employee => employee.firstName === employeeName ||
    employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const searchManager = employees.find(element => element.managers.includes(id));
  if (searchManager === undefined) return false;
  return true;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {};
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const animalsAndNumbers = {};
    animals.forEach((animal) => {
      animalsAndNumbers[animal.name] = animal.residents.length;
    });
    return animalsAndNumbers;
  }
  const animalBySpecie = animals.find(animal => animal.name === species);
  return animalBySpecie.residents.length;
}

function entryCalculator(entrants) {
  let needToBePayed = 0;
  if (entrants === undefined || Object.keys(entrants).length === 0) return needToBePayed;

  const keys = Object.keys(entrants);
  keys.forEach((key) => {
    if (key === 'Adult') {
      needToBePayed += parseFloat(entrants[key] * 49.99);
    }
    if (key === 'Child') {
      needToBePayed += parseFloat(entrants[key] * 20.99);
    }
    if (key === 'Senior') {
      needToBePayed += parseFloat(entrants[key] * 24.99);
    }
  });
  return needToBePayed;
}

function sortedTrue(options, residentsNames) {
  Object.keys(options).forEach((key) => {
    if (key === 'sorted' && options[key] === true) {
      residentsNames.sort();
    }
  });
}

function includeNamesTrue(newLocation, result, options) {
  Object.keys(result).forEach((location) => {
    newLocation = [];
    result[location].forEach((animal) => {
      const newObj = {};
      let residentsNames = [];
      const animalFilter = animals.filter(element => element.name === animal);
      animalFilter[0].residents.forEach(element => residentsNames.push(element.name));
      Object.keys(options).forEach((key) => {
        if (key === 'sex') {
          residentsNames = [];
          const filtered = animalFilter[0].residents.filter(element =>
            element.sex === options[key]);
          filtered.forEach(element => residentsNames.push(element.name));
        }
      });
      sortedTrue(options, residentsNames);
      newObj[animal] = residentsNames;
      newLocation.push(newObj);
    });
    result[location] = newLocation;
  });
}

function animalMap(options) {
  const result = {};
  animals.forEach((animal) => {
    result[animal.location] = [];
    return result;
  });
  animals.forEach(animal => result[animal.location].push(animal.name));
  if (options === undefined) return result;

  const newLocation = [];
  Object.keys(options).forEach((key) => {
    if (key === 'includeNames' && options[key] === true) {
      includeNamesTrue(newLocation, result, options);
    }
  });
  return result;
}

function schedule(dayName) {
  const answer = {};
  if (dayName === undefined) {
    Object.keys(hours).forEach((key) => {
      if (key === 'Monday') {
        answer[key] = 'CLOSED';
      } else {
        answer[key] = `Open from ${hours[key].open}am until ${hours[key].close - 12}pm`;
      }
    });
    return answer;
  }
  if (dayName === 'Monday') {
    answer[dayName] = 'CLOSED';
    return answer;
  }
  answer[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  return answer;
}

function oldestFromFirstSpecies(id) {
  const findEmployeeById = employees.find(employee => employee.id === id);
  const animalId = findEmployeeById.responsibleFor[0];
  const findAnimalById = animals.find(animal => animal.id === animalId);
  const animalsResidents = findAnimalById.residents;
  animalsResidents.sort((a, b) => b.age - a.age);
  return [animalsResidents[0].name, animalsResidents[0].sex, animalsResidents[0].age];
}

function increasePrices(percentage) {
  const multiplier = 1 + (percentage / 100);
  Object.keys(prices).forEach((key) => {
    let increase = prices[key];
    increase = Math.round(increase * multiplier * 100) / 100;
    prices[key] = increase;
  });
}

const getAnimalsId = (animalCoveredIds, animalCoveredNames) => {
  animalCoveredIds.forEach((animalId) => {
    const animalCoveredInfos = animals.find(animal => animal.id === animalId);
    animalCoveredNames.push(animalCoveredInfos.name);
  });
};

function employeeCoverage(idOrName) {
  let employeeFullName = '';
  let animalCoveredNames = [];
  if (idOrName === undefined) {
    const noParam = {};
    employees.forEach((employee) => {
      animalCoveredNames = [];
      employeeFullName = `${employee.firstName} ${employee.lastName}`;
      const animalCoveredIds = employee.responsibleFor;
      animalCoveredIds.forEach((animalId) => {
        const animalCoveredInfos = animals.find(animal => animal.id === animalId);
        animalCoveredNames.push(animalCoveredInfos.name);
        noParam[employeeFullName] = animalCoveredNames;
      });
    });
    return noParam;
  }
  const employeeByIdOrName = employees.find(employee => employee.id === idOrName ||
  employee.firstName === idOrName || employee.lastName === idOrName);
  employeeFullName = `${employeeByIdOrName.firstName} ${employeeByIdOrName.lastName}`;
  const animalCoveredIds = employeeByIdOrName.responsibleFor;
  getAnimalsId(animalCoveredIds, animalCoveredNames);
  return { [employeeFullName]: animalCoveredNames };
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
