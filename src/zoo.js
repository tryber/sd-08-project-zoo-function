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

const data = require('../src/data');

const { animals, employees, hours, prices } = data;

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
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(managerId => managerId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return (animals.reduce((currAnimal, prevAnimal) =>
      Object.assign(currAnimal, { [prevAnimal.name]: prevAnimal.residents.length }), {}));
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  if (!entrants) return 0;
  const {
    Adult: adultValue = 0,
    Senior: seniorValue = 0,
    Child: childValue = 0,
  } = entrants;
  const { Adult, Senior, Child } = prices;
  const total = (Adult * adultValue) + (Senior * seniorValue) + (Child * childValue);
  return total;
}

function namesBySpecieByLocation(speciesByLocation, sorted, sex) {
  const namesBySpecie = {};
  Object.keys(speciesByLocation).forEach((region) => {
    const animalsByLocation = animals
      .filter(specie => specie.location === region);
    const arrayNamesBySpecie = animalsByLocation.map((specie) => {
      const nameOfSpecie = specie.name;
      // 'Com a opção `sex: female/male` especificada, retorna nomes de animais conforme o sexo'
      const residentsBySpecie = specie.residents
        .filter((animal) => {
          const sexIsDefined = sex !== undefined;
          return (sexIsDefined ? animal.sex === sex : true);
        })
        .map(animal => animal.name);
      // 'Com a opção `sorted: true`, retorna nomes de animais ordenados'
      /* 'Com a opção `sex: \'female\'ou \'male\'` especificada e a opção `sort: true`,
      retorna os nomes dos animais ordenados conforme o sexo macho/fêmea' */
      if (sorted) residentsBySpecie.sort();
      return { [nameOfSpecie]: residentsBySpecie };
    });
    namesBySpecie[region] = arrayNamesBySpecie;
  });
  return namesBySpecie;
}

function animalMap(options) {
  const speciesByLocation = {};
  // Inicializa o objeto com as localizações e arrays vazios: { NE: [], NW: [], SE: [], SW: [] }
  animals.forEach(({ location }) => {
    speciesByLocation[location] = [];
    return speciesByLocation[location];
  });
  // 'Sem parâmetros, retorna animais categorizados por localização'
  if (!options) {
    // Preenche cada array de speciesByLocation com os nomes dos animais
    animals.forEach(({ name, location }) => speciesByLocation[location].push(name));
    return speciesByLocation;
  }
  // Inicializa as propriedades do parâmetro "option" com valores padrões
  const { includeNames = false, sorted = false, sex } = options;
  // 'Com a opção `includeNames: true`, retorna nomes de animais'
  if (includeNames) {
    return namesBySpecieByLocation(speciesByLocation, sorted, sex);
  }
  // 'Só retorna informações ordenadas e com sexo se a opção `includeNames: true` for especificada'
  animals.forEach(({ name, location }) => speciesByLocation[location].push(name));
  return speciesByLocation;
}

function schedule(dayName) {
  const scheduleReadable = {};
  // 'Sem parâmetros, retorna um cronograma legível para humanos'
  if (!dayName) {
    Object.keys(hours).forEach((dayOfWeek) => { // Array com os dias da semana
      const { open, close } = hours[dayOfWeek]; // Destructuring
      if (open === 0) {
        scheduleReadable[dayOfWeek] = 'CLOSED';
      } else {
        const scheduleOfDay = `Open from ${open}am until ${close - 12}pm`;
        scheduleReadable[dayOfWeek] = scheduleOfDay;
      }
    });
    return scheduleReadable;
  }
  // 'Se um único dia for passado, retorna somente este dia em um formato legível para humanos'
  if (dayName === 'Monday') {
    scheduleReadable[dayName] = 'CLOSED';
    return scheduleReadable;
  }
  scheduleReadable[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  return scheduleReadable;
}

function oldestFromFirstSpecies(id) {
  let idSpecie;
  employees.filter(employee => employee.id === id)
    .forEach(({ responsibleFor }) => {
      idSpecie = `${responsibleFor[0]}`;
      return idSpecie;
    });

  const objectOfSpecie = animals.find(specie => specie.id === idSpecie);
  const arrayOfAnimals = objectOfSpecie.residents;
  let arrayOrderAgeAnimals = [];
  arrayOfAnimals.forEach(animal => arrayOrderAgeAnimals.push(animal.age));
  arrayOrderAgeAnimals = arrayOrderAgeAnimals.sort((age1, age2) => age2 - age1);
  const ageOfOlderAnimal = arrayOrderAgeAnimals[0];
  const olderAnimal = arrayOfAnimals.find(animal => animal.age === ageOfOlderAnimal);
  return [olderAnimal.name, olderAnimal.sex, olderAnimal.age];
}

function increasePrices(percentage) {
  Object.entries(prices).forEach(([category, price]) => {
    const addedValue = (price * percentage) / 100;
    const total = Math.round((price + addedValue) * 100) / 100;
    prices[category] = total;
  });
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
