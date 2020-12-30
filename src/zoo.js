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

const {
  animals, employees, hours, prices,
} = data;
const { Adult, Senior, Child } = prices;
function animalsByIds(...ids) {
  return animals.filter(idAnimal => ids.includes(idAnimal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(Element => Element.name === animal).residents.every
  (Element => Element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((Element) => {
    return (Element.firstName === employeeName || Element.lastName === employeeName)
  });
}

function createEmployee(personalInfo, associatedWith) {
  const obj = {};
  return Object.assign(obj, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(Element => (Element.managers.includes(id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((previousValue, currentValue) => {
      previousValue[currentValue.name] = currentValue.residents.length;
      return previousValue;
    }, {});
  }
  return animals.find(Element => (species === Element.name)).residents.length;
}

function entryCalculator(entrants = 0) {
  const { Adult: adultValue = 0, Senior: seniorValue = 0, Child: childValue = 0 } = entrants;
  return (adultValue * Adult) + (childValue * Child) + (seniorValue * Senior);
}

function animalMap(options) {

}

function schedule(dayName) {
  const obj = {};
  let arrObj = [];
  arrObj = Object.keys((hours));
  if (dayName === undefined || dayName.length < 1) {
    arrObj.forEach((Element) => {
      if (Element === 'Monday') {
        obj[Element] = 'CLOSED';
      } else {
        obj[Element] = `Open from ${hours[Element].open}am until ${hours[Element].close - 12}pm`;
      }
    });
  } else {
    if (dayName === 'Monday') {
      obj[dayName] = 'CLOSED';
    } else {
      obj[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
    }
  }
  return obj;
}

function oldestFromFirstSpecies(id) {
  let animalAge = 0;
  let firstAnima;
  const animalList = employees.find((Element => Element.id === id)).responsibleFor[0];
  animals.find(Element => Element.id === animalList).residents.forEach((Element) => {
    if (Element.age > animalAge) {
      animalAge = Element.age;
      firstAnima = Object.values(Element);
    }
  });
  return firstAnima;
}

function increasePrices(percentage) {
  Object.entries(prices).forEach(([key, values]) => {
    prices[key] = Math.round((values * (1 + (percentage / 100))) * 100) / 100;
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
