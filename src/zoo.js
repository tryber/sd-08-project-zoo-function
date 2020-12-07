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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');


function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const idadeMinima = animals
    .find(({ name }) => (name === animal))
    .residents.every(animalAge => animalAge.age >= age);

  return idadeMinima;
}

function employeeByName(employeeName) {
  // seu código aqui
  return !employeeName ? {} : employees
    .filter(({ firstName, lastName }) =>
      employeeName.includes(firstName) || employeeName.includes(lastName))[0];
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.filter(idManager => idManager.managers[0] === id)
    .some(isTrue => isTrue.managers);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species = 'all') {
  // seu código aqui
  const countAll = Object.fromEntries(animals
    .map(({ name, residents }) => [name, residents.length]));
  species = species === 'all' ? countAll :
    animals.filter(especie => especie.name === species)[0].residents.length;
  return species;
}

function entryCalculator(entrants) {
  // seu código aqui
  return !entrants || Object.keys(entrants).length === 0 ? 0 : Object.keys(entrants)
    .reduce((acc, curr) => acc +
      (entrants[curr] * prices[curr]), 0);
}

const popularObj = (locations) => {
  const obj = {};
  locations.forEach((location) => {
    obj[location] = animals.filter(lo => lo.location === location)
      .map(animal => animal.name);
  });
  return obj;
};

const porpularObjIncludes = (locations, sorted, sex) => {
  const obj = {};
  locations.forEach((lo) => {
    const name =
      animals
        .filter(local => local.location === lo)
        .map((animal) => {
          const imprimeChaveNome = animal.name;
          const imprimeValorNome = animal.residents
            .filter((residentFil) => {
              const ambigousSex = sex;
              return ambigousSex ? residentFil.sex === sex : 1;
            })
            .map(resident => resident.name);
          if (sorted) imprimeValorNome.sort();
          return { [imprimeChaveNome]: imprimeValorNome };
        });
    obj[lo] = name;
  });
  return obj;
};

function animalMap(options) {
  // seu código aqui
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return popularObj(locations);
  const { includeNames, sorted, sex } = options;
  if (includeNames === true) return porpularObjIncludes(locations, sorted, sex);
  return popularObj(locations);
}

const semDia = () => {
  const obj = {};
  const newHours = Object.entries(hours);
  newHours.forEach((dia) => {
    const { open, close } = dia[1];
    const hoursFormat = (close % 12);
    let onOff = `Open from ${open}am until ${hoursFormat}pm`;
    if (close - open <= 0) onOff = 'CLOSED';
    obj[dia[0]] = onOff;
  });
  return obj;
};

function schedule(dayName) {
  // seu código aqui
  const obj = {};
  if (!dayName) return semDia();
  const newHours = Object.entries(hours);
  const dia = newHours.find(verDia => verDia[0] === dayName);
  // console.log(dia[0]);
  const { open, close } = dia[1];
  const hoursFormat = (close % 12);
  let onOff = `Open from ${open}am until ${hoursFormat}pm`;
  if (close - open <= 0) onOff = 'CLOSED';
  obj[dia[0]] = onOff;
  return obj;
}

// console.log(schedule('Tuesday'));
function oldestFromFirstSpecies(id) {
  // seu código aqui
  const colaboradorResponsable = employees.find(idU => idU.id === id).responsibleFor[0];
  const animalResponsable = animals.find(ids => ids.id === colaboradorResponsable).residents;
  const moreOld = animalResponsable.sort((a, b) => (b.age - a.age)).find(old => old);
  return Object.values(moreOld);
}

function increasePrices(percentage) {
  // seu código aqui
  Object.entries(prices).forEach(([nome, valor]) => {
    prices[nome] = Math.round((valor * ((percentage / 100) + 1)) * 100) / 100;
  });
}
const mapAnimal = nome => nome.responsibleFor.map(idA => animals.find(an => an.id === idA).name);
const employeeCoverageOff = () => {
  const obj = {};
  employees.forEach((nome) => {
    const fullName = `${nome.firstName} ${nome.lastName}`;
    obj[fullName] = mapAnimal(nome);
  });
  return obj;
};

function employeeCoverage(idOrName) {
  if (!idOrName) return employeeCoverageOff();
  // seu código aqui
  const pessoaColab = employees
    .find((colab) => {
      const { id, firstName, lastName } = colab;
      return (id === idOrName || firstName === idOrName || lastName === idOrName);
    });
  const nomeColab = `${pessoaColab.firstName} ${pessoaColab.lastName}`;
  return { [nomeColab]: mapAnimal(pessoaColab) };
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
