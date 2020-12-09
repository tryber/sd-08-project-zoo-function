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

function animalsByIds(...animals) {
  const zooAnimals = data.animals;
  const checkId = animal => animals.includes(animal.id);
  const checkedAnimals = zooAnimals.filter(checkId);
  return checkedAnimals;
}

function animalsOlderThan(animal, age) {
  const findAnimal = data.animals.find(zooAnimal => zooAnimal.name === animal);
  const checkAge = findAnimal.residents.every(resident => resident.age >= age);
  return checkAge;
}

function employeeByName(employeeName) {
  let findEmployee = data.employees.find(zooEmployee =>
    zooEmployee.firstName === employeeName ||
    zooEmployee.lastName === employeeName);
  if (!employeeName) {
    findEmployee = {};
  }
  return findEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  const zooEmployees = data.employees;
  const findEmployee = zooEmployees.find(employee => employee.id === id);
  const managerStatus = zooEmployees.some(employee =>
    employee.managers.includes(findEmployee.id));
  return managerStatus;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const zooEmployees = data.employees;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  if (!managers) {
    newEmployee.managers = [];
  }
  if (!responsibleFor) {
    newEmployee.responsibleFor = [];
  }
  zooEmployees.push(newEmployee);
}

function animalCount(species) {
  const zooAnimals = data.animals;
  let count;
  if (!species) {
    count = zooAnimals.reduce((accum, curr) => {
      accum[curr.name] = curr.residents.length;
      return accum;
    }, {});
  } else if (species) {
    const findAnimal = zooAnimals.find(animal => animal.name === species);
    count = findAnimal.residents.length;
  }
  return count;
}

function entryCalculator(entrants) {
  const prices = data.prices;
  let total = 0;
  if (!entrants || Object.keys(entrants).length === 0) {
    total = 0;
  } else if (entrants) {
  const obj = Object.entries(entrants);
  total = obj.reduce((acc, curr) => {
    if (curr[0] === 'Adult') {
      acc += curr[1] * 49.99;
    } else if (curr[0] === 'Child') {
      acc += curr[1] * 20.99;
    } else if (curr[0] === 'Senior') {
      acc += curr[1] * 24.99;
    } else {
      acc;
    }
    return acc;
  }, 0);
  }
  return total;
}

function animalMap(options) {
  // const animals = data.animals
  // let animalMap = {};
  // if (!options) {
  //   const { location } = animals;
  //   animalMap = Object.keys(location). //usar map ou reduce com filter

  // }
  // A função é responsável pelo mapeamento geográfico das espécies e 
  // seus animais, podendo ainda filtrá-los por ordem alfabética e gênero, por exemplo

  // **Observações técnicas**
  // - Analise o teste unitário para entender os retornos que são esperados para esta função
  // **O que será avaliado**

  // - Sem parâmetros, retorna animais categorizados por localização
  // - Com a opção `includeNames: true` especificada, retorna nomes de animais
  // - Com a opção `sorted: true` especificada, retorna nomes de animais ordenados
  // - Com a opção `sex: 'female'` ou `sex: 'male'` especificada, retorna somente nomes de animais macho/fêmea
  // - Com a opção `sex: 'female'` ou `sex: 'male'` especificada e a opção `sort: true` especificada, retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
  // - Só retorna informações ordenadas e com sexo se a opção `includeNames: true` for especificada
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
