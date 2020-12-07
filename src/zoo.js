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
  // return animals.filter((animal) => animal.id === ids.find((id) => animal.id === id));
  const animalArr = [];
  ids.forEach(animal => animalArr.push(animals.find(animalID => animalID.id === animal)));
  return animalArr;
  // seu código aqui
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function animalsOlderThan(animal, age) {
  return animals.find(thisAnimal => thisAnimal.name === animal)
    .residents.every(animalAge => animalAge.age >= age);
  // seu código aqui
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(employee => (employee.firstName === employeeName
    || employee.lastName === employeeName));
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
  // seu código aqui
}

function isManager(id) {
  return employees.some(thisEmployee => thisEmployee.managers.includes(id));
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push(
    {
      id,
      firstName,
      lastName,
      managers,
      responsibleFor,
    });
  // seu código aqui
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
  // seu código aqui
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const price = Object.keys(entrants);
  return price.reduce((total, thisPrice) => total + (entrants[thisPrice] * prices[thisPrice]), 0);
  // seu código aqui
}

function animalMap(options) {
  // if (options === undefined) {
  //   return animals.filter(animal => animal.location = [animal.name])
  // }
  // return animals.filter(animal => animal.location = (
  //   {
  //     animal,
  //   }
  // ))
  // seu código aqui
}

function schedule(dayName) {
  const days = Object.keys(hours);
  const week = days.reduce((acc, cur) => {
    if (cur === 'Monday') {
      acc[cur] = 'CLOSED';
      return acc;
    }
    acc[cur] = `Open from ${hours[cur].open}am until ${hours[cur].close - 12}pm`;
    return acc;
  }, {});
  if (dayName) {
    return { [dayName]: week[dayName] }
  }
  return week;
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const thisResponsibleFor = employees.find(employee => employee.id === id).responsibleFor[0];
  const thisAnimal = animals.find(animal => animal.id === thisResponsibleFor).residents;
  const thisOld = thisAnimal.sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = thisOld;
  return [name, sex, age];
  // seu código aqui
}

function increasePrices(percentage) {
  const calc = (1 + (percentage / 100));
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.round(prices[key] * calc * 100) / 100;
  });
  return prices;
  // https://pt.stackoverflow.com/questions/29318/javascript-gerando-float-com-v%C3%A1rias-casas-decimais
  // seu código aqui
}
// console.log(increasePrices(50));

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
