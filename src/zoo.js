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
const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return animals.filter((especie, idx) => especie.id === ids[idx]);
}

function animalsOlderThan(animal, age) {
  return animals.find(especie => especie.name === animal).residents.every(animal => animal.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(employee => employeeName === employee.firstName || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  }
}

function isManager(id) {
  return employees.some(employee => employee.managers.find(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  });
}

function animalCount(species) {
  if (species === undefined) {
    const lista = {};
    animals.forEach(especie => lista[especie.name] = especie.residents.length);
    return lista;
  }
  return animals.find(especie => especie.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce(acc, cur => acc + entrants[cur] * prices[cur], 0);
}

function animalMap(options = 0) {
  const { includeNames = false, sorted = false, sex } = options;
  if (options === 0) {
    return {
      NE: animals
      .filter(especie => especie.location === 'NE')
      .map(especieNE => especieNE.name),
      NW: animals
      .filter(especie => especie.location === 'NW')
      .map(especieNW => especieNW.name),
      SE: animals
      .filter(especie => especie.location === 'SE')
      .map(especieSE => especieSE.name),
      SW: animals
      .filter(especie => especie.location === 'SW')
      .map(especieSW=> especieSW.name),
    };
  }
  if (includeNames === true) {
    if (sorted === false) {
      if (sex === undefined) {
        return {
          NE: animals
          .filter(especie => especie.location === 'NE')
          .map(especieNE => ({
            [especieNE.name]: especieNE.residents
            .map(residentes => residentes.name),
          })),
          NW: animals
          .filter(especie => especie.location === 'NW')
          .map(especieNW => ({
            [especieNW.name]: especieNW.residents
            .map(residentes => residentes.name),
          })),
          SE: animals
          .filter(especie => especie.location === 'SE')
          .map(especieSE => ({
            [especieSE.name]: especieSE.residents
            .map(residentes => residentes.name),
          })),
          SW: animals
          .filter(especie => especie.location === 'SW')
          .map(especieSW => ({
            [especieSW.name]: especieSW.residents
            .map(residentes => residentes.name),
          })),
        };
      }
      return {
        NE: animals
        .filter(especie => especie.location === 'NE')
        .map(especieNE => ({
          [especieNE.name]: especieNE.residents
          .filter(residentes => residentes.sex === 'female')
          .map(residentes => residentes.name)
        })),
        NW: animals
        .filter(especie => especie.location === 'NW')
        .map(especieNW => ({
          [especieNW.name]: especieNW.residents
          .filter(residentes => residentes.sex === 'female')
          .map(residentes => residentes.name)
        })),
        SE: animals
        .filter(especie => especie.location === 'SE')
        .map(especieSE => ({
          [especieSE.name]: especieSE.residents
          .filter(residentes => residentes.sex === 'female')
          .map(residentes => residentes.name)
        })),
        SW: animals
        .filter(especie => especie.location === 'SW')
        .map(especieSW => ({
          [especieSW.name]: especieSW.residents
          .filter(residentes => residentes.sex === 'female')
          .map(residentes => residentes.name)
        })),
      };
    }
    if (sex === undefined) {
      return {
        NE: animals
        .filter(especie => especie.location === 'NE')
        .map(especieNE => ({
          [especieNE.name]: especieNE.residents
          .map(residentes => residentes.name).sort(),
        })),
        NW: animals
        .filter(especie => especie.location === 'NW')
        .map(especieNW => ({
          [especieNW.name]: especieNW.residents
          .map(residentes => residentes.name).sort(),
        })),
        SE: animals
        .filter(especie => especie.location === 'SE')
        .map(especieSE => ({
          [especieSE.name]: especieSE.residents
          .map(residentes => residentes.name).sort(),
        })),
        SW: animals
        .filter(especie => especie.location === 'SW')
        .map(especieSW => ({
          [especieSW.name]: especieSW.residents
          .map(residentes => residentes.name).sort(),
        })),
      };
    }
    return {
      NE: animals
      .filter(especie => especie.location === 'NE')
      .map(especieNE => ({
        [especieNE.name]: especieNE.residents
        .filter(residentes => residentes.sex === 'female')
        .map(residentes => residentes.name)
        .sort()
      })),
      NW: animals
      .filter(especie => especie.location === 'NW')
      .map(especieNW => ({
        [especieNW.name]: especieNW.residents
        .filter(residentes => residentes.sex === 'female')
        .map(residentes => residentes.name)
        .sort()
      })),
      SE: animals
      .filter(especie => especie.location === 'SE')
      .map(especieSE => ({
        [especieSE.name]: especieSE.residents
        .filter(residentes => residentes.sex === 'female')
        .map(residentes => residentes.name)
        .sort()
      })),
      SW: animals
      .filter(especie => especie.location === 'SW')
      .map(especieSW => ({
        [especieSW.name]: especieSW.residents
        .filter(residentes => residentes.sex === 'female')
        .map(residentes => residentes.name)
        .sort()
      })),
    };
  }
  return {
    NE: animals
    .filter(especie => especie.location === 'NE')
    .map(especieNE => especieNE.name),
    NW: animals
    .filter(especie => especie.location === 'NW')
    .map(especieNW => especieNW.name),
    SE: animals
    .filter(especie => especie.location === 'SE')
    .map(especieSE => especieSE.name),
    SW: animals
    .filter(especie => especie.location === 'SW')
    .map(especieSW => especieSW.name),
  };
}

function schedule(dayName) {
  const cronograma = {
    Tuesday: 'Opem from 8am until 6pm',
    Wednesday: 'Opem from 8am until 6pm',
    Thursday: 'Opem from 10am until 8pm',
    Friday: 'Opem from 10am until 8pm',
    Saturday: 'Opem from 8am until 10pm',
    Sunday: 'Opem from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName === undefined) {
    return cronograma;
  }
  return {
    [dayName]: cronograma[dayName]
  };
}

function oldestFromFirstSpecies(id) {
  const idDaEspecie = employees.find(employee => employee.id === id).responsibleFor[0];
  const animais = animals.find(animal => animal.id === idDaEspecie).residents;
  const maisVelho = animais.sort((a, b) => b.age - a.age)[0];
  return Object.values(maisVelho);
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
