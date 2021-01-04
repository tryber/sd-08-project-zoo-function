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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(elemt => elemt.name === animal)
    .residents.every(elemt => elemt.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(
    elemt => elemt.firstName === employeeName || elemt.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return data.employees.filter(employee =>
    employee.managers.includes(id)).length > 0;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

const invalidEntry = entrants =>
  (!entrants) || (Object.keys(entrants).length === 0);

function entryCalculator(entrants) {
  if (invalidEntry(entrants)) return 0;
  const total = Object.entries(entrants)
  .reduce((acc, [kindOfTicket, amount]) => acc + (prices[kindOfTicket] * amount), 0);

  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  if (!dayName) {
    return Object.entries(hours).reduce((acc, [key, value]) => {
      acc[key] = value.open > 0
        ? `Open from ${value.open}am until ${value.close - 12}pm`
        : 'CLOSED';
      return acc;
    }, {});
  }
  if (dayName === 'Monday') return { [dayName]: 'CLOSED' };
  return {
    [dayName]: `Open from ${hours[dayName].open}am until ${
      hours[dayName].close - 12
    }pm`,
  };
}

function oldestFromFirstSpecies(id) {
  const employeeResponsable = employees.find(employee => employee.id === id)
    .responsibleFor[0];
  const animalsResidents = animals.find(
    animal => animal.id === employeeResponsable,
  ).residents;
  const oldAnimals = animalsResidents.sort((age1, age2) => age2.age - age1.age);
  return [oldAnimals[0].name, oldAnimals[0].sex, oldAnimals[0].age];
}

function increasePrices(percentage) {
  Object.entries(prices).forEach(([category, price]) => {
    const addedValue = (price * percentage) / 100;
    const total = Math.round((price + addedValue) * 100) / 100;
    prices[category] = total;
  });
  return prices;
}

const employeeObj = idOrName => data.employees.find(
  ({ id, firstName, lastName }) =>
    id === idOrName || firstName === idOrName || lastName === idOrName);

const fullName = ({ firstName, lastName }) => `${firstName} ${lastName}`;

const filterSpeciesResp = ({ responsibleFor }) => responsibleFor
.map(animalId => animals.find(animal => animal.id === animalId).name);

const withIdOrName = (idOrName) => {
  const employee = employeeObj(idOrName);

  const returnObj = {};
  returnObj[fullName(employee)] = filterSpeciesResp(employee);
  return returnObj;
};

const withoutIdOrName = () => data.employees
.reduce((acc, employee) => {
  acc[fullName(employee)] = filterSpeciesResp(employee);
  return acc;
}, {});

function employeeCoverage(idOrName) {
  if (!idOrName) return withoutIdOrName();
  return withIdOrName(idOrName);
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
