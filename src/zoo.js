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
  animals, employees, prices,
} = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  const animal = [];
  ids.forEach(param => animal.push(animals.find(obj => obj.id === param)));
  return animal;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalIdade = animals.find(param => param.name === animal)
    .residents.every(idade => idade.age > age);
  return animalIdade;
}

function employeeByName(employeeName) {
  // seu código aqui
  const primeiroNome = employees.find(name => name.firstName === employeeName);
  const ultimoNome = employees.find(lastname => lastname.lastName === employeeName);
  if (primeiroNome) {
    return primeiroNome;
  } else if (ultimoNome) {
    return ultimoNome;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const novoColaborador = Object.assign({}, personalInfo, associatedWith);
  return novoColaborador;
}

function isManager(id) {
  // seu código aqui
  const colaborador = employees.some(param => param.managers.find(ids => ids === id));
  return colaborador;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const novoFuncionário = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(novoFuncionário);
}

function animalCount(species) {
  // seu código aqui
  const obj = {};
  if (species === undefined) {
    animals.forEach((xablau) => {
      const resid = xablau.residents.length;
      const animal = xablau.name;
      obj[animal] = resid;
    });
    return obj;
  }
  return animals.find(param => param.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function animalMap(options) {
  // seu código aqui

}

function schedule(dayName) {
  // seu código aqui
  const obj = {};
  Object.entries(data.hours).forEach(({ 0: chave, 1: valor }) => {
    const { open, close } = valor;
    if (dayName === chave || !dayName) {
      obj[chave] = (open === 0 && close === 0) ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`;
    }
  });
  return obj;
}
console.log(schedule());

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
