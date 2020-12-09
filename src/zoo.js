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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const findAnimal = ids.map(id => animals.find(animal => animal.id === id));
  return findAnimal;
}

function animalsOlderThan(animal, age) {
  const findAnimals = animals.find(element => element.name === animal);
  const animalsMinAge = findAnimals.residents.every(element => element.age >= age);
  return animalsMinAge;
}

function employeeByName(employeeName) {
  if (employeeName !== undefined) {
    return data.employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const managers = employees.map(employee => employee.managers
  .some(element => element === id));
  return managers.some(manager => manager === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
  return data.employees;
}

function animalCount(species) {
  const animalsAmount = animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
  const animalSpecies = animals.find(animal => animal.name === species);
  if (species === undefined) return animalsAmount;
  return animalSpecies.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  const people = Object.keys(entrants);
  const amount = Object.values(entrants);
  const prices = data.prices;
  const total = people.reduce((acc, person, index) => {
    acc += prices[person] * amount[index];
    return acc;
  }, 0);
  return total;
}
// Functions para animalMap
const animalsByRegion = (region, prop) => {
  const animalsRegionArray = animals.reduce((acc, animal) => {
    if (animal.location === region) acc.push(animal[prop]);
    return acc;
  }, []);
  return animalsRegionArray;
};
const animalsNamesRegion = (region, sex) => {
  const animalsNames = animalsByRegion(region, 'residents').reduce((acc, resident) => {
    if (sex !== undefined) {
      acc.push(resident.filter(element => element.sex === sex).map(element => element.name));
    } else {
      acc.push(resident.map(element => element.name));
    }
    return acc;
  }, []);
  return animalsNames;
};

const includeNames = (sex) => {
  const animalsNameList = (region) => {
    const animalsRegion = animalsByRegion(region, 'name');
    let animalsNames = animalsNamesRegion(region);
    if (sex !== undefined) animalsNames = animalsNamesRegion(region, sex);
    const updateAnimals = (speciesList, namesList) => speciesList
    .map((animalName, index) => ({ [animalName]: namesList[index] }));
    return updateAnimals(animalsRegion, animalsNames);
  };
  const includeNamesList = {
    NE: animalsNameList('NE'),
    NW: animalsNameList('NW'),
    SE: animalsNameList('SE'),
    SW: animalsNameList('SW'),
  };
  return includeNamesList;
};

const sorted = (list) => {
  const animalList = list;
  const listValues = Object.values(animalList);
  listValues.forEach((element) => {
    Object.values(element).forEach(animalName => Object.values(animalName)
    .forEach(name => name.sort()));
  });
  return animalList;
};

// console.log(sorted());
const animalsFromRegion = {
  NE: animalsByRegion('NE', 'name'),
  NW: animalsByRegion('NW', 'name'),
  SE: animalsByRegion('SE', 'name'),
  SW: animalsByRegion('SW', 'name'),
};
const includesNamesSorted = (sex) => {
  if (sex === undefined) return sorted(includeNames());
  else if (sex === 'male') return sorted(includeNames('male'));
  return sorted(includeNames('female'));
};

const includeNamesNoSorted = (sex) => {
  if (sex === undefined) return includeNames();
  else if (sex === 'female') return includeNames('female');
  return includeNames('male');
};

function animalMap(options) {
  let finalResult;
  if (options === undefined) finalResult = animalsFromRegion;
  else if (options.includeNames === true && options.sorted === true) {
    finalResult = includesNamesSorted(options.sex);
  } else if (options.includeNames === true && options.sorted === undefined) {
    finalResult = includeNamesNoSorted(options.sex);
  } else finalResult = animalsFromRegion;
  return finalResult;
}
console.log(animalMap({ includeNames: true, sex: 'male' }));

function schedule(dayName) {
  // seu código aqui
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
