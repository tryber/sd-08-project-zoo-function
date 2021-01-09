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

const {
  animals, employees, prices, hours,
} = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (!ids) return [];
  return animals.filter(animal => ids.find(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find(a => {
      a.name = animal;
      return a;
    })
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees.find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some(someId => someId.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.keys(entrants) === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const adultValor = prices.Adult * Adult;
  const seniorValor = prices.Senior * Senior;
  const childValor = prices.Child * Child;
  const total = (adultValor + seniorValor + childValor).toFixed(2);
  return Number(total);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const myArray = {};
  const horas = Object.entries(hours);
  horas.forEach(element => {
    const key = element[0];
    if (element[0] === 'Monday') {
      myArray[`${key}`] = 'CLOSED';
      return;
    }
    myArray[`${key}`] = `Open from ${element[1].open}am until ${element[1].close - 12}pm`;
  });
  if (dayName === undefined) {
    return myArray;
  }
  const array = Object.entries(myArray);
  const weekDay = array.find(key => key[0] === dayName);
  const key = weekDay[0];
  const value = weekDay[1];
  const resultado = {};
  resultado[`${key}`] = value;
  return resultado;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(animal => animal.id === id);
  const animalCared = animals.find(anim => anim.id === Object.values(employee.responsibleFor)[0]);
  let residentsAge = 0;
  let output;
  animalCared.residents.forEach(animal => {
    if (residentsAge < animal.age) {
      residentsAge = animal.age;
      output = Object.values(animal);
    }
  });
  return output;
}

function increasePrices(percentage) {
  // seu código aqui
  const increase = 1 + (percentage / 100);
  prices.Adult = +((prices.Adult *= increase) + 0.001).toFixed(2);
  prices.Senior = +((prices.Senior *= increase) + 0.001).toFixed(2);
  prices.Child = +((prices.Child *= increase) + 0.001).toFixed(2);

  return prices;
}

const getAnimal = animalId => {
  const output = [];

  for (let index = 0; index < animalId.length; index += 1) {
    animals.forEach(animal => {
      if (animalId[index] === animal.id) {
        output.push(animal.name);
      }
    });
  }
  return output;
};

const getAllEmployee = () => {
  const output = {};
  employees.map(person => {
    const fullname = `${person.firstName} ${person.lastName}`;
    const animalsId = person.responsibleFor;
    const animalsName = getAnimal(animalsId);
    const obj = { [fullname]: animalsName };
    return Object.assign(output, obj);
  });
  return output;
};

function employeeCoverage(idOrName) {
  let output = {};
  if (idOrName === undefined) {
    return getAllEmployee();
  }
  const getEmployee = employees.find(person => {
    const { id, firstName, lastName } = person;
    return id === idOrName || firstName === idOrName || lastName === idOrName;
  });
  const fullname = `${getEmployee.firstName} ${getEmployee.lastName}`;
  const animalId = getEmployee.responsibleFor;
  output = { [fullname]: getAnimal(animalId) };

  return output;
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
