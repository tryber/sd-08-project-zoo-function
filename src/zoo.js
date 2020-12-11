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

const { animals, employees, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return (ids = []);
  }

  return ids.map(eachId => animals.find(animal => animal.id === eachId));
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(element => element.name === animal);
  return findAnimal.residents.every(elem => elem.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return (employeeName = {});
  }

  return employees.find(
    eachName =>
      eachName.firstName === employeeName || eachName.lastName === employeeName,
  );
}


function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(eachEmployee => eachEmployee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = { id, firstName, lastName, managers, responsibleFor };
  if (!managers === undefined) {
    obj.managers.push(managers);
    obj.responsibleFor.push(responsibleFor);
  }
  employees.push(obj);
}

function animalCount(species) {
  let animais = {};
  animals.forEach((eachOne) => {
    if (!species) {
      return (animais[eachOne.name] = eachOne.residents.length);
    }
    animais = animals.find(each => species === each.name).residents.length;
    return null;
  });
  return animais;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const obj = Object.entries(entrants);

  return obj.reduce((acc, current) => {
    if (current[0] === 'Adult') {
      acc += current[1] * 49.99;
    } else if (current[0] === 'Senior') {
      acc += current[1] * 24.99;
    } else if (current[0] === 'Child') {
      acc += current[1] * 20.99;
    }
    return acc;
  }, 0);
}

function animalMap(options) {
  const obj = { NE: [], NW: [], SE: [], SW: [] };
  if (!options || !options.includeNames) {
    animals.forEach(each => obj[each.location].push(each.name));
  } else if (options.includeNames) {
    animals.forEach((each) => {
      const residents = {};

      if (options.sex) {
        residents[each.name] = each.residents
          .filter(eachResident => eachResident.sex === options.sex)
          .map(eachMap => eachMap.name);
      } else {
        residents[each.name] = each.residents
          .map(eachResident => eachResident.name);
      }

      if (options.sorted === true) {
        residents[each.name].sort();
      }
      obj[each.location].push(residents);
    });
  }
  return obj;
}

function schedule(dayName) {
  const hoursArray = Object.entries(hours);
  const obj = {};
  if (!dayName) {
    hoursArray.map((each) => {
      if (each[0] === 'Monday') obj[each[0]] = 'CLOSED';
      else {
        obj[each[0]] = `Open from ${each[1].open}am until ${
          each[1].close - 12
        }pm`;
      }
      return null;
    });
  } else if (dayName) {
    if (dayName === 'Monday') {
      obj[dayName] = 'CLOSED';
    } else if (dayName !== 'Monday') {
      hoursArray.find(
        each =>
          (obj[dayName] = `Open from ${each[1].open}am until ${
            each[1].close - 12
          }pm`),
      );
    }
  }
  return obj;
}

function oldestFromFirstSpecies(id) {
  const specieFind = employees.find(each => each.id === id).responsibleFor[0];

  const residentsFind = animals.find(each => each.id === specieFind).residents;

  const ageMax = residentsFind.reduce((acc, current) => Math.max(acc, current.age), 0);

  const obj = Object.values(residentsFind.find(each => each.age === ageMax));

  return obj;
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
