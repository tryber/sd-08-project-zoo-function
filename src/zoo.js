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
  return data.animals.filter(animals => ids[0] === animals.id || ids[1] === animals.id);
}

function animalsOlderThan(animal, age) {
  const nameAnimal = data.animals.find(findAnimal => animal === findAnimal.name).residents;
  return nameAnimal.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees
  .find(person => person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return data.employees
  .some(persons => persons.managers.find(managerID => managerID === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acummulator, currentValue) => {
      acummulator[currentValue.name] = currentValue.residents.length;
      return acummulator;
    }, {});
  }
  return data.animals
  .find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  return Object.keys(entrants)
  .reduce((previusValue, currentValue) =>
  previusValue + (entrants[currentValue] * data.prices[currentValue]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const result = Object.entries(data.hours).reduce((accumulator, [key, value]) => {
    if (value.open <= 0 || value.close <= 0) {
      accumulator[key] = 'CLOSED';
    } else {
      accumulator[key] = `Open from ${value.open}am until ${value.close % 12}pm`;
    }
    return accumulator;
  }, {});
  if (dayName !== undefined) {
    return { [dayName]: result[dayName] };
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const responsibleAnimalID = data.employees
  .find(employeesID => employeesID.id === id).responsibleFor[0];
  const residents = data.animals.find(animal => animal.id === responsibleAnimalID).residents;
  const oldestAnimal = residents.map(age => age.age)
  .reduce((pValue, cValue) => Math.max(pValue, cValue));
  return Object.values(residents.find(animals => animals.age === oldestAnimal));
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
