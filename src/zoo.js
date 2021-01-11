const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(animais => ids.includes(animais.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(animais => animais.name === animal)
    .residents.every(animais => animais.age >= age);
}

function employeeByName(employeeName) {
  return employeeName === undefined
    ? {}
    : data.employees.find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some(manager => manager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  return species
    ? data.animals.find(animal => animal.name === species).residents.length
    : data.animals.reduce((counter, obj) => {
      counter[obj.name] = obj.residents.length;
      return counter;
    }, {});
}

function entryCalculator(entrants) {
  return entrants
    ? Object.keys(entrants).reduce(
      (counter, current) => counter + (data.prices[current] * entrants[current]), 0,
    )
    : 0;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const agenda = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName !== undefined) {
    return { [dayName]: agenda[dayName] };
  }
  return agenda;
}

function oldestFromFirstSpecies(id) {
  const thisResponsibleFor = employees.find(employee => employee.id === id).responsibleFor[0];
  const thisAnimals = animals.find(animal => animal.id === thisResponsibleFor).residents;
  const oldest = thisAnimals.sort((animal1, animal2) => animal2.age - animal1.age)[0];
  const { name, sex, age } = oldest;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const { prices } = data;
  return Object.entries(prices).forEach(
    price =>
      (prices[price[0]] = Math.round((price[1] * ((percentage / 100) + 1) * 100)) / 100));
}

function employeeCoverage(idOrName) {
  const result = {};
  if (!idOrName) {
    data.employees.forEach((e) => {
      result[`${e.firstName} ${e.lastName}`] = e.responsibleFor.map(
        animalId => animalsByIds(animalId)[0].name,
      );
    });
  } else {
    const getEmployee = data.employees.find(
      employee =>
        employee.id === idOrName ||
        employee.firstName === idOrName ||
        employee.lastName === idOrName,
    );
    const getAnimal = getEmployee.responsibleFor.map(
      animalId => animalsByIds(animalId)[0].name,
    );
    result[`${getEmployee.firstName} ${getEmployee.lastName}`] = getAnimal;
  }
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
