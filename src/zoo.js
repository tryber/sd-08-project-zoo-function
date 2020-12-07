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
  const result = [];
  ids.forEach(id => result.push(animals.find(Element => Element.id === id)));
  return result;
}

function animalsOlderThan(animal, age2) {
  const species = animals.find(({ name }) => name === animal).residents;
  return species.every(({ age }) => age >= age2);
}


function employeeByName(employeeName) {
  let result = employees.find(({ firstName, lastName }) =>
  employeeName === firstName || employeeName === lastName);
  if (employeeName === undefined) {
    result = {};
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(({ managers }) => managers.some(index => index === id));
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

const animalsCount = () => {
  const result = {};
  animals.forEach(({ name, residents }) => { result[name] = residents.length; });
  return result;
};

function animalCount(species) {
  if (species === undefined) {
    return animalsCount();
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entries) {
  if (typeof (entries) !== 'object') { return 0; }
  const { Adult = 0, Child = 0, Senior = 0 } = entries;
  const adultPrice = prices.Adult * Adult;
  const childPrice = prices.Child * Child;
  const seniorPrice = prices.Senior * Senior;
  const totalPrice = adultPrice + childPrice + seniorPrice;
  return totalPrice;
}
// console.log(entryCalculator())
// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }))
// console.log(entryCalculator({}))

//------------------------------------------------------------------
function animalMap() {}
// -----------------------------------------------------------------
function scheduleNoParam() {
  const result = {};
  const arrayHours = Object.entries(hours);
  arrayHours.forEach((Element) => {
    result[Element[0]] = `Open from ${Object.values(Element[1])[0]}am until ${Object.values(Element[1])[1] - 12}pm`;
    if (Object.values(Element[1])[0] === 0) {
      result[Element[0]] = 'CLOSED';
    }
  });
  return result;
}

function scheduleDay(day) {
  const obj = {};
  const arrayHours = Object.entries(hours);
  arrayHours.forEach((elem) => {
    if (elem[0] === day) {
      const inicio = Object.values(elem[1])[0];
      const termino = Object.values(elem[1])[1] - 12;
      obj[elem[0]] = `Open from ${inicio}am until ${termino}pm`;
      if (Object.values(elem[1])[0] < 1) {
        obj[elem[0]] = 'CLOSED';
      }
    }
  });
  return obj;
}

function schedule(dayName) {
  if (dayName === undefined) {
    return scheduleNoParam();
  }
  return scheduleDay(dayName);
}
// console.log(schedule('Tuesday'))
// console.log(schedule('Monday'));
// console.log(schedule())

function oldestFromFirstSpecies(ident) {
  const employeeWithId = employees.find(({ id }) => id === ident);
  const animalId = employeeWithId.responsibleFor[0];
  const result = [];
  const animal = animals.find(elem => elem.id === animalId);
  const animalSorted = animal.residents.sort((a, b) => b.age - a.age);
  const { name, sex, age } = animalSorted[0];
  result.push(name, sex, age);
  return result;
}
// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'))

function increasePrices(percentage) {
  const arrayPrices = Object.entries(prices);
  arrayPrices.forEach((Element) => {
    const newValor = Element[1] + (percentage * 0.01 * Element[1]) + 0.005;
    prices[Element[0]] = parseFloat(newValor.toFixed(2));
  });
}

function animalsFilter(respF, Object) {
  respF.forEach((Element) => {
    animals.forEach(({ id, name }) => {
      if (Element === id) {
        Object.push(name);
      }
    });
  });
}
function employeeNoParameter() {
  const result = {};
  employees.forEach(({ firstName, lastName, responsibleFor }) => {
    result[`${firstName} ${lastName}`] = [];
    animalsFilter(responsibleFor, result[`${firstName} ${lastName}`]);
  });
  return result;
}

function animalsPerEmployee(emp, result) {
  emp.responsibleFor.forEach(elem => animals.forEach(({ id, name }) => {
    if (elem === id) {
      result[`${emp.firstName} ${emp.lastName}`].push(name);
    }
  }));
}
function findEmployee(iD) {
  const result = {};
  const emp = employees.find(({ id, firstName, lastName }) =>
  id === iD || firstName === iD || lastName === iD);
  result[`${emp.firstName} ${emp.lastName}`] = [];
  animalsPerEmployee(emp, result);
  return result;
}


function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return employeeNoParameter();
  }
  return findEmployee(idOrName);
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
