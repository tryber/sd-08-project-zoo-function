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
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return ids;
  }
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find((elem) => elem.name === animal);
  return findAnimal.residents.every((eachAnimal) => eachAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const show = data.employees.find(
    (person) =>
      person.firstName === employeeName || person.lastName === employeeName
  );

  return show;
}

function createEmployee(personalInfo, associatedWith) {
  if (!personalInfo || !associatedWith) {
    return {};
  }
  const employee = {
    ...personalInfo,
    ...associatedWith,
  };

  return employee;
}

function isManager(id) {
  let checkTrueOrFalse = false;
  const checkManager = data.employees.find((element) =>
    element.managers.includes(id)
  );
  if (checkManager !== undefined) {
    checkTrueOrFalse = true;
  }

  return checkTrueOrFalse;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) {
  if (!id || !firstName || !lastName) {
    return {};
  }
  const addNewEmployee = data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });

  return addNewEmployee;
}

function animalCount(species) {
  const countAnimal = {};
  if (!species) {
    animals.forEach((animal) => {
      countAnimal[animal.name] = animal.residents.length;
    });
    return countAnimal;
  }
  const findAnimal = animals.find((animal) => animal.name === species);
  const totalRes = findAnimal.residents.length;
  return totalRes;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const entrantsKeys = Object.keys(entrants).map(
    (eachKey) => data.prices[eachKey]
  );
  const entrantsValues = Object.values(entrants).reduce(
    (acc, curr, index) => acc + entrantsKeys[index] * curr,
    0
  );

  return entrantsValues;
}

function animalMap(...options) {
  // codigo
  const locations = {};
  animals.forEach((animal) => {
    locations[animal.location] = [];
  });
  if (!options || options.length === 0) {
    animals.forEach((animal) => {
      locations[animal.location].push(animal.name);
    });
    return locations;
  }

  const includeName = options.some((item) => item.includeNames === true);
  const sorted = options.some((item) => item.sorted === true);

  if (includeName && sorted) {
    animals.forEach((animal) => {
      const animalName = animal.name;
      const residentsName = animal.residents
        .map((resident) => resident.name)
        .sort();
      const animalObj = {};
      animalObj[animalName] = residentsName;
      locations[animal.location].push(animalObj);
    });
  } else if (includeName) {
    animals.forEach((animal) => {
      const animalName = animal.name;
      const residentsName = animal.residents.map((resident) => resident.name);
      const animalObj = {};
      animalObj[animalName] = residentsName;
      locations[animal.location].push(animalObj);
    });

    return locations;
  }

  return locations;
}

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
