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
  const retorno = data.animals.filter(elemento => ids.includes(elemento.id));

  return retorno;
}

function animalsOlderThan(animal, age) {
  const animalBuscado = data.animals.find(
    elemento => elemento.name === animal,
  );
  return animalBuscado.residents.every(elemento => elemento.age > age);
}

function employeeByName(employeeName) {
  const retorno = data.employees.find(
    element =>
      element.firstName === employeeName || element.lastName === employeeName,
  );

  if (employeeName) {
    return retorno;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const retorno = data.employees.some(element =>
    element.managers.includes(id),
  );
  return retorno;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []) {
  const retorno = data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return retorno;
}

function animalCount(species) {
  let animais = {};
  data.animals.forEach((animal) => {
    if (!species) {
      animais[animal.name] = animal.residents.length;
    } else {
      const animalBuscado = data.animals.find(
        elemento => elemento.name === species,
      );
      animais = animalBuscado.residents.length;
    }
  });
  return animais;
}

function entryCalculator(entrants) {
  const arrayPreco = Object.values(data.prices);

  let precoTotal = 0;

  if (!entrants) {
    precoTotal = 0;
    return precoTotal;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  precoTotal = (Adult * arrayPreco[0]) + (Child * arrayPreco[2]) + (Senior * arrayPreco[1]);

  return precoTotal;
}

function animalMap(options) {
  data.animals.reduce((acc, animal) => {
    const { name, location } = animal;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(name);
    return acc;
  }, {})
}


function schedule(dayName) {
  const result = Object.entries(data.hours).reduce((acumulador, [key, val]) => {
    const { open, close } = val;
    acumulador[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acumulador;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) {
    return {
      [dayName]: result[dayName],
    };
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const empregado = data.employees.find(employee => employee.id === id);
  const primeiraEspecie = empregado.responsibleFor[0];
  const animal = animalsByIds(primeiraEspecie)[0];
  const { residents } = animal;
  const maiorIdade = residents.reduce((maisVelho, atual) =>
    (atual.age > maisVelho.age ? atual : maisVelho));

  return Object.values(maiorIdade);
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach(key =>
    (data.prices[key] = Math.round(data.prices[key] * (1 + (percentage / 100)) * 100) / 100));
}

function employeeById(id) {
  return data.employees.find(employee => employee.id === id);
}
function employeeCoverage(idOrName) {
  const retorno = data.employees.reduce((acc, employee) => {
    const { firstName, lastName, responsibleFor } = employee;
    acc[`${firstName} ${lastName}`] = responsibleFor.map(
      id => animalsByIds(id)[0].name,
    );
    return acc;
  }, {});
  if (typeof idOrName === 'string' && idOrName.length !== 0) {
    const empregado = employeeByName(idOrName) || employeeById(idOrName);
    const { firstName, lastName } = empregado;
    const name = `${firstName} ${lastName}`;
    return { [name]: retorno[name] };
  }
  return retorno;
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
