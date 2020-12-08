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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');

function animalsByIds(...ids) {
  return animals.filter((elem, index) => elem.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const output = animals.find(elem => (elem.name === animal));
  return output.residents.every(el => el.age >= age);
}

function employeeByName(employeeName) {
  let output = {};
  const param = employeeName;

  if (employeeName !== undefined) {
    output = employees.find(elem => (elem.firstName === param || elem.lastName === param));
  }

  return output;
}

function createEmployee({ id, firstName, lastName }, { managers = [], responsibleFor = [] }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  let output = false;

  employees.forEach((elem) => {
    elem.managers.some((el) => {
      if (el === id) {
        output = true;
      }
      return output;
    });
  });

  return output;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  const add = createEmployee(personalInfo, associatedWith);
  return employees.push(add);
}

function animalCount(species) {
  if (species === undefined) {
    const output = {};

    animals.forEach((elem) => {
      const obj = { [elem.name]: elem.residents.length };
      Object.assign(output, obj);
    });
    return output;
  }

  const bySpecie = animals.find(elem => (elem.name === species));
  return bySpecie.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined) { return 0; }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const output = (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);

  return output;
}


const getSpecies = (regions) => {
  const output = [];

  animals.forEach((anim) => {
    if (anim.location === regions) {
      output.push(anim.name);
    }
  });

  return output;
};

const getRegionsAndSpecies = () => animals.reduce((acc, anim) => {
  const name = getSpecies(anim.location);
  return Object.assign(acc, { [anim.location]: name });
}, {});

const sortBySex = (sex, currAnimal) => {
  let output;

  if (sex !== '') {
    output = currAnimal.filter(elem => elem.sex === sex);
  } else {
    output = currAnimal;
  }

  return output;
};

const getResidentsNames = ({ region, sex = '', sorted = false }) => {
  const output = [];
  const animal = getSpecies(region);

  for (let x = 0; x < animal.length; x += 1) {
    const currAnimal = animals.find(anim => (anim.name === animal[x])).residents;
    const names = [];
    const currAnimalBySex = sortBySex(sex, currAnimal);

    currAnimalBySex.forEach((elem) => {
      names.push(elem.name);
    });

    if (sorted) {
      names.sort();
    }

    output.push({ [animal[x]]: names });
  }

  return output;
};

function animalMap(options) {
  if (options === undefined) {
    options = { includeNames: false, sex: '', sorted: false };
  }

  const output = getRegionsAndSpecies();
  const regions = Object.keys(output);

  if (options.includeNames === true) {
    const { sex, sorted } = options;
    regions.forEach((region) => {
      output[region] = getResidentsNames({ region, sex, sorted });
    });
  }

  return output;
}

function schedule(dayName) {
  const scheduleKeys = Object.keys(hours);
  const scheduleValues = Object.values(hours);
  let output;

  const week = {};
  scheduleKeys.map((elem, index) => {
    const openHour = (scheduleValues[index].open !== 0) ?
    `Open from ${scheduleValues[index].open}am until ${(scheduleValues[index].close - 12)}pm` :
    'CLOSED';
    return Object.assign(week, { [elem]: openHour });
  });

  if (dayName !== undefined) {
    Object.entries(week).forEach((key) => {
      if (dayName === key[0]) {
        output = { [key[0]]: key[1] };
      }
    });
  } else {
    output = week;
  }

  return output;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(elem => elem.id === id);
  const animalCared = animals.find(elem => elem.id === Object.values(employee.responsibleFor)[0]);
  let residentsAge = 0;
  let output;

  animalCared.residents.forEach((animal) => {
    if (residentsAge < animal.age) {
      residentsAge = animal.age;
      output = Object.values(animal);
    }
  });

  return output;
}

function increasePrices(percentage) {
  const increase = percentage / 100;
  const increaseAdult = prices.Adult + (prices.Adult * increase);
  const increaseSenior = prices.Senior + (prices.Senior * increase);
  const increaseChild = prices.Child + (prices.Child * increase);

  prices.Adult = Math.round((increaseAdult + Number.EPSILON) * 100) / 100;
  prices.Senior = Math.round((increaseSenior + Number.EPSILON) * 100) / 100;
  prices.Child = Math.round((increaseChild + Number.EPSILON) * 100) / 100;
}

const getAnimal = (animalId) => {
  const output = [];

  for (let index = 0; index < animalId.length; index += 1) {
    animals.forEach((animal) => {
      if (animalId[index] === animal.id) {
        output.push(animal.name);
      }
    });
  }

  return output;
};

const getAllEmployee = () => {
  const output = {};

  employees.map((person) => {
    const fullname = `${person.firstName} ${person.lastName}`;
    const animalsId = person.responsibleFor;
    const animalsName = getAnimal(animalsId);
    const obj = { [fullname]: animalsName };
    return Object.assign(output, obj);
  });

  return output;
};

function employeeCoverage(idOrName) {
  let output = {};

  if (idOrName === undefined) { return getAllEmployee(); }

  const getEmployee = employees.find((person) => {
    const { id, firstName, lastName } = person;
    return id === idOrName || firstName === idOrName || lastName === idOrName;
  });

  const fullname = `${getEmployee.firstName} ${getEmployee.lastName}`;
  const animalId = getEmployee.responsibleFor;
  output = { [fullname]: getAnimal(animalId) };

  return output;
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
