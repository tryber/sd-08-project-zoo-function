// const data = require('./data');
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return animals.filter(specie => ids.includes(specie.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(specie => specie.name === animal).residents
  .every(specieAge => specieAge.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
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
    const nameAndResidents = animals.map(specie => ({ [specie.name]: specie.residents.length }));
    return nameAndResidents
    .reduce((previousValue, currentValue) => Object.assign(previousValue, currentValue), {});
  }
  return animals.find(specie => specie.name === species).residents.length;
  /* Solução tirada do Discourse para converter array de objetos em um objeto
  https://forum.betrybe.com/t/reduce-converter-array-de-objetos-em-objeto/332 */
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((previousValue, currentValue) =>
  previousValue + (entrants[currentValue] * prices[currentValue]), 0);
  /* Solução para verificar se um objeto está vazio tirado de:
  https://pt.stackoverflow.com/questions/83588/em-javascript-como-verificar-que-um-objeto-est%C3%A1-vazio-sem-jquery*/
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const operatingDays = Object.entries(hours).reduce((previousValue, [key, value]) => {
    previousValue[key] = (value.close - value.open > 0) ? `Open from ${value.open}am until ${value.close - 12}pm` : 'CLOSED';
    return previousValue;
  }, {});
  if (operatingDays[dayName]) return { [dayName]: operatingDays[dayName] };
  return operatingDays;
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  const { name, sex, age } = animals.find(animal =>
    animal.id === animalId).residents.sort((a, b) => b.age - a.age)[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  return Object.keys(prices).forEach((element) => {
    prices[element] = Math.ceil(prices[element] * (100 + percentage)) / 100;
  });
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
