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

const { animals } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
// return ids.map(id => animals.find(animal => animal.id === id));
// Vídeo Plantão e Vídeo PSimões, pra cada id ele vai rodar um map e trazer o animal.
  return animals.filter(animal => ids.includes(animal.id));
  // filtrando o critério (animal) e vendo se ele entra na lista - Plantão
}

function animalsOlderThan(animalName, age) {
  let result = animals.find(animal => animal.name === animalName);
  if (result) result = result.residents.every(animal => animal.age >= age);
  return result;

  //  Para existir um tratamento de erro, caso não exista o objeto buscado e apresente o erro.
  //  return animals.find(animal => animal.name === animalName)
  //  .residents.every(animal => animal.age >= age;
  //  Buscando a forma de retornar o array do residents, com todas as infos.
  //  Assumindo claro que todos os objetos vão retornar,
  //  se o resultado for nulo vai dar erro, por isso o tratamento do erro acima. Video PSimões
}
  //  console.log(animalsOlderThan('otters',7));

function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
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
