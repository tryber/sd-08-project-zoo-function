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
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(species => species.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const findEmployee = data.employees
    .find(parName => parName.firstName === employeeName || parName.lastName === employeeName);
  return employeeName ? findEmployee : {};
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const checkEmployeePosition = employees.filter(employee => employee.managers.includes(id));
  return checkEmployeePosition.length > 0;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    const emptyPar = {};
    animals.forEach(animal => (emptyPar[animal.name] = animal.residents.length));
    return emptyPar;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants)
    .reduce((acc, key) => (data.prices[key] * entrants[key]) + acc, 0);
}


function reduceList(listToBeReduce) {
  const list = listToBeReduce.reduce((newList, originalList) => {
    const keys = Object.keys(originalList);
    if (!newList[keys]) {
      newList[keys] = [originalList[keys]];
    } else {
      newList[keys].push(originalList[keys]);
    }
    return newList;
  }, {});
  return list;
}

function animalMap(options) {
  const { includeNames = false, sorted = false, sex } = options || {};
  const byLocations = animals.map(animal => ({ [animal.location]: animal.name }));
  let list = reduceList(byLocations);
  const animalsValuesByLocation = animals.map(animal => ({
    [animal.location]: { [animal.name]: animal.residents } }));
  if (includeNames) {
    list = reduceList(animalsValuesByLocation);
    const listOfRegions = Object.keys(list);
    listOfRegions.forEach(rg =>
      list[rg].forEach((spcs) => {
        const species = Object.keys(spcs)[0];
        if (sex) {
          spcs[species] = spcs[species]
            .filter(resident => resident.sex === sex)
            .map(animal => animal.name);
        } else {
          spcs[species] = spcs[species].map(name => name.name);
        }
        if (sorted) {
          spcs[species].sort();
        }
      }));
  }
  return list;
}

function schedule(dayName) {
  const openHourSchedule = {};
  Object.keys(hours).forEach((day) => {
    const { open, close } = hours[day];
    if (day === 'Monday') {
      openHourSchedule[day] = 'CLOSED';
    } else {
      openHourSchedule[day] = `Open from ${open}am until ${close - 12}pm`;
    }
  });
  if (!dayName) return openHourSchedule;
  const specificDay = {};
  specificDay[dayName] = openHourSchedule[dayName];
  return specificDay;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  return Object.entries(data.prices).forEach(([age, price]) => {
    const fare = price * ((percentage / 100) + 1);
    data.prices[age] = Math.round(fare * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  const listOfCoverage = {};
  if (!idOrName) {
    data.employees.forEach((element) => {
      listOfCoverage[`${element.firstName} ${element.lastName}`] = element.responsibleFor.map(id =>
        animalsByIds(id)[0].name);
    });
  } else {
    const employee = data.employees.find(element =>
      element.lastName === idOrName ||
      element.firstName === idOrName ||
      element.id === idOrName,
    );
    const animal = employee.responsibleFor.map(id => animalsByIds(id)[0].name);
    listOfCoverage[`${employee.firstName} ${employee.lastName}`] = animal;
  }
  return listOfCoverage;
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
