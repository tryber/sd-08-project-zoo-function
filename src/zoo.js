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

const { prices } = require('./data');
const data = require('./data');
// 1
function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}
// 2
function animalsOlderThan(animal, age) {
  const animalsSpecies = data.animals.find(species => species.name === animal);
  const speciesOlderThan = animalsSpecies.residents.every(specie => specie.age >= age);
  return speciesOlderThan;
}
// 3
function employeeByName(employeeName) {
  const objectFuncionario = {};
  if (!employeeName) {
    return objectFuncionario;
  }
  const emplName = employeeName;
  const emplData = data.employees;
  const getObj = emplData.find(empl => empl.firstName === emplName || empl.lastName === emplName);
  return getObj;
}
// 4
function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return createNewEmployee;
}
// 5
function isManager(id) {
  const empData = data.employees;
  const getManager = empData.some(man => man.managers.find(manId => manId === id));
  return getManager;
}

// 6
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  const employeeIncluded = data.employees.push(newEmployee);
  return employeeIncluded;
}
// 7
function animalCount(species) {
  if (species) {
    const findAnimals = data.animals.find(element => element.name === species);
    const animalLength = findAnimals.residents.length;
    return animalLength;
  }
  return data.animals.reduce((accumulator, current) => {
    accumulator[current.name] = current.residents.length;
    return accumulator;
  }, {});
}

// 8
function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult: adultQt = 0, Senior: seniorQt = 0, Child: childQt = 0 } = entrants;
  const { Adult, Senior, Child } = prices;
  const totalValue = (adultQt * Adult) + (seniorQt * Senior) + (childQt * Child);
  return totalValue;
}
// 9
function animalMap(options) {
  const animalLocale = {};
  data.animals.forEach(({ location }) => { animalLocale[location] = []; });

  if (options !== undefined) {
    const { includeNames = '', sorted = '', sex = 'nd' } = options;
    if (includeNames) {
      data.animals.forEach(({ name: specieName, location, residents }) => {
        const specie = {};
        specie[specieName] = [];
        if (sex === 'nd') {
          specie[specieName] = residents.map(({ name }) => name);
        } else {
          specie[specieName] = residents
          .filter(({ sex: gender }) => gender === sex)
          .map(({ name }) => name);
        }
        if (sorted) {
          specie[specieName].sort();
        }
        animalLocale[location].push(specie);
      });
      return animalLocale;
    }
  }
  data.animals.forEach(({ name, location }) => animalLocale[location].push(name));
  return animalLocale;
}
// 10
function schedule(dayName) {
  const hours = data.hours;
  let obj = {};
  Object.keys(hours).forEach((element) => {
    const keyWeek = dayName || element;
    obj = { ...obj, [keyWeek]: `Open from ${hours[keyWeek].open}am until ${hours[keyWeek].close - 12}pm` };
    if (keyWeek === 'Monday') {
      obj[keyWeek] = 'CLOSED';
    }
  });
  return obj;
}
// 11
function oldestFromFirstSpecies(id) {
  const animalIds = data.employees.find(employeeId => employeeId.id === id).responsibleFor;
  const animals = data.animals.find(animalId => animalId.id === animalIds[0]);
  const getOlderAnimal = animals.residents.reduce((animalA, animalB) => {
    if (animalA.age > animalB.age) return animalA;
    return animalB;
  });
  const arrayAnimal = Object.values(getOlderAnimal);
  return arrayAnimal;
}
console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
// 12
function increasePrices(percentage) {
  const aumento = ((percentage / 100) + 1);
  prices.Adult = Math.round(prices.Adult * 100 * aumento) / 100;
  prices.Senior = Math.round(prices.Senior * 100 * aumento) / 100;
  prices.Child = Math.round(prices.Child * 100 * aumento) / 100;
  return prices;
}
// 13
function employeeCoverage(idOrName) {
  const employees = {};

  const animalsList = (firstName, lastName, responsibleFor) => {
    const employeeName = `${firstName} ${lastName}`; // lista dos nomes de cada employee
    const animals = []; // lista dos animais de cada employee
    responsibleFor.forEach((animalId) => {
      animals.push(data.animals.find(({ id }) => id === animalId).name);
    });
    employees[employeeName] = animals; // lista de cada employee e seus respectivos animais
    // console.log(employeeName);
    // console.log(animals);
  };
  if (idOrName === undefined) {
    data.employees.forEach(({ firstName, lastName, responsibleFor }) => {
      animalsList(firstName, lastName, responsibleFor);
    });
  } else {
    const employeeData = data.employees.find(({ id, firstName, lastName }) =>
    id === idOrName || firstName === idOrName || lastName === idOrName);

    const { firstName, lastName, responsibleFor } = employeeData;

    animalsList(firstName, lastName, responsibleFor);
  }

  return employees;
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
