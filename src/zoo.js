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

// const { animals, employees, hours, prices } = data;
const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  const filtredAnimals = animals.filter(animal => ids.some(id => animal.id === id));
  return filtredAnimals || [];
}

function animalsOlderThan(animalName, age) {
  const residents = animals.filter(animal => animal.name === animalName)[0].residents;
  return residents.every(animal => animal.age >= age);
}

function employeeByName(employeeName) {
  const employeeFirstName = employees.find(({ firstName }) => firstName === employeeName);
  const employeeLastName = employees.find(({ lastName }) => lastName === employeeName);
  return employeeFirstName || employeeLastName || {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const allManagers = employees.reduce((acc, { managers }) => [...acc, ...managers], []);
  return allManagers.some(manager => manager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  const employee = createEmployee(personalInfo, associatedWith);
  employees.push(employee);
}

function animalCount(species) {
  if (species !== undefined) {
    const specificSpecies = animals.find(animal => animal.name === species);
    return specificSpecies.residents.length;
  }

  const allSpecies = animals.reduce((acc, currentSpecies) => {
    acc[currentSpecies.name] = currentSpecies.residents.length;
    return acc;
  }, {});

  return allSpecies;
}

function entryCalculator(...visitors) {
  if (visitors.length === 0) {
    return 0;
  }

  const { Adult: adultPrice, Child: childPrice, Senior: seniorPrice } = prices;
  const { Adult, Child, Senior } = visitors[0];

  const adultValue = adultPrice * Adult || 0;
  const childValue = childPrice * Child || 0;
  const seniorValue = seniorPrice * Senior || 0;

  return adultValue + childValue + seniorValue;
}

const showAnimalNames = (mappedAnimals, emptyAnimalMap) => {
  const mapWithAnimalsNames = mappedAnimals.reduce((acc, { name, location, residents }) => {
    const newObject = {};
    newObject[name] = residents.reduce((animalVector, resident) => {
      animalVector = [...animalVector, resident.name];
      return animalVector;
    }, []);
    acc[location].push(newObject);
    return acc;
  }, emptyAnimalMap);

  return mapWithAnimalsNames;
};

const animalBySex = sex => animals.map((animal) => {
  animal.residents = animal.residents.filter(resident => resident.sex === sex);
  return animal;
});

const sortAnimals = (mappedAnimals) => {
  const keysMappedAnimals = Object.keys(mappedAnimals);
  keysMappedAnimals.forEach((location) => {
    mappedAnimals[location].forEach((species) => {
      const speciesKey = Object.keys(species)[0];
      species[speciesKey].sort();
    });
  });
  return mappedAnimals;
};

const defaultAnimalMap = emptyAnimalMap => animals.reduce((acc, animal) => {
  acc[animal.location].push(animal.name);
  return acc;
}, emptyAnimalMap);

function animalMap(options) {
  let mappedAnimals = [...animals];
  const emptyAnimalMap = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };

  if (options === undefined || options.includeNames !== true) {
    return defaultAnimalMap(emptyAnimalMap);
  }

  const { includeNames, sorted, sex } = options;
  if (typeof sex === 'string' && includeNames) {
    mappedAnimals = animalBySex(sex);
  }

  if (includeNames) {
    mappedAnimals = showAnimalNames(mappedAnimals, emptyAnimalMap);
  }

  if (sorted && includeNames) {
    mappedAnimals = sortAnimals(mappedAnimals);
  }

  return mappedAnimals;
}

const convertHours = (hour) => {
  if (hour > 12) {
    return hour - 12 + 'pm';
  }
  return hour + 'am';
};

const humanReadbleSchedule = (open, close) => {
  if (open === close) {
    return 'CLOSED';
  }
  return `Open from ${open} until ${close}`;
};

const oneDaySchedule = (dayName) => {
  const businessHours = {};
  const opening = convertHours(hours[dayName].open);
  const closure = convertHours(hours[dayName].close);

  businessHours[dayName] = humanReadbleSchedule(opening, closure);
  return businessHours;
};

function schedule(dayName) {
  if (dayName !== undefined) {
    return oneDaySchedule(dayName);
  }

  const allDaysSchedule = {};
  const dayKeys = Object.keys(hours);
  dayKeys.forEach((day) => {
    Object.assign(allDaysSchedule, oneDaySchedule(day));
  });

  return allDaysSchedule;
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
