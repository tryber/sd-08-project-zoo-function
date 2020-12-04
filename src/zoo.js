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

// const noParameter = () => {
//   const result = {}
//   animals.forEach(({ location = '', name }) => {
//     if (result[location] === undefined) {
//       result[location] = [];
//       result[location] = [ name ];
//     }
//     else {
//       const resLocation = result[location]
//       resLocation.push(name)
//     }
//   })
//   return result;
// }

function animalMap(obj) {
  // seu código aqui
}

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
      const inicio = Object.values(elem[1])[0]
      const termino = Object.values(elem[1])[1] - 12
      obj[elem[0]] = 'Open from ' + inicio + 'am until ' + termino + 'pm';
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
