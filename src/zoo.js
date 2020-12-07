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
  if (typeof ids[0] !== 'string') { return []; }
  return data.animals.filter(animal => animal.id === ids[0] || animal.id === ids[1]);
}

function animalsOlderThan(animal, age) {
  const animalSpecies = data.animals.find(animalSpecie => animalSpecie.name === animal);
  return animalSpecies.residents.every(animalResidents => animalResidents.age >= age);
}

function employeeByName(employeeName) {
  if (typeof employeeName !== 'string') {
    return {};
  }
  return data.employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employee =>
  employee.managers[0] === id || employee.managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
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
  if (!species) {
    const animalSelector = {};
    data.animals.map(animal => (
      animalSelector[animal.name] = animal.residents.length
    ));
    return animalSelector;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (Adult * 49.99) + (Senior * 24.99) + (Child * 20.99);
}

function animalMap(options) {
  // const zoneFilter = zone => data.animals.filter(animal => animal.location === zone);
  // const mapAnimals = animalZone => animalZone.map(animal => animal.name);
  // const zones = ['NE', 'NW', 'SE', 'SW'];
  // const animalList = {
  //   NE: mapAnimals(zoneFilter('NE')),
  //   NW: mapAnimals(zoneFilter('NW')),
  //   SE: mapAnimals(zoneFilter('SE')),
  //   SW: mapAnimals(zoneFilter('SW')),
  // };
  // if (options.includeNames === true) {
  //   for (let index = 0; index < zones.length; index += 1) {
  //     animalList[zones[index]].forEach((animalName, indexAnimal) => {
  //       const speciesName = data.animals.find(animal => animal.name === animalName).residents;
  //       const animalsName = [];
  //       speciesName.forEach((specieName) => {
  //         animalsName.push(specieName.name);
  //       });
  //       const result = { [animalName]: animalsName };
  //       animalList[zones[index]][indexAnimal] = result;
  //     });
  //   }
  // }
  // return animalList;
}

function schedule(dayName) {
  const scheduleList = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (typeof dayName === 'string') {
    return { [dayName]: scheduleList[dayName] };
  }
  return scheduleList;
}

function oldestFromFirstSpecies(id) {
  const firstAnimalId = data.employees.find(ids => ids.id === id).responsibleFor[0];
  const residents = data.animals.find(animal => animal.id === firstAnimalId).residents;
  const oldestAnimal = residents.sort((a, b) => b.age - a.age)[0];
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  const around = (number) => {
    if (number.toString()[5] === '5') {
      number += 0.005;
    }
    return number.toFixed(2);
  };
  data.prices.Adult = parseFloat(around(data.prices.Adult * (1 + (percentage / 100))));
  data.prices.Senior = parseFloat(around(data.prices.Senior * (1 + (percentage / 100))));
  data.prices.Child = parseFloat(around(data.prices.Child * (1 + (percentage / 100))));
  return data.prices;
}

function employeeCoverage(idOrName) {
  if (typeof idOrName !== 'string') {
    const result = {};
    data.employees.forEach((employee) => {
      const allAnimalsList = [];
      employee.responsibleFor.forEach((employeeAnimalId) => {
        allAnimalsList.push(data.animals.find(animalId => employeeAnimalId === animalId.id).name);
        result[`${employee.firstName} ${employee.lastName}`] = allAnimalsList;
      });
    });
    return result;
  }
  const employee = data.employees.find(idName =>
    idName.id === idOrName || idName.firstName === idOrName || idName.lastName === idOrName);
  const animalsList = [];
  employee.responsibleFor.forEach((employeeAnimalId) => {
    animalsList.push(data.animals.find(animalId => employeeAnimalId === animalId.id).name);
  });
  return { [`${employee.firstName} ${employee.lastName}`]: animalsList };
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
