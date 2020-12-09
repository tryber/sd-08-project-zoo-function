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
  // seu código aqui
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

const getArrayOfAnimalsByRegion = (locations, animals) => {
  return locations.map(location => animals.filter((animal) => animal.location === location));
};

const getArrayAnimalsByRegions = (arrayOfAnimalsByRegion) => {
  return arrayOfAnimalsByRegion.map(region => region.map((name) => name.name));
};

const getobjectOfRegions = () => {
  return animals.reduce((acc, currvalue) => {
    acc[currvalue.location] = [];
    return acc;
  }, {});
};

function animalMap(options) {
}

function schedule(dayName) {
  const arrayOfDays = Object.keys(hours);
  const array = Object.values(hours);
  const arrayOfClosedPM = array.map(hour => hour.close - 12);
  let obj = {}
  const agenda = arrayOfDays.map((day, index) => {
    if (day === 'Monday') {
      obj[day] = 'CLOSED';
      return obj;
    };
    obj[day] = `Open from ${array[index].open}am until ${arrayOfClosedPM[index]}pm`;
    return obj;
  });

  if (dayName == undefined) {
    return agenda[0];
  }
  if (dayName) {
    let objEspec = {}
    objEspec[dayName] = agenda[0][dayName]
    return objEspec;
  }
}

console.log(schedule('Tuesday'))


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
