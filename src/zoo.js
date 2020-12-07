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
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor };
  employees.push(newEmployee);
  return newEmployee;
}

function isManager(id) {
  let cont = 0;
  let retorno;
  employees.forEach((obj) => {
    const found = obj.managers.find(managerId => managerId === id);
    if (found !== undefined) {
      cont += 1;
    }
  });
  if (cont > 0) {
    retorno = true;
  } else {
    retorno = false;
  }
  return retorno;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const secondNewEmployee = {};
  secondNewEmployee.id = id;
  secondNewEmployee.firstName = firstName;
  secondNewEmployee.lastName = lastName;
  if (managers === undefined) {
    secondNewEmployee.managers = [];
  } else {
    secondNewEmployee.managers = managers;
  }
  if (responsibleFor === undefined) {
    secondNewEmployee.responsibleFor = [];
  } else {
    secondNewEmployee.responsibleFor = responsibleFor;
  }
  employees.push(secondNewEmployee);
}

function animalCount(species) {
  const objRetorno = {};
  let specieSize = 0;
  if (species === undefined) {
    animals.forEach((objAnimals) => {
      const animalName = objAnimals.name;
      const animalsSize = objAnimals.residents.length;
      objRetorno[animalName] = animalsSize;
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
const locationObj = { NE: [], NW: [], SE: [], SW: [] };
function makePerRegion() {
  animals.forEach((objAnimals) => {
    const { name, location } = objAnimals;
    locationObj[location].push(name);
  });
  return locationObj;
}

function makeIncludeNames() {
  animals.forEach((objAnimals) => {
    const { name, location, residents } = objAnimals;
    const object = {};
    const arrayResidentsName = [];
    residents.forEach((objResident) => {
      arrayResidentsName.push(objResident.name);
    });
    object[name] = arrayResidentsName;
    locationObj[location].push(object);
  });
  return locationObj;
}

function filterSex(sex) {
  animals.forEach((objAnimals) => {
    const { name, location, residents } = objAnimals;
    const animalFilter = residents.filter(animal => animal.sex === sex);
    const newObj = {};
    const arrayAnimals = [];
    animalFilter.forEach((obj) => { arrayAnimals.push(obj.name); });
    newObj[name] = arrayAnimals;
    locationObj[location].push(newObj);
  });
  return locationObj;
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
  let objToReturn;
  let objToReturnSorted;
  let objSex;
  if (options === undefined) {
    return makePerRegion();
  }
  const { includeNames, sex, sorted } = options;
  if (includeNames === true && sex === undefined) {
    objToReturn = makeIncludeNames();
  }
  if (sex !== undefined && includeNames === true) {
    objSex = filterSex(sex);
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

console.log(schedule('Tuesday'));

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
