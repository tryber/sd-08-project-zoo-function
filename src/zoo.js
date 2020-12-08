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

const animalsByIds = (...args) => animals.filter(({ id }) => args.some(value => value === id));

const animalsOlderThan = (animal, age) => {
  const res = animals.some(e => e.residents.every(value => e.name === animal && value.age > age));
  return res;
};

const employeeByName = employeeName => {
  if (!employeeName) return {};
  return employees.find(v => v.firstName === employeeName || v.lastName === employeeName);
};

const createEmployee = (info, awith) => ({ ...info, ...awith });

const isManager = id => {
  const res = employees.some(element => element.id === id && element.managers.length === 1);
  return res;
};

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const res = employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return res;
};

const animalCount = species => {
  if (!species) {
    const allResidents = {};
    animals.forEach(element => (allResidents[element.name] = element.residents.length));
    return allResidents;
  }

  return animals.find(ele => ele.name === species).residents.length;
};

const entryCalculator = entrants => {
  if (!entrants || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const price1 = prices.Adult * Adult;
  const price2 = prices.Senior * Senior;
  const price3 = prices.Child * Child;
  return price1 + price2 + price3;
};

function animalMap(options) {
  // seu código aqui
}

const schedule = dayName => {
  let objHours = {};
  Object.keys(hours).forEach(element => {
    const keyWeek = dayName || element;
    objHours = {
      ...objHours,
      [keyWeek]: `Open from ${hours[keyWeek].open}am until ${hours[keyWeek].close - 12}pm`,
    };
    if (keyWeek === 'Monday') {
      objHours[keyWeek] = 'CLOSED';
    }
  });
  return objHours;
};
const oldestFromFirstSpecies = id => {
  const responsavel = employees.find(element => element.id === id);
  const animais = animals.find(specie => specie.id === responsavel.responsibleFor[0]);
  const reduz = animais.residents.reduce((acc, value) => {
    if (acc.age > value.age) return acc;
    return value;
  });
  return Object.values(reduz);
};

function increasePrices(percentage) {
  const aumento = ((percentage / 100) + 1);
  prices.Adult = Math.round(prices.Adult * 100 * aumento) / 100;
  prices.Senior = Math.round(prices.Senior * 100 * aumento) / 100;
  prices.Child = Math.round(prices.Child * 100 * aumento) / 100;
  return prices;
}

// Desafio 13

// procura o nome os animais de acordo com o id dos funcionarios responsaveis
const animaisCuidados = element => element.map(id => animals.find(animal => animal.id === id).name);

const employeeCoverage = idOrName => {
  let array = {};
  employees.forEach(element => {
    array = {
      ...array,
      [`${element.firstName} ${element.lastName}`]: animaisCuidados(element.responsibleFor),
    };
  });
  if (!idOrName) return array;
  const funcionario = employees.find(
    empregado => empregado.id === idOrName
        || empregado.firstName === idOrName
        || empregado.lastName === idOrName,
  );
  const nomeEmpregado = `${funcionario.firstName} ${funcionario.lastName}`;
  return { [nomeEmpregado]: array[nomeEmpregado] };
};
console.log(employeeCoverage());

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
