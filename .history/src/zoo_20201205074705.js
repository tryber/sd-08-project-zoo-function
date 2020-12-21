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
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  // Esta função é responsável pela busca das espécies de animais por id. Ela retorna um array
  // contendo as espécies referentes aos ids passados como parâmetro,
  // podendo receber um ou mais ids.
  // Observações técnicas
  // O parâmetro desta função pode ser alterado para atender ao requisito proposto
  // O que será avaliado
  // Caso receba nenhum parâmetro, necessário retornar um array vazio
  // Ao receber como parâmetro um único id, retorna um array com a espécie referente à esse id
  // Ao receber mais de um id, retorna um array com as espécies referentes aos ids
  // console.log(ids);
  // console.log(ids.forEach((id) => animals.filter((animal) => animal.id === id)));
  const result = [];
  if (ids.length === 0) { return []; }
  ids.forEach(id => result.push(animals.find(animal => animal.id === id)));
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais
  // daquela espécie possuem a idade mínima especificada
  // Observações técnicas
  // Deve retornar um valor booleano
  // O que será avaliado
  // Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie possuem
  // a idade mínima especificada
  let result = true;
  const dataAnimal = animals.find(creature => creature.name === animal);
  // console.table(dataAnimal.residents)
  // console.log(age)
  dataAnimal.residents.forEach((creature) => {
    if (creature.age < age) {
      result = false;
    }
  });
  // console.log(result);
  return result;
}

function employeeByName(employeeName) {
  // seu código aqui
  // Esta função é responsável pela busca das pessoas colaboradoras através do
  // primeiro ou do último nome delas
  // O que será avaliado
  // Sem parâmetros, retorna um objeto vazio
  // Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  // Quando provido o último nome do funcionário, retorna o objeto do funcionário
  if (typeof (employeeName) === 'undefined' ) { return {}; }
  return data.employees.find(employee => {
    employee.firstName === employeeName || employee.lastName === employeeName})
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
