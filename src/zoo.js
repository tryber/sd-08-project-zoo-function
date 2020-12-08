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
  return animals.filter(animal => ids.find(idAnimal => animal.id === idAnimal));
}
console.log(animalsByIds());

function animalsOlderThan(animal, age) {
  return animals.find(animalCallBack => animalCallBack.name === animal)
  .residents.every(resident => resident.age > age);
}
console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees
  .find(name => name.firstName === employeeName || name.lastName === employeeName);
}
console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees
  .some(person => person.managers
    .some(manager => manager === id));
}
  /* console.log(`${person.managers[1]} === ${id}`);*/
    /* console.log(`${manager} === ${id}`);*/
console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees
  .push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  // seu código aqui
}
// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));
// console.log(employees.length);
// console.log(employees[8]);
// console.log(employees);

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((result, currentValue) => {
      result[currentValue.name] = currentValue.residents.length;
      return result;
    }, {});
  }
  return animals.find(animalSpecie => species === animalSpecie.name).residents.length;
  // seu código aqui
}
// console.log(animalCount('lions'));

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const arrayEntrants = Object.keys(entrants);
  // console.log(arrayEntrants);
  return arrayEntrants.reduce((result, value) => result + (prices[value] * entrants[value]), 0);
    // console.log((result));
    // console.log(`${entrants[currentValue]} ${prices[currentValue]}`);
  // seu código aqui
}
// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const arrayDay = Object.keys(data.hours);
  const objDay = {};
  if (dayName !== undefined) {
    objDay[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
    return objDay;
  }
  if (dayName === 'Monday') {
    objDay[dayName] = 'CLOSED';
    return objDay;
  }
  const returnUndefined = arrayDay.reduce((result, currentValue) => {
    result[currentValue] = `Open from ${hours[currentValue].open}am until ${hours[currentValue].close - 12}pm`;
    return result;
  }, {});
  returnUndefined.Monday = 'CLOSED';
// console.log(arrayDay);
  return returnUndefined;
  // seu código aqui
}
// console.log(schedule('Monday'));

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const priceKeys = Object.keys(prices);
  // console.log(priceKeys);
  priceKeys.forEach((addPrice) => {
    // console.log(`${addPrice} ${prices[addPrice]} * ${(1 + percentage / 100)}`);
    prices[addPrice] = Math.round(prices[addPrice] * (1 + (percentage / 100)) * 100) / 100;
    // console.log(data.prices);
  });
  // seu código aqui
}
// console.log(increasePrices(50));

function employeeCoverage(idOrName) {
  // if (idOrName === undefined) {

  // }
  // const search = data.employees.find((employee) => {
  //   console.log(`${employee.lastName}`);
  //   return employee.id === idOrName ||
  //   employee.firstName === idOrName ||
  //   employee.lastName === idOrName
  // });
  // console.log(search);
  // seu código aqui
}
console.log(employeeCoverage('Azevado'));

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
