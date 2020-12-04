/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
git status*/

const { prices } = require('./data');
const { employees } = require('./data');
const { animals } = require('./data');
const { hours } = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return animals.filter((e) => {
    return ids.includes(e.id);
  });
}

function animalsOlderThan(animal, age) {
  return animals
    .find((e) => {
      return e.name === animal;
    })
    .residents.every((e) => e.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined || employeeName.length === 0) return {};
  return employees.find((e) => {
    return e.firstName === employeeName || e.lastName === employeeName;
  });
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return (
    employees.find((e) => {
      return e.id === id;
    }).managers.length === 0
  );
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
  if (species === undefined) {
    const answer = {};
    animals.forEach((e) => (answer[e.name] = e.residents.length));
    return answer;
  }
  return animals.find((e) => {
    return e.name === species;
  }).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const adultPrice = prices.Adult * Adult;
  const seniorPrice = prices.Senior * Senior;
  const childPrice = prices.Child * Child;
  return adultPrice + seniorPrice + childPrice;
}

function animalsByRegionArray() {
  const locations = [...new Set(animals.map((e) => e.location))];
  const animalsByLocation = {};
  locations.forEach((region) => {
    const animalsNames = animals
      .filter((animal) => {
        return animal.location === region;
      })
      .map((animal) => {
        return animal.name;
      });
    animalsByLocation[region] = animalsNames;
  });
  return animalsByLocation;
}

function grabAnimalsListName(animal, sex = '', sorted = false) {
  const animalObj = animals.find((element) => element.name === animal);
  const answer = animalObj.residents
    .filter((element) => {
      if (sex === 'male' || sex === 'female') return element.sex === sex;
      return element;
    })
    .map((element) => element.name);
  if (sorted) answer.sort();
  return answer;
}

function animalMap(options) {
  if (options === undefined || !options.hasOwnProperty('includeNames')) return animalsByRegionArray();
  const { sex = '', sorted = false } = options;
  const animalsByRegion = animalsByRegionArray();
  for (const region in animalsByRegion) {
    const arrayAnimals = animalsByRegion[region].map((element) => {
      const newObj = {};
      newObj[element] = grabAnimalsListName(element, sex, sorted);
      return newObj;
    });
    animalsByRegion[region] = arrayAnimals;
  }
  return animalsByRegion;
}

function schedule(dayName) {
  for (const day in hours) {
    const { open, close } = hours[day];
    let string = '';
    if (open === 0) {
      string = 'CLOSED';
    } else {
      string = `Open from ${open}am until ${close - 12}pm`;
    }
    hours[day] = string;
  }
  if (dayName === undefined) return hours;
  const newObj = {};
  newObj[dayName] = hours[dayName];
  return newObj;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find((element) => element.id === id);
  const firstAnimal = employee.responsibleFor[0];
  const animal = animals.find((element) => element.id === firstAnimal);
  const oldest = animal.residents.reduce((acc, curr) => (acc = curr.age > acc.age ? curr : acc));
  const { name, sex, age } = oldest;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const apply = 1 + percentage / 100;
  for (const key in prices) {
    let fare = prices[key];
    fare = Math.round(fare * apply * 100) / 100;
    prices[key] = fare;
  }
  return;
}

function getAnimalsFromIds(arrayOfIds) {
  return arrayOfIds.map((element) => animals.find((animal) => animal.id === element).name);
}

function employeeCoverage(idOrName) {
  const allEmployees = {};
  employees.forEach((element) => {
    const { firstName, lastName, responsibleFor } = element;
    const key = `${firstName} ${lastName}`;
    allEmployees[key] = getAnimalsFromIds(responsibleFor);
  });
  if (idOrName === undefined) return allEmployees;

  const employee = employees.find((element) => {
    return element.id === idOrName || element.firstName === idOrName || element.lastName === idOrName;
  });

  const { firstName, lastName } = employee;
  const key = `${firstName} ${lastName}`;
  const newObj = {};
  newObj[key] = allEmployees[key];
  return newObj;
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
