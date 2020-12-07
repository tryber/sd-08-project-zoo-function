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

const { animals } = data;
const { employees } = data;
let { prices } = data;
const { hours } = data;

function animalsByIds(...ids) {
  return animals.filter((animalInfo) => ids.includes(animalInfo.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find((animalInfo) => animalInfo.name === animal)
    .residents.every((resident) => resident.age > age);
}

function employeeByName(employeeName) {
  return (
    employees.find(
      (employeeInfo) =>
        employeeInfo.firstName === employeeName ||
        employeeInfo.lastName === employeeName
    ) || {}
  );
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some((employeeInfo) => employeeInfo.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) {
  employees.push(
    createEmployee({ id, firstName, lastName }, { managers, responsibleFor })
  );
}

function animalCount(species) {
  const speciesCount = animals.find(
    (animalInfo) => animalInfo.name === species
  );

  const animalListCount = animals.reduce((accumulator, animalInfo) => {
    accumulator[animalInfo.name] = animalInfo.residents.length;
    return accumulator;
  }, {});

  return species === undefined
    ? animalListCount
    : speciesCount.residents.length;
}

function entryCalculator(entrants = 0) {
  let entrySum = 0;
  Object.entries(entrants).forEach((entry) => {
    if (entry[0] === 'Adult') {
      entrySum += prices.Adult * entry[1];
    } else if (entry[0] === 'Child') {
      entrySum += prices.Child * entry[1];
    } else {
      entrySum += prices.Senior * entry[1];
    }
  });
  return entrySum;
}

function animalsByLocation() {
  return animals.map((animalInfo) => animalInfo.location + animalInfo.name);
}

function residentsByName() {
  return animals;
}
function animalMap(options) {
  return animalsByLocation();

  // let testando = 0;
  // Object.entries(options).forEach(option => {
  //   if (option[0] === 'includeNames' && option[1] === true) {
  //     testando = 2;
  //   }
  // });
  // return testando;
}
// const options = { includeNames: true, sex: 'female', sorted: true }
// console.log(animalMap(options));

function schedule(dayName) {
  const schedule = Object.entries(hours).reduce((accumulator, day) => {
    accumulator[day[0]] =
      day[0] !== 'Monday'
        ? `Open from ${Object.values(day[1])[0]}am until ${
            Object.values(day[1])[1] - 12
          }pm`
        : 'CLOSED';
    return accumulator;
  }, {});

  if (dayName === undefined) return schedule;

  for (const key in schedule) {
    if (dayName === key) return { [key]: schedule[key] };
  }
}

function oldestFromFirstSpecies(id) {
  const firstId = employees.find((employeeInfo) => employeeInfo.id === id)
    .responsibleFor[0];
  const residentsById = animalsByIds(firstId)[0].residents;
  let oldestAge = null;

  residentsById.forEach((resident) => {
    oldestAge < resident.age ? (oldestAge = resident.age) : oldestAge;
  });

  const oldestFromSpecies = residentsById.find(
    (resident) => resident.age === oldestAge
  );
  return Object.values(oldestFromSpecies);
}

function increasePrices(percentage) {
    prices = Object.entries(prices).reduce((accumulator, priceInfo) => {
    accumulator[priceInfo[0]] =
      Math.ceil((priceInfo[1] + priceInfo[1] * (percentage / 100)) * 100) / 100;
      data.prices = accumulator;
      return accumulator;
  }, {});
  return prices;
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
