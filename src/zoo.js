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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const id = ids;
  const animalById = animals.filter((animal, index) => animal.id === id[index]);
  return animalById;
}

const arrayAvrg = ((array) => {
  let sum = 0;
  array.forEach((item) => {
    sum += item;
  });
  return sum;
});

function animalsOlderThan(animal, age) {
  const animalFound = animals.filter(eachAnimal => eachAnimal.name === animal);
  const arrayOfAge = animalFound[0].residents.map(resident => resident.age);
  const sum = arrayAvrg(arrayOfAge);
  if (sum / arrayOfAge.length > age) {
    return true;
  } return false;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const getEmployeeByFirstName = employees.find(employee => employee.firstName === employeeName);
  const getEmployeeByLastName = employees.find(employee => employee.lastName === employeeName);
  if (getEmployeeByFirstName !== undefined) {
    return getEmployeeByFirstName;
  }
  if (getEmployeeByLastName !== undefined) return getEmployeeByLastName;
  return true;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers:
      associatedWith.managers,
    responsibleFor:
      associatedWith.responsibleFor,
  };
}

function isManager(id) {
  const managerIds = employees.map(manager => manager.managers);
  return managerIds.some((manageres, index) => manageres[index] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) {
    managers = [];
  }
  if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const animalNames = animals.map(animal => animal.name);
    const quantityOfAnimais = animals.map(animal => animal.residents.length);
    const speciesAndQuantityOfEach = animalNames.reduce((acc, currvalue, index) => {
      acc[currvalue] = quantityOfAnimais[index];
      return acc;
    }, {});
    return speciesAndQuantityOfEach;
  }
  const quantityOfSpecie = animals.find(animal => animal.name === species);
  return quantityOfSpecie.residents.length;
}

const compareEntrantsAndPrices = (faixasEntrada, faixasTabela) => {
  const arrayOfEntrants = faixasTabela.map((faixa) => {
    const isEntrant = faixasEntrada.includes(faixa);
    if (isEntrant === true) return faixa;
    return false;
  });
  return arrayOfEntrants;
};

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  if (Object.keys(entrants).length === 0) return 0;
  const eentry = entrantss => Object.keys(entrantss);
  const faixasEntrada = eentry(entrants);
  const kombi = pricess => Object.keys(pricess);
  const faixasTabela = kombi(prices);
  const arrayOfEntrants = compareEntrantsAndPrices(faixasEntrada, faixasTabela);
  let total = 0;
  arrayOfEntrants.forEach((person) => {
    if (person) { total += (entrants[person] * prices[person]); }
  });
  return total;
}

function animalMap(options) {
}

function schedule(dayName) {
  const arrayOfDays = Object.keys(hours);
  const array = Object.values(hours);
  const arrayOfClosedPM = array.map(hour => hour.close - 12);
  const obj = {};
  const agenda = arrayOfDays.map((day, index) => {
    if (day === 'Monday') {
      obj[day] = 'CLOSED';
      return obj;
    }
    obj[day] = `Open from ${array[index].open}am until ${arrayOfClosedPM[index]}pm`;
    return obj;
  });

  if (dayName === undefined) {
    return agenda[0];
  }
  const objEspec = {};
  objEspec[dayName] = agenda[0][dayName];
  return objEspec;
}

function oldestFromFirstSpecies(id) {
  const employeeById = employees.find(employee => employee.id === id);
  const firstSpecieId = employeeById.responsibleFor[0];
  const firstSpecieObj = animals.find(animal => animal.id === firstSpecieId);
  const arrayOfAge = firstSpecieObj.residents.map(specie => specie.age);
  const sortedArray = arrayOfAge.sort((a, b) => a - b);
  const oldie = sortedArray[sortedArray.length - 1];
  const oldieAnimal = firstSpecieObj.residents.find(specie => specie.age === oldie);
  return [oldieAnimal.name, oldieAnimal.sex, oldieAnimal.age];
}


function increasePrices(percentage) {
  const priceByAge = Object.keys(prices);
  priceByAge.forEach((age) => {
    const num = (prices[age] + (prices[age] * (percentage / 100)));
    prices[age] = (Math.round(num * 100) / 100);
  });
  return prices;
}

function findById(id) {
  const animalsObj = animals.find((animal) => {
    if (animal.id === id) {
      return animal;
    }
    return false;
  });
  return animalsObj.name;
}

function getGullnameOfEmployee() {
  return employees.map(employee => `${employee.firstName} ${employee.lastName}`);
}

function getArrayNamesAnimals(arrayOfAnimalsByEmployee) {
  return arrayOfAnimalsByEmployee.map(each => each.map(animalId => findById(animalId)));
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const fullnameOfEmployee = getGullnameOfEmployee();
    const arrayOfAnimalsByEmployee = employees.map(employee => employee.responsibleFor);
    const arrayNamesAnimals = getArrayNamesAnimals(arrayOfAnimalsByEmployee);

    return fullnameOfEmployee.reduce((acc, curr, index) => {
      acc[curr] = arrayNamesAnimals[index];
      return acc;
    }, {});
  }

  let employeeObj = null;

  if (employees.find(employee => employee.id === idOrName)) {
    employeeObj = employees.find(employee => employee.id === idOrName);
  } else if (employees.find(employee => employee.firstName === idOrName)) {
    employeeObj = employees.find(employee => employee.firstName === idOrName);
  } else {
    employeeObj = employees.find(employee => employee.lastName === idOrName);
  }

  const ops = employeeObj.responsibleFor.map(each => findById(each));
  const fullName = `${employeeObj.firstName} ${employeeObj.lastName}`;

  const newObj = {};
  const newKey = fullName;
  newObj[newKey] = ops;

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
