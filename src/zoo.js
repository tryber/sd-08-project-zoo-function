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

const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...args) {
  // seu código aqui
  const animais = [];
  args.forEach((id) => {
    data.animals.forEach((animal) => {
      if (animal.id === id) {
        animais.push(animal);
      }
    });
  });
  return animais;
}

// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function animalsOlderThan(animal, age) {
  // seu código aqui
  const listaDeAnimais = data.animals;
  let temIdade = true;
  let especimes;
  listaDeAnimais.forEach((atual) => {
    if (atual.name === animal) {
      especimes = atual.residents;
    }
  });
  especimes.forEach((especime) => {
    if (especime.age < age) {
      temIdade = false;
    }
  });
  return temIdade;
}

// console.log(animalsOlderThan('otters', 7))
// console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  // seu código aqui
  const employee = {};
  employees.forEach((objFunc) => {
    if (objFunc.firstName === employeeName || objFunc.lastName === employeeName) {
      Object.assign(employee, objFunc);
    }
  });
  return employee;
}

// console.log(employeeByName("Elser"))

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
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
