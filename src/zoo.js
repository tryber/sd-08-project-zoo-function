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
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(name, age) {
  const typeOfAnimal = animals.find(animal => animal.name === name);
  return typeOfAnimal.residents.every(resident => resident.age >= age);
}

function employeeByName(name) {
  if (!name) return {};
  return employees.find(person => person.firstName === name || person.lastName === name);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(person => person.managers.find(personId => personId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((list, animal) => {
      list[animal.name] = animal.residents.length;
      return list;
    }, {});
  } return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  return Object.entries(entrants).reduce((finalPrice, price, index) => {
    const find = Object.entries(prices).find(ticket => ticket[0] === price[0]);
    finalPrice += (price[1] * find[1]);
    return finalPrice;
  }, 0);
}

function animalMap(options) {
  /* const locationsArray = [ 'NE', 'NW', 'SE', 'SW' ];
  if (!options) {
    return {
      NE: animals.filter(animal => animal.location === 'NE').map(found => found.name),
      NW: animals.filter(animal => animal.location === 'NW').map(found => found.name),
      SE: animals.filter(animal => animal.location === 'SE').map(found => found.name),
      SW: animals.filter(animal => animal.location === 'SW').map(found => found.name),
    };
  }
  if (options === { includeNames: true }) {
    return {
      NE: animals.filter(animal => animal.location === 'NE'),
      NW: animals.filter(animal => animal.location === 'NW'),
      SE: animals.filter(animal => animal.location === 'SE'),
      SW: animals.filter(animal => animal.location === 'SW'),
    };
  } */
}
// console.log(animalMap({ includeNames: true }));

function schedule(dayName) {
  if (!dayName) {
    return Object.entries(hours).reduce((list, day, index) => {
      if (index < 6) {
        list[`${day[0]}`] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
      } else {
        list[`${day[0]}`] = 'CLOSED';
      }
      return list;
    }
    , {});
  }
  if (dayName !== 'Monday') {
    const chosenDay = Object.entries(hours).find(weekday => weekday[0] === dayName);
    return {
      [chosenDay[0]]: `Open from ${chosenDay[1].open}am until ${chosenDay[1].close - 12}pm`,
    };
  }
  return {
    [dayName]: 'CLOSED',
  };
}

function oldestFromFirstSpecies(id) {
  const findAnimalId = employees.find(person => person.id === id).responsibleFor[0];
  const findAnimalSpecies = animals.find(animal => animal.id === findAnimalId);
  const oldestAnimal = findAnimalSpecies.residents.reduce((oldest, next) => {
    if (next.age > oldest.age) {
      oldest = next;
    }
    return oldest;
  });
  const { name, sex, age } = oldestAnimal;
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
}


function employeeCoverage(idOrName) {
  if (!idOrName) {
    return employees.reduce((list, person) => {
      list[`${person.firstName} ${person.lastName}`] = person.responsibleFor.map(id => animals.find(animal => animal.id === id).name);
      return list;
    }, {});
  }
  const employee = employees.find(info =>
    info.firstName === idOrName ||
    info.lastName === idOrName ||
    info.id === idOrName);
  return {
    [`${employee.firstName} ${employee.lastName}`]: employee.responsibleFor.map(id => animals.find(animal => animal.id === id).name),
  };
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
