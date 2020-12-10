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
  const returnArray = [];
  if (ids.length === 0) {
    const empytArray = [];
    return empytArray;
  } else if (ids.length > 0) {
    const passedIds = ids;
    const findId = (id) => {
      const timeId = id;
      animals.forEach((obj) => {
        if (timeId === obj.id) {
          returnArray.push(obj);
        }
      });
    };
    passedIds.forEach(findId);
  }
  return returnArray;
}

function animalsOlderThan(animal, age) {
  let retorno = true;
  const passedAge = age;
  animals.forEach((obj) => {
    if (animal === obj.name) {
      const entries = obj.residents;
      entries.forEach((objEntries) => {
        if (objEntries.age < passedAge) {
          retorno = false;
        }
      });
    }
  });
  return retorno;
}

function employeeByName(employeeName) {
  let employee = {};
  if (employeeName === undefined) {
    return {};
  }
  employees.forEach((obj) => {
    if (obj.firstName === employeeName || obj.lastName === employeeName) {
      employee = obj;
    }
  });
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id, firstName: personalInfo.firstName, lastName: personalInfo.lastName };
  newEmployee.managers = associatedWith.managers;
  newEmployee.responsibleFor = associatedWith.responsibleFor;
  employees.push(newEmployee);
  return newEmployee;
}

function isManager(id) {
  let found;
  let retorno = false;
  employees.forEach((obj) => {
    found = obj.managers.some(managerId => managerId === id);
    if (found === true) {
      retorno = true;
    }
  });
  return retorno;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const secondNewEmployee = {};
  secondNewEmployee.id = id; secondNewEmployee.firstName = firstName;
  secondNewEmployee.lastName = lastName;
  secondNewEmployee.responsibleFor = [];
  if (responsibleFor !== undefined) {
    secondNewEmployee.responsibleFor = responsibleFor;
  }
  if (managers !== undefined) {
    secondNewEmployee.managers = managers;
  }
  employees.push(secondNewEmployee);
}

function animalCount(species) {
  const objRetorno = {};
  let specieSize = 0;
  if (species === undefined) {
    animals.forEach((objAnimals) => {
      const animalName = objAnimals.name;
      objRetorno[animalName] = objAnimals.residents.length;
    });
  } else if (species !== undefined) {
    animals.forEach((objAnimals) => {
      if (objAnimals.name === species) {
        specieSize = objAnimals.residents.length;
      }
    });
  }
  return specieSize > 0 ? specieSize : objRetorno;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  let price = 0;
  if (entrants.Adult !== undefined) {
    price += prices.Adult * entrants.Adult;
  }
  if (entrants.Senior !== undefined) {
    price += prices.Senior * entrants.Senior;
  }
  if (entrants.Child !== undefined) {
    price += prices.Child * entrants.Child;
  }
  return price;
}
// Funções para solução do requisito 9 -------------------------------------->

function makePerRegion(arrayObj) {
  animals.forEach((objAnimals) => {
    const { name, location } = objAnimals;
    arrayObj[location].push(name);
  });
  return arrayObj;
}

function makeIncludeNames(arrayObj) {
  animals.forEach((objAnimals) => {
    const { name, location, residents } = objAnimals;
    const object = {};
    const arrayResidentsName = [];
    residents.forEach((objResident) => {
      arrayResidentsName.push(objResident.name);
    });
    object[name] = arrayResidentsName;
    arrayObj[location].push(object);
  });
  return arrayObj;
}

function filterSex(arrayObj, sex) {
  animals.forEach((objAnimals) => {
    const { name, location, residents } = objAnimals;
    const animalFilter = residents.filter(animal => animal.sex === sex);
    const newObj = {};
    const arrayAnimals = [];
    animalFilter.forEach((obj) => { arrayAnimals.push(obj.name); });
    newObj[name] = arrayAnimals;
    arrayObj[location].push(newObj);
  });
  return arrayObj;
}

function sortedArrays(objToSort) {
  const keys = Object.keys(objToSort);
  keys.forEach((location) => {
    objToSort[location].forEach((obj) => {
      const values = Object.keys(obj);
      obj[values].sort();
    });
  });
  return objToSort;
}

function animalMap(options) {
  let locationObj = { NE: [], NW: [], SE: [], SW: [] };
  let objToReturn;
  let objToReturnSorted;
  let objSex;
  objToReturn = makePerRegion(locationObj);
  if (!options) {
    return objToReturn;
  }
  const { includeNames, sex, sorted } = options;
  if (includeNames === true && !sex) {
    locationObj = { NE: [], NW: [], SE: [], SW: [] };
    objToReturn = makeIncludeNames(locationObj);
  }
  if (sex !== undefined && includeNames === true) {
    locationObj = { NE: [], NW: [], SE: [], SW: [] };
    objSex = filterSex(locationObj, sex);
    objToReturn = objSex;
  }
  if (sorted === true && includeNames === true) {
    objToReturnSorted = sortedArrays(objToReturn);
    objToReturn = objToReturnSorted;
  }
  return objToReturn;
}

function schedule(dayName) {
  const objReturn = {};
  const entries = Object.entries(hours);
  entries.forEach((obj) => {
    if (obj[0] === 'Monday') {
      objReturn[obj[0]] = 'CLOSED';
    } else {
      objReturn[obj[0]] = `Open from ${obj[1].open}am until ${(obj[1].close) - 12}pm`;
    }
  });
  let returnValue;
  if (dayName === undefined) {
    returnValue = objReturn;
  } else if (dayName !== undefined) {
    const newObj = {};
    newObj[dayName] = objReturn[dayName];
    returnValue = newObj;
  }
  return returnValue;
}

function oldestFromFirstSpecies(id) {
  const employ = employees.find(objt => objt.id === id);
  const animalId = employ.responsibleFor[0];
  const objtAnimal = animals.find(objts => objts.id === animalId);
  const { residents } = objtAnimal;
  let olderAnimal = { age: 0 };
  residents.forEach((obj) => {
    if (obj.age > olderAnimal.age) {
      olderAnimal = obj;
    }
  });
  return [olderAnimal.name, olderAnimal.sex, olderAnimal.age];
}

function increasePrices(percentage) {
  const adult = prices.Adult + (prices.Adult * (percentage / 100));
  const senior = prices.Senior + (prices.Senior * (percentage / 100));
  const child = prices.Child + (prices.Child * (percentage / 100));
  prices.Adult = Math.round(adult * 100) / 100;
  prices.Senior = Math.round(senior * 100) / 100;
  prices.Child = Math.round(child * 100) / 100;
  return prices;
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
