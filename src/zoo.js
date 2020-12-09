const { animals } = require('./data');
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
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const especieRequerida = animals.find(animal1 => animal1.name === animal);
  const residents = especieRequerida.residents;
  const olderAnimals = residents.filter(currAnimal => currAnimal.age > age);
  return olderAnimals.length === residents.length;
}

function employeeByName(employeeName) {
  // seu código aqui
  const achaempregados = data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);

  return employeeName ? achaempregados : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  // seu código aqui
  return data.employees.filter(employee =>
    employee.managers.includes(id)).length > 0;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return animals.reduce((acc, animal) => {
      Object.assign(acc, { [animal.name]: animal.residents.length });
      return acc;
    }, {});
  }
  const filtroanimal = data.animals.find(animal => animal.name === species);
  return filtroanimal.residents.length;
}

function entryCalculator(entrants) {
  return entrants
    ? Object.keys(entrants).reduce(
      (acc, current) =>
        acc + (data.prices[current] * entrants[current]),
      0,
    )
    : 0;
}

function animalMap(options) {

}

function schedule(dayName) {
  // seu código aqui
  if (!dayName) {
    return {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED',
    };
  } else if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return { [dayName]: `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close % 12}pm` };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const func1 = data.employees.find(func => func.id === id);
  const primeiradalista = func1.responsibleFor[0];
  const allFromFirst = animals.find(animal =>
    primeiradalista.includes(animal.id)).residents;
  const oldestAnimalObj = allFromFirst.sort((a, b) =>
    b.age - a.age)[0];
  const { name, sex, age } = oldestAnimalObj;
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
}

function matchdeanimal(funcinario) {
  return funcinario.responsibleFor
    .map(id => data.animals.find(animal => id === animal.id).name);
}

function employeeCoverage(idOrName) {
  /* const obj = {`${data.employees.firstName} ${data.employees.lastName} `} */
  const empregadoinfo = employeeByName(idOrName) ||
    data.employees.find(employee => employee.id === idOrName);
  return idOrName ? {
    [`${empregadoinfo.firstName} ${empregadoinfo.lastName}`]: matchdeanimal(empregadoinfo),
  }
    : data.employees.reduce((acc, employee) => {
      acc[`${employee.firstName} ${employee.lastName}`] = matchdeanimal(employee);
      return acc;
    }, {});
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
