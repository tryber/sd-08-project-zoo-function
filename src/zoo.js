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

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui

}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return data.animals.filter(animal1 => `${animal1.name} : ${animal1.residents.length}`)
  }
  const filtroanimal = data.animals.find(animal => animal.name === species)
  return filtroanimal.residents.length
}

function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
}

function animalMap(options) {
  if (options === undefined) {
    const filtro = data.animals.filter(animal1 => animal1.location === animal1.name)
    console.log(filtro)
    return filtro.map(animal => `${animal.location}:${filtro.name}`)
  }
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const func = data.employees.find(func => func.id === id) //achafuncionario
  const primeiradalista = func.responsibleFor[0];
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
