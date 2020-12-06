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
  const values = [];
  ids.forEach((element) => {
    values.push(animals.find(animal => animal.id === element));
  });
  return values;
}

function animalsOlderThan(animal, age) {
  let result;
  animals.filter((element) => {
    if (element.name === animal) {
      result = element.residents.every(elem => elem.age >= age);
    }
    return result;
  });
  return result;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(elem => elem.firstName === employeeName || elem.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  let result = [];
  employees.forEach((elem) => {
    result.push(elem.managers);
    result = result.flat(Infinity);
  });
  return result.some(num => num === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(obj);
}

function animalCount(species) {
  let value;
  const obj = {};
  if (species === undefined) {
    animals.forEach((elem) => {
      obj[elem.name] = elem.residents.length;
    });
    return obj;
  }
  animals.find((elem) => {
    if (elem.name === species) {
      value = elem.residents.length;
    }
    return value;
  });
  return value;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce(
    (acc, value) => acc + (prices[value] * entrants[value]), 0);
}

function groupBy(array, prop, sex, sorted) {
  const value = array.reduce((total, item) => {
    const key = prop;
    total[key] = (total[key] || []).concat([]);
    if (item.sex === sex || sex === '') {
      total[key] = (total[key] || []).concat(item.name);
    }
    if (sorted === true) {
      total[key].sort();
    }
    return total;
  }, {});
  return value;
}

function getKeys(obj) {
  return Object.keys(obj).reduce((all, key) => {
    all.push(key);
    return all;
  }, []);
}

function animalsRegions() {
  const NE = animals.filter(value => value.location === 'NE').map(animal => animal.name);
  const NW = animals.filter(value => value.location === 'NW').map(animal => animal.name);
  const SE = animals.filter(value => value.location === 'SE').map(animal => animal.name);
  const SW = animals.filter(value => value.location === 'SW').map(animal => animal.name);
  const list = {
    NE,
    NW,
    SE,
    SW,
  };
  return list;
}

function animalMap(options) {
  const { includeNames = false, sorted = false, sex = '' } = options || {};
  const obj = {};
  let objout = {};
  let outPut = {};
  const list = animalsRegions();
  const regions = (getKeys(list));
  regions.forEach((region) => {
    const animalNames = [];
    animals.forEach((elem1) => {
      if (elem1.location === region) {
        const { residents } = elem1;
        animalNames.push(groupBy(residents, elem1.name, sex, sorted));
      }
      obj[region] = animalNames;
    });
    objout = Object.assign({}, obj);
  });
  if (includeNames === true) {
    outPut = objout;
  }
  if (options === undefined || includeNames === false) {
    outPut = list;
  }
  return outPut;
}

function open(elem) {
  return { [elem]: `Open from ${hours[elem].open}am until ${hours[elem].close - 12}pm` };
}

function schedule(dayName) {
  let obj = {};
  let obj2 = {};
  Object.keys(hours).find((elem) => {
    if (dayName === 'Monday') {
      obj = { [dayName]: 'CLOSED' };
    } else {
      obj = open(elem);
    }
    return obj;
  });
  if (dayName === undefined) {
    Object.keys(hours).forEach((elem) => {
      if (elem === 'Monday') {
        obj2 = { [elem]: 'CLOSED' };
      } else {
        obj2 = open(elem);
      }
      Object.assign(obj, obj2);
    });
  }
  return obj;
}

function oldestFromFirstSpecies(id) {
  const result = employees.find(elem => elem.id === id);
  const resultAnimal = animals.find(elem => result.responsibleFor[0] === elem.id);
  const oldest = resultAnimal.residents.map(elem => elem.age).sort((b, a) => a - b);
  return Object.values(resultAnimal.residents.find(elem => elem.age === oldest[0]));
}

function increasePrices(percentage) {
  let value = 0;
  const result = Object.values(prices).map((elem) => {
    value = elem + (elem * (percentage / 100));
    value = Math.round(value * 100) / 100;
    return value;
  });
  Object.keys(prices).forEach((elem, index) => {
    prices[elem] = result[index];
  });
  return data.prices;
}

function animalsIds(array) {
  return array.map(element => animals.find(animal => animal.id === element).name);
}

function employeeCoverage(idOrName) {
  const fullName = [];
  const obj = {};
  const animal = [];
  let value;
  const obj2 = {};
  const firstName = employees.map(elem => elem.firstName);
  const lastName = employees.map(elem => elem.lastName);
  employees.forEach((elem) => {
    const { responsibleFor } = elem;
    animal.push(animalsIds(responsibleFor));
  });
  firstName.forEach((elem, index) => fullName.push(`${elem} ${lastName[index]}`));
  fullName.forEach((elem, index) => { obj[elem] = animal[index]; });
  if (idOrName === undefined) return obj;
  if (typeof idOrName === 'string' && idOrName.length > 0) {
    employees.forEach((elem, index) => {
      if (elem.firstName === idOrName || elem.lastName === idOrName || elem.id === idOrName) {
        value = index;
      }
    });
    obj2[Object.entries(obj)[value][0]] = Object.entries(obj)[value][1];
    return obj2;
  }
  return obj;
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
