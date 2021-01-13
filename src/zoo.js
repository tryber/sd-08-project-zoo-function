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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  const animalsArray = [];
  if (ids !== undefined) {
    ids.forEach((element) => {
      animalsArray.push(animals.find(animal => (animal.id === element)));
    });
  }
  return animalsArray;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const especie = animals.find(animalSpecies => animalSpecies.name === animal);
  const result = especie.residents.every(animalAge => animalAge.age >= age);
  return result;
}

function employeeByName(employeeName) {
  // seu código aqui
  let result = {};
  if (employeeName !== undefined) {
    result = employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = {};
  Object.assign(newEmployee, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const result = employees.some(manager => manager.managers.includes(id));
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  let count = {};
  if (species === undefined) {
    animals.forEach((specie) => {
      count[specie.name] = specie.residents.length;
    });
  } else {
    count = animals.find(specie => specie.name === species);
    count = count.residents.length;
  }
  return count;
}

function entryCalculator(entrants) {
  // seu código aqui
  return (!entrants) ? 0 : Object.keys(entrants).reduce((acc, curr) =>
  acc + (entrants[curr] * prices[curr]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const scheduleDay = Object.entries(hours).reduce((acc, [curr, value]) => {
    acc[curr] = value.close - value.open > 0 ? `Open from ${value.open}am until ${value.close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: scheduleDay[dayName] };
  return scheduleDay;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  let responsibleFor = '';
  const result = [];

  employees.find((employee) => {
    if (employee.id === id) {
      responsibleFor = employee.responsibleFor[0];
    }
    return responsibleFor;
  });
  const especie = animals.find(animal => animal.id === responsibleFor);
  const oldestAnimal = especie.residents.sort((animal1, animal2) => animal2.age - animal1.age);
  const { name, sex, age } = oldestAnimal[0];
  result.push(name);
  result.push(sex);
  result.push(age);
  return result;
}

function increasePrices(percentage) {
  // seu código aqui
  const calculator = ((percentage / 100) + 1);
  const result = Object.entries(prices).reduce((acc, [curr]) => {
    prices[curr] = Math.round(prices[curr] * 100 * calculator) / 100;
    return prices;
  }, {});
  return result;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  let result = {};
  function animalId (employee) {
    employee.responsibleFor.map((animalId) => {
      animals.map((animal) => {
        if ( animal.id === animalId) {
          result[`${employee.firstName} ${employee.lastName}`].push(animal.name);
        }
      });
    });
  }; 
  if (!idOrName) {
    employees.map((employee) => {
      result[`${employee.firstName} ${employee.lastName}`] = [];
      animalId(employee);
    });
  } else {
    employees.map((employee) => {
      if (employee.id === idOrName) {
        result[`${employee.firstName} ${employee.lastName}`] = [];
        animalId(employee);
      } else if (employee.firstName === idOrName) {
        result[`${employee.firstName} ${employee.lastName}`] = [];
        animalId(employee);
      } else if (employee.lastName === idOrName) {
        result[`${employee.firstName} ${employee.lastName}`] = [];
        animalId(employee);
      }
    });
  }
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
