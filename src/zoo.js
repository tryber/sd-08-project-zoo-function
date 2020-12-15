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
  if (!ids) return [];
  const animalsFiltred = data.animals.filter((animal) => {
    const idInList = ids.includes(animal.id);
    return idInList;
  });
  return animalsFiltred;
}

function animalsOlderThan(animal, age) {
  const animalsFiltred = data.animals.find((animalInLIst) => {
    const nameInList = animalInLIst.name === animal;
    return nameInList;
  });
  const hasResidentsOldderThan = animalsFiltred.residents.every((resident) => {
    const validation = resident.age > age;
    return validation;
  });
  return hasResidentsOldderThan;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  const employeeFinder = data.employees.find((employee) => {
    const employeeFirstName = employee.firstName;
    const employeeLastName = employee.lastName;
    return employeeFirstName === employeeName || employeeLastName === employeeName;
  });
  return employeeFinder;
}

function createEmployee(personalInfo, associatedWith) {
  const createPersonalEmployee = { ...personalInfo, ...associatedWith };
  return createPersonalEmployee;
}

function isManager(id) {
  const hasManager = data.employees.some((employee) => {
    const validate = employee.managers.includes(id);
    return validate;
  });
  return hasManager;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  data.employees.push(employee);
}


function animalCount(species) {
  const animalSpeciesEmpty = data.animals.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.residents.length;
    return accumulator;
  }, {});
  if (!species) {
    return animalSpeciesEmpty;
  }
  return animalSpeciesEmpty[species];
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((accumulator, currentValue) =>
  accumulator + (data.prices[currentValue] * entrants[currentValue]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const employeeResult = data.employees.find((employee) => {
    const validate = employee.id === id;
    return validate;
  });
  const employeeFirstResponsibleFor = employeeResult.responsibleFor[0];
  const animalResult = data.animals.find((animal) => {
    const validateAnimal = animal.id === employeeFirstResponsibleFor;
    return validateAnimal;
  });
  const animalResindet = animalResult.residents.reduce((maxAgeAnimal, currentAnimal) => {
    if (currentAnimal.age > (maxAgeAnimal.age || 0)) {
      return currentAnimal;
    }
    return maxAgeAnimal;
  }, {});
  const animalResindetConvert = Object.keys(animalResindet).map(key => animalResindet[key]);
  return animalResindetConvert;
}

function increasePrices(percentage) {
  const incriese = (percentage / 100) + 1;
  Object.keys(data.prices).forEach((value) => {
    const valueUpdated = data.prices[value] * incriese;
    data.prices[value] = Math.round((valueUpdated + Number.EPSILON) * 100) / 100;
  });
}

function mapEmployeeAnimals(...employees) {
  const employeesMaped = employees.map((employee) => {
    const animalsName = employee.responsibleFor.map((idAnimal) => {
      const animalFinder = data.animals.find(animal => idAnimal === animal.id);
      return animalFinder.name;
    });
    const allName = `${employee.firstName} ${employee.lastName}`;
    return { [allName]: animalsName };
  });
  return employeesMaped;
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    return mapEmployeeAnimals(...data.employees);
  }
  const employeeFinder = data.employees.find((employee) => {
    const employeeId = employee.id;
    const employeeFirstName = employee.firstName;
    const employeeLastName = employee.lastName;
    return employeeId === idOrName || employeeFirstName === idOrName
    || employeeLastName === idOrName;
  });

  return mapEmployeeAnimals(employeeFinder)[0];
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
