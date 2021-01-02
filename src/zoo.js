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

  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(elem => elem.name === animal);
  return findAnimal.residents.every(eachAnimal => eachAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const show = data.employees.find(person => {
    if (person.firstName === employeeName || person.lastName === employeeName) {
      return person;
    }
  });

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
  let isManager = null;
  data.employees.find(element =>
    element.managers.includes(id) ? (isManager = true) : (isManager = false)
  );

  return isManager;
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
    animals.forEach(
      animal => (countAnimal[animal.name] = animal.residents.length)
    );
    return countAnimal;
  }
  const findAnimal = animals.find(animal => animal.name === species);
  return findAnimal.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const entrantsKeys = Object.keys(entrants);
  const show = entrantsKeys.map(eachKey => {
    return data.prices[eachKey];
  });
  const entrantsValues = Object.values(entrants);
  const total = entrantsValues.reduce((acc, curr, index) => {
    return acc + show[index] * curr;
  }, 0);

  return total;
}

const animalFilter = (name, sorted, sex) => {
  let filterAnimal = animals.find(animal => animal.name === name).residents;
  if (sex === 'female' || sex === 'male') {
    filterAnimal = filterAnimal.filter(animal => animal.sex === sex);
  }

  const filteredAnimal = filterAnimal.map(animal => animal.name);

  if (sorted) {
    filteredAnimal.sort();
  }

  return { [name]: filteredAnimal };
};

function animalMap(options = {}) {
  // codigo
  const { includeNames = false, sorted = false, sex } = options;

  let mapResult = animals.reduce((acc, animal) => {
    if (!acc[animal.location]) {
      acc[animal.location] = [];
    }
    acc[animal.location].push(animal.name);
    return acc;
  }, {});

  if (includeNames) {
    mapResult = Object.entries(mapResult).reduce((acc, [region, animal]) => {
      acc[region] = animal.map(name => animalFilter(name, sorted, sex));
      return acc;
    }, {});
  }

  return mapResult;
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
