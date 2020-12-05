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
  const filtered = [];
  ids.forEach(idE => filtered.push(animals.find(an => an.id === idE)));
  return filtered;
}

function animalsOlderThan(animal, ageTest) {
  const animalChoosen = animals.find(anim => anim.name === animal);
  const ages = [];
  animalChoosen.residents.forEach(element => ages.push(element.age));
  return ages.every(ag => ag > ageTest);
}

function employeeByName(eName = '') {
  let employee = {};
  if (eName.length === 0) {
    return employee;
  }
  employee = employees.find(emp => emp.firstName === eName || emp.lastName === eName);
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEm = { ...personalInfo, ...associatedWith };
  return newEm;
}

function isManager(id) {
  let test = false;
  employees.forEach((emp) => {
    const managersId = emp.managers;
    if (managersId.some(ele => ele === id) === true) {
      test = true;
    }
  });
  return test;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEm = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEm);
  return employees;
}

function animalCount(species = 'all') {
  let anCount = 0;
  if (species === 'all') {
    anCount = animals.reduce((acc, anim) => {
      acc[anim.name] = anim.residents.length;
      return acc;
    }, {});
  } else {
    anCount = animals.find(anim => anim.name === species).residents.length;
  }
  return anCount;
}

function entryCalculator(entrants = {}) {
  let cTotal = 0;
  const keys = Object.keys(entrants);
  const val = Object.values(entrants);
  if (keys.length === 0) {
    return cTotal;
  }
  const keysP = Object.keys(prices);
  const valP = Object.values(prices);
  keys.forEach((ele, ind) => {
    for (let index = 0; index < keysP.length; index += 1) {
      if (ele === keysP[index]) {
        cTotal += (val[ind] * valP[index]);
      }
    }
  });
  return cTotal;
}

function animalMap(options = { includeNames: false, sorted: false, sex: '' }) {
  const { includeNames, sorted, sex } = options;
  const aMap = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  const aMapKeys = Object.keys(aMap);
  animals.forEach((anim) => {
    aMapKeys.forEach((loc) => {
      if (anim.location === loc) {
        aMap[loc].push(anim.name);
      }
    });
  });
  if (includeNames === true) {
    aMapKeys.forEach((loc) => {
      const anComNomes = aMap[loc].map((element) => {
        const residentes = animals.find(anim => anim.name === element).residents;
        const resName = [];
        residentes.forEach((resid) => {
          if (sex !== undefined) {
            if (resid.sex === sex) {
              resName.push(resid.name);
            }
          } else {
            resName.push(resid.name);
          }
        });
        if (sorted === true) {
          return { [element]: resName.sort() };
        }
        return { [element]: resName };
      });
      aMap[loc] = anComNomes;
    });
  }
  return aMap;
}

function schedule(dayName) {
  const days = Object.keys(hours);
  const diaCorreto = days.find(element => element === dayName);
  if (diaCorreto === true) {
    const { open, close } = hours[dayName];
    if (open > 0) {
      return { [dayName]: `Open from ${open}am until ${close - 12}pm` };
    }
    return { [dayName]: 'CLOSED' };
  }
  const horario = days.reduce((acc, cElement) => {
    const { open, close } = hours[cElement];
    if (open > 0) {
      acc[cElement] = `Open from ${open}am until ${close - 12}pm`;
    } else {
      acc[cElement] = 'CLOSED';
    }
    return acc;
  }, {});
  return horario;
}

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
