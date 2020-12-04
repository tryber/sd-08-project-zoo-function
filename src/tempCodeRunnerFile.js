const data = require('../src/data');

const { animals, employees } = data;

function animalsByIds(...ids) {
  return ids.map(idFind => animals.find(animal => animal.id === idFind));
}

function animalsOlderThan(animal, age) {
  const animalFound = animals.find(specie => specie.name === animal);
  return animalFound.residents.every(objAnimal => objAnimal.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
  .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const toObject = ([personalInfo, associatedWith]) => ({personalInfo, associatedWith});
  console.log(toObject);
}

createEmployee(personalInfo, associatedWith);