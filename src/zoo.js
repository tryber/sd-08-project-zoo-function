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
  const result = [];
  ids.forEach(idP => result.push((data.animals.find(animal => animal.id === idP))));

  return result;
}

function animalsOlderThan(animal, age) {
  return (data.animals.find(animalzinho => animal === animalzinho.name))
    .residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName) {
    return data.employees.find(employee => employee.firstName === employeeName ||
      employee.lastName === employeeName);
  } return {};
}

function createEmployee(personalInfo, associatedWith) {
  personalInfo = { ...personalInfo, ...associatedWith };
  return personalInfo;
}

function isManager(id) {
  const managers = [];
  data.employees.forEach(employee => employee.managers.forEach((manager) => {
    managers.push(manager);
  }));
  return managers.some(manager => manager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees
    .push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let amount;
  if (!species) {
    const animalAmount = {};
    data.animals.map((animal) => {
      animalAmount[animal.name] = animal.residents.length;
      return animalAmount;
    });
    return animalAmount;
  }
  data.animals.forEach((animal) => {
    if (Object.values(animal)
      .some(sameAnimal => sameAnimal === species)) amount = animal.residents.length;
  });
  return amount;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  let value = 0;
  if (entrants.Adult) {
    value += data.prices.Adult * entrants.Adult;
  }
  if (entrants.Senior) {
    value += data.prices.Senior * entrants.Senior;
  }
  if (entrants.Child) {
    value += data.prices.Child * entrants.Child;
  }
  return value;
}

function animalMap(options) {
  /*  let teste;
  if (!options) {
    teste = data.animals.reduce((animalRegion, animal) => {
      if (!animalRegion[animal.location]) { animalRegion[animal.location] = []; }
      animalRegion[animal.location].push(animal.name);
      return animalRegion;
    }, {});
  }

  else if (options.includeNames) {
    teste = data.animals.reduce((animalRegion, animal) => {
      if (!animalRegion[animal.location]) { animalRegion[animal.location] = []; }
      let animalName = {};

      if (!animalName[animal.name]) { animalName[animal.name] = []; }

      animal.residents.forEach((teste) => animalName[animal.name].push(teste.name));
      animalRegion[animal.location].push(animalName);
      return animalRegion;
    }, {});
  }

  else if (options.sorted) {
    teste = data.animals.reduce((animalRegion, animal) => {
      if (!animalRegion[animal.location]) { animalRegion[animal.location] = []; }
      let animalName = {};

      if (!animalName[animal.name]) { animalName[animal.name] = []; }


      //let nemsei = animalName[animal.name].sort((a, b) => a > b);
      animal.residents.forEach((teste) => animalName[animal.name].push(teste.name));
      animalName[animal.name] = animalName[animal.name].sort();
      animalRegion[animal.location].push(animalName);
      return animalRegion;
    }, {});

    console.log(Object.keys(teste));
  }

  return teste;*/
}

function timeConvert(time) {
  time = time.toString().match(/^([01]\d|2[0-3])/) || [time];

  if (time.length > 1) {
    time = time.slice(1);
    time[0] = +time[0] % 12 || 12;
  }
  return time.join('');
}

function getDay(day, openHour, closeHour) {
  if (day === 'Monday') {
    return 'CLOSED';
  }
  return `Open from ${openHour}am until ${timeConvert(closeHour)}pm`;
}

function schedule(dayName) {
  const { hours } = data;
  let days;
  if (!dayName) {
    days = Object.entries(hours).reduce((arr, current) => {
      arr[current[0]] = getDay(current[0], current[1].open, current[1].close);
      return arr;
    }, {});
  } else {
    days = Object.entries(hours).reduce((arr, current) => {
      if (current[0] === dayName) {
        arr[current[0]] = getDay(current[0], current[1].open, current[1].close);
      }
      return arr;
    }, {});
  }

  return days;
}

function oldestFromFirstSpecies(id) {
  let olderSpecie = ['', '', 0];
  const firstSpecie = data.employees
    .find(employee => employee.id === id).responsibleFor[0];
  data.animals.find(animalSpecie => animalSpecie.id === firstSpecie)
    .residents.forEach((resident) => {
      if (resident.age > olderSpecie[2]) { olderSpecie = Object.values(resident); }
    });
  return olderSpecie;
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
