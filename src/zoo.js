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
  const animals = [];

  if (ids) {
    ids.map((animalId) => {
      const animal = data.animals.find(findAnimal => findAnimal.id === animalId);

      return animals.push(animal);
    });
  }

  return animals;
  // seu código aqui
}

function animalsOlderThan(animal, age) {
  const animalsBySpecie = data.animals.filter(it => it.name === animal)[0];
  const hasYoungerAnimal = animalsBySpecie.residents.find(it => it.age < age);

  if (hasYoungerAnimal) {
    return false;
  }

  return true;
}

function employeeByName(employeeName) {
  const employee = data.employees.find((it) => {
    const equalToFirstName = it.firstName === employeeName;
    const equalToLastName = it.lastName === employeeName;

    return equalToFirstName || equalToLastName;
  });

  if (!employee) {
    return {};
  }

  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const employee = {
    ...personalInfo,
    ...associatedWith,
  };

  return employee;
}

function isManager(id) {
  const manager = data.employees.map(employee => employee.managers.includes(id));

  if (manager.includes(true)) {
    return true;
  }

  return false;
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
    const animalsBySpecies = {};

    data.animals.forEach((animal) => {
      animalsBySpecies[animal.name] = animal.residents.length;
    });

    return animalsBySpecies;
  }

  const specie = data.animals.find(it => it.name === species);
  const numberOfResidents = specie.residents.length;

  return numberOfResidents;
}

function entryCalculator(entrants) {
  let total = 0;

  if (!entrants || Object.keys(entrants).length === 0) {
    return total;
  }

  total += data.prices.Adult * (entrants.Adult ? entrants.Adult : 0);
  total += data.prices.Senior * (entrants.Senior ? entrants.Senior : 0);
  total += data.prices.Child * (entrants.Child ? entrants.Child : 0);

  return total;
}

function mapWithResidents(locations, sex) {
  const map = locations;
  if (!sex) {
    Object.keys(map).forEach((key) => {
      map[key] = data.animals
      .filter(it => it.location === key)
      .map((specie) => {
        const object = {};
        object[specie.name] = specie.residents.map(animal => animal.name);
        return object;
      });
    });

    return map;
  }
  Object.keys(map).forEach((key) => {
    map[key] = data.animals
    .filter(it => it.location === key)
    .map((specie) => {
      const object = {};
      object[specie.name] = specie.residents
        .filter(resident => resident.sex === sex)
        .map(animal => animal.name);
      return object;
    });
  });

  return map;
}

function sortAnimalMap(locations, options) {
  const map = locations;

  if (options.sorted && options.sorted === true) {
    Object.keys(map).forEach((key) => {
      map[key] = map[key].map((specie) => {
        const entries = Object.entries(specie);
        entries[0][1] = entries[0][1].sort();
        return Object.fromEntries(entries);
      });
    });
  }

  return map;
}

function hasOptions(options) {
  const checkOptions = !options || !options.includeNames;

  return checkOptions;
}

function isIncludeNames(options) {
  const checkIncludeNames = options.includeNames && options.includeNames === true;

  return checkIncludeNames;
}

function animalMap(options) {
  let map = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };

  if (hasOptions(options)) {
    Object.keys(map).forEach((key) => {
      map[key] = data.animals
        .filter(it => it.location === key)
        .map(specie => specie.name);
    });

    return map;
  }

  if (isIncludeNames(options)) {
    if (options.sex) {
      map = mapWithResidents(map, options.sex);
    } else {
      map = mapWithResidents(map);
    }
    map = sortAnimalMap(map, options);
  }
  return map;
}

function convertToAmPm(hour) {
  const amPmHour = hour < 12 ? hour : hour - 12;

  return amPmHour;
}

function schedule(dayName) {
  const hours = {};

  if (!dayName) {
    Object.keys(data.hours).forEach((day) => {
      if (data.hours[day].open === 0 && data.hours[day].close === 0) {
        hours[day] = 'CLOSED';
      } else {
        const open = data.hours[day].open;
        const close = convertToAmPm(data.hours[day].close);
        hours[day] = `Open from ${open}am until ${close}pm`;
      }
    });

    return hours;
  }

  const openTime = data.hours[dayName].open;
  const closeTime = convertToAmPm(data.hours[dayName].close);

  if (openTime === 0 && closeTime === 0) {
    hours[dayName] = 'CLOSED';
  } else {
    hours[dayName] = `Open from ${openTime}am until ${closeTime}pm`;
  }

  return hours;
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find(person => person.id === id);
  const firstSpecieId = employee.responsibleFor[0];

  const specie = data.animals.find(animal => animal.id === firstSpecieId);
  let oldestFromSpecie = specie.residents
    .reduce((oldest, current) => (oldest.age < current.age ? current : oldest));

  oldestFromSpecie = [
    oldestFromSpecie.name,
    oldestFromSpecie.sex,
    oldestFromSpecie.age,
  ];

  return oldestFromSpecie;
}

function increasePrices(percentage) {
  const prices = data.prices;
  const percentagePlusOne = (percentage / 100) + 1;

  Object.keys(prices).forEach((key) => {
    prices[key] = (Math.round((prices[key] * percentagePlusOne) * 100) / 100);
  });

  return prices;
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
