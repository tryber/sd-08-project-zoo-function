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
      accumulator + (entrants[currentValue] * prices[currentValue]),
    0,
  );
}

function getResidentsNames(animalName, sorted, sex) {
  let result = animals.find(animal => animal.name === animalName);
  result = result.residents;
  if (typeof sex === 'string') {
    result = result.filter(animal => animal.sex === sex);
  }
  result = result.map(resident => resident.name);
  if (sorted) result.sort();
  return { [animalName]: result };
}
function animalMap(options = {}) {
  // seu código aqui
  const { includeNames = false, sorted = false, sex } = options;
  let result = animals.reduce((acc, animal) => {
    const { name, location } = animal;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(name);
    return acc;
  }, {});
  if (includeNames) {
    result = Object.entries(result).reduce((acc, [key, animalName]) => {
      acc[key] = animalName.map(name => getResidentsNames(name, sorted, sex));
      return acc;
    }, {});
  }
  return result;
} // solução encontrada misturando os códigos do PS com os de Viviane.

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
  Object.keys(prices).forEach((item) => {
    prices[item] = Math.ceil(prices[item] * (100 + percentage)) / 100;
  });
}

const responsibleForAnimals = (responsibleFor = []) => {
  const res =
    responsibleFor.map(rf => data.animals.find(a => a.id === rf).name) || [];
  return res;
}; // .map + .find retornando um array conciso...observando o projeto de Viviane Florido;
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
  const foundEmployee = employees.find(employee => 
      employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName
  )
  
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
