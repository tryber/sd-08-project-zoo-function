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
  // seu código aqui
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find(species => species.name === animal)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees.find(
    employee =>
      employeeName === employee.firstName || employeeName === employee.lastName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some(managerTorF => managerTorF.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
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
    return animals.reduce((accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.residents.length;
      return accumulator;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (typeof entrants !== 'object' || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce(
    (accumulator, currentValue) =>
      (accumulator + entrants[currentValue]) * prices[currentValue],
    0,
  );
}

function animalMap(options) {
  // seu código aqui
  // const { includeNames, sorted, sex } = options;
  if (!options)
    const noParam = animals.reduce((acc, currentValue) => {
      const { name, location } = currentValue;
      if (!acc[location]) {
        // sacada para 'dibrar' o reduce ficar só com 1 array do PS.
        acc[location] = [];
      }
      acc[location].push(name);
      return acc;
    }, {});
  return noParam;
}

function schedule(dayName) {
  // seu código aqui
  const theReturn = Object.entries(hours).reduce(
    (acc, [day, { open, close }]) => {
      // descoberta a incrível possibilidade de passar array E objeto como parâmetros...
      // vendo plantões do Paulo Simões.
      if (open - close === 0) {
        acc[day] = 'CLOSED';
      } else {
        acc[day] = `Open from ${open}am until ${close - 12}pm`;
      }
      return acc;
    },
    {},
  );

  if (dayName) {
    return { [dayName]: theReturn[dayName] };
  }
  return theReturn;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const employeee = employees.find(employee => employee.id === id);
  const responsible = employeee.responsibleFor.map(responsability =>
    animals.find(animal => animal.id === responsability),
  );
  const oldest = responsible[0].residents.reduce((first, second) => {
    if (first.age > second.age) {
      return first;
    }
    return second;
  });
  return Object.values(oldest);
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(prices).forEach(item => {
    prices[item] = Math.ceil(prices[item] * (100 + percentage)) / 100;
  });
}

const responsibleForAnimals = (responsibleFor = []) => {
  const res =
    responsibleFor.map(rf => data.animals.find(a => a.id === rf).name) || [];
  return res;
}; // descoberta possibilitade de ter uma função exclusiva .map + .find retornando um array conciso...
// ...observando o projeto de Viviane Florido;
function employeeCoverage(idOrName) {
  // seu código aqui
  const result = {};

  if (!idOrName) {
    employees.forEach(
      employee =>
        (result[
          `${employee.firstName} ${employee.lastName}`
        ] = responsibleForAnimals(employee.responsibleFor)),
    );
    return result;
  }

  const foundEmployee = employees.find(employee => {
    return (
      employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName
    );
  });
  result[
    `${foundEmployee.firstName} ${foundEmployee.lastName}`
  ] = responsibleForAnimals(foundEmployee.responsibleFor);
  return result;
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
