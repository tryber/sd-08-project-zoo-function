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

// map()
// reduce()
// filter()
// find()
// sort()

const { animals, employees, hours, prices } = require('./data');

const animalsByIds = (...ids) => ids.map(id => animals.find(animal => animal.id === id));

const animalsOlderThan = (animal, age) => animals.find(specie => specie.name === animal)
  .residents.every(specie => specie.age >= age);

const employeeByName = (employeeName) => {
  if (!employeeName) return {};

  return employees.find(employee => employee.firstName === employeeName ||
    employee.lastName === employeeName);
};

const createEmployee = (personalInfo, associatedWith) => {
  const employee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [...associatedWith.managers],
    responsibleFor: [...associatedWith.responsibleFor],
  };

  return employee;
};

const isManager = (id) => {
  if (employees.find(employee => employee.managers
    .find(manager => manager === id))) return true;

  return false;
};

const addEmployee = (id, firstName, lastName, managers, responsibleFor) => {
  if (!managers) managers = [];
  if (!responsibleFor) responsibleFor = [];

  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
};

const animalCount = (species) => {
  if (!species) {
    const list = animals.reduce((accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.residents.length;

      return accumulator;
    }, {});

    return list;
  }

  return animals.find(animal => animal.name === species).residents.length;
};

const entryCalculator = (entrants) => {
  if (!entrants) return 0;

  return (Object.keys(entrants).reduce((accumulator, currentValue) =>
    accumulator + (entrants[currentValue] * prices[currentValue]), 0));
};

const animalsFilteredBySex = (species, sex) => {
  if (!sex) return species;

  return species.filter(({ sex: animal }) => sex === animal);
};

const sortedAnimalNames = (names, sorted) => {
  if (!sorted) return names;

  return names.sort();
};

const animalMap = (options = {}) => {
  const { includeNames, sex, sorted } = options;

  return animals.reduce((accumulator, animal) => {
    const location = accumulator[animal.location] || [];

    if (!includeNames) {
      accumulator[animal.location] = [...location, animal.name];

      return accumulator;
    }

    let residents = animal.residents;
    residents = animalsFilteredBySex(residents, sex);

    let names = residents.map(({ name }) => name);
    names = sortedAnimalNames(names, sorted);

    accumulator[animal.location] = [...location, { [animal.name]: names }];

    return accumulator;
  }, {});
};

const schedule = (dayName) => {
  const specificSchedule = {};

  Object.keys(hours).forEach((day) => {
    if (hours[day].open === hours[day].close) {
      specificSchedule[day] = 'CLOSED';
    } else {
      specificSchedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });

  if (dayName !== undefined) {
    return { [dayName]: specificSchedule[dayName] };
  }

  return specificSchedule;
};

const oldestFromFirstSpecies = (id) => {
  const { residents } = animals.find(
    animal => animal.id === employees.find(employee => employee.id === id).responsibleFor[0]);

  const animal = residents.reduce((accumulator, currentValue) =>
    (accumulator.age > currentValue.age ? accumulator : currentValue));

  return [animal.name, animal.sex, animal.age];
};

const increasePrices = (percentage) => {
  Object.keys(prices).map(
    category => (prices[category] =
      Math.round(prices[category] * ((percentage / 100) + 1) * 100) / 100));
};

const employeeCoverage = (idOrName) => {
  const managers = {};

  employees.forEach((employee) => {
    managers[`${employee.firstName} ${employee.lastName}`] =
      employee.responsibleFor.map(id => animals.find(animal => animal.id === id).name);
  });

  const employeeByNameOrId = (condition) => {
    const manager = employees.find(employee =>
      employee.firstName === condition ||
      employee.lastName === condition ||
      employee.id === condition);

    return `${manager.firstName} ${manager.lastName}`;
  };

  if (!idOrName) return managers;

  return { [employeeByNameOrId(idOrName)]: managers[employeeByNameOrId(idOrName)] };
};

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
