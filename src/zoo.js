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

const { animals, employees, hours, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(animalObj => animalObj.name === animal)
        .residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  return (employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName,
  ) || {});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species)
        .residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce(
    (acc, curr) => acc + (data.prices[curr] * entrants[curr]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const ret = Object.entries(hours).reduce((acc, [key, value]) => {
    const { open, close } = value;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (typeof dayName === 'string' && dayName.length > 0) return { [dayName]: ret[dayName] };
  return ret;
}

function oldestFromFirstSpecies(id) {
  const responsible = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalObj = animals.find(animalId => animalId.id === responsible).residents;
  const olderAnimal = animalObj.reduce((acc, curr) => (
    curr.age > acc.age ? curr : acc
  ));
  return Object.values(olderAnimal);
}

function increasePrices(percentage) {
  return Object.keys(prices).forEach((key) => {
    const newPrices = prices[key] + (((prices[key] * percentage) / 100) + 0.005);
    prices[key] = parseFloat(newPrices.toFixed(2));
  });
}

const animalId = (responsibleFor = []) => {
  const result = responsibleFor.map(responsible => animals.find(animal =>
    animal.id === responsible).name)
    || [];
  return result;
};

function employeeCoverage(idOrName) {
  const result = {};
  if (!idOrName) {
    employees.forEach((employee) => {
      const { firstName, lastName, responsibleFor } = employee;
      result[`${firstName} ${lastName}`] = animalId(responsibleFor);
    });
    return result;
  }
  const employee = employees.find(
    emp => emp.id === idOrName || emp.firstName === idOrName
    || emp.lastName === idOrName,
  );
  const { firstName, lastName, responsibleFor } = employee;
  result[`${firstName} ${lastName}`] = animalId(responsibleFor);
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
