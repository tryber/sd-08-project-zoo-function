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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return animals.filter((cur, idx) => cur.id === ids[idx]);
}

function animalsOlderThan(animal, age) {
  // return animals.find(cur => cur.name === animal).residents.every(cur => cur.age > age);
}

function employeeByName(employeeName) {
  // if (employeeName === undefined) {
  //   return {};
  // }
  // return employees.find(cur => employeeName === cur.firstName || employeeName === cur.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  // return { ...personalInfo, ...associatedWith, }
}

function isManager(id) {
  // return employees.some(cur => cur.managers.find(cur => cur === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // if (species === undefined) {
  //   const lista = {};
  //   animals.forEach(cur => lista[cur.name] = cur.residents.length);
  //   return lista;
  // }
  // return animals.find(cur => cur.name === species).residents.length;
}

function entryCalculator(entrants) {
  // if (entrants === undefined || Object.keys(entrants).length === 0) {
  //   return 0;
  // }
  // return Object.keys(entrants).reduce((acc, cur) => acc + entrants[cur] * prices[cur], 0);
}

function animalMap(options = 0) {
  // const { includeNames = false, sorted = false, sex } = options;
  // if (options === 0) {
  //   return {
  //     NE: animals.filter(especie => especie.location === 'NE')
  //     .map(especieNE => especieNE.name),
  //     NW: animals.filter(especie => especie.location === 'NW')
  //     .map(especieNW => especieNW.name),
  //     SE: animals.filter(especie => especie.location === 'SE')
  //     .map(especieSE => especieSE.name),
  //     SW: animals.filter(especie => especie.location === 'SW')
  //     .map(especieSW=> especieSW.name),
  //   };
  // }
  // if (includeNames === true) {
  //   if (sorted === false) {
  //     if (sex === undefined) {
  //       return {
  //         NE: animals.filter(especie => especie.location === 'NE')
  //         .map(especieNE => ({
  //           [especieNE.name]: especieNE.residents
  //           .map(residentes => residentes.name),
  //         })),
  //         NW: animals.filter(especie => especie.location === 'NW')
  //         .map(especieNW => ({
  //           [especieNW.name]: especieNW.residents
  //           .map(residentes => residentes.name),
  //         })),
  //         SE: animals.filter(especie => especie.location === 'SE')
  //         .map(especieSE => ({
  //           [especieSE.name]: especieSE.residents
  //           .map(residentes => residentes.name),
  //         })),
  //         SW: animals.filter(especie => especie.location === 'SW')
  //         .map(especieSW => ({
  //           [especieSW.name]: especieSW.residents
  //           .map(residentes => residentes.name),
  //         })),
  //       };
  //     }
  //     return {
  //       NE: animals.filter(especie => especie.location === 'NE')
  //       .map(especieNE => ({
  //         [especieNE.name]: especieNE.residents
  //         .filter(residentes => residentes.sex === 'female')
  //         .map(residentes => residentes.name)
  //       })),
  //       NW: animals.filter(especie => especie.location === 'NW')
  //       .map(especieNW => ({
  //         [especieNW.name]: especieNW.residents
  //         .filter(residentes => residentes.sex === 'female')
  //         .map(residentes => residentes.name)
  //       })),
  //       SE: animals.filter(especie => especie.location === 'SE')
  //       .map(especieSE => ({
  //         [especieSE.name]: especieSE.residents
  //         .filter(residentes => residentes.sex === 'female')
  //         .map(residentes => residentes.name)
  //       })),
  //       SW: animals.filter(especie => especie.location === 'SW')
  //       .map(especieSW => ({
  //         [especieSW.name]: especieSW.residents
  //         .filter(residentes => residentes.sex === 'female')
  //         .map(residentes => residentes.name)
  //       })),
  //     };
  //   }
  //   if (sex === undefined) {
  //     return {
  //       NE: animals.filter(especie => especie.location === 'NE')
  //       .map(especieNE => ({
  //         [especieNE.name]: especieNE.residents
  //         .map(residentes => residentes.name).sort(),
  //       })),
  //       NW: animals.filter(especie => especie.location === 'NW')
  //       .map(especieNW => ({
  //         [especieNW.name]: especieNW.residents
  //         .map(residentes => residentes.name).sort(),
  //       })),
  //       SE: animals.filter(especie => especie.location === 'SE')
  //       .map(especieSE => ({
  //         [especieSE.name]: especieSE.residents
  //         .map(residentes => residentes.name).sort(),
  //       })),
  //       SW: animals.filter(especie => especie.location === 'SW')
  //       .map(especieSW => ({
  //         [especieSW.name]: especieSW.residents
  //         .map(residentes => residentes.name).sort(),
  //       })),
  //     };
  //   }
  //   return {
  //     NE: animals.filter(especie => especie.location === 'NE')
  //     .map(especieNE => ({
  //       [especieNE.name]: especieNE.residents
  //       .filter(residentes => residentes.sex === 'female')
  //       .map(residentes => residentes.name)
  //       .sort()
  //     })),
  //     NW: animals.filter(especie => especie.location === 'NW')
  //     .map(especieNW => ({
  //       [especieNW.name]: especieNW.residents
  //       .filter(residentes => residentes.sex === 'female')
  //       .map(residentes => residentes.name)
  //       .sort()
  //     })),
  //     SE: animals.filter(especie => especie.location === 'SE')
  //     .map(especieSE => ({
  //       [especieSE.name]: especieSE.residents
  //       .filter(residentes => residentes.sex === 'female')
  //       .map(residentes => residentes.name)
  //       .sort()
  //     })),
  //     SW: animals.filter(especie => especie.location === 'SW')
  //     .map(especieSW => ({
  //       [especieSW.name]: especieSW.residents
  //       .filter(residentes => residentes.sex === 'female')
  //       .map(residentes => residentes.name)
  //       .sort()
  //     })),
  //   };
  // }
  // return {
  //   NE: animals.filter(especie => especie.location === 'NE')
  //   .map(especieNE => especieNE.name),
  //   NW: animals.filter(especie => especie.location === 'NW')
  //   .map(especieNW => especieNW.name),
  //   SE: animals.filter(especie => especie.location === 'SE')
  //   .map(especieSE => especieSE.name),
  //   SW: animals.filter(especie => especie.location === 'SW')
  //   .map(especieSW => especieSW.name),
  // };
}

function schedule(dayName) {
  // const cronograma = {
  //   Tuesday: 'Open from 8am until 6pm',
  //   Wednesday: 'Open from 8am until 6pm',
  //   Thursday: 'Open from 10am until 8pm',
  //   Friday: 'Open from 10am until 8pm',
  //   Saturday: 'Open from 8am until 10pm',
  //   Sunday: 'Open from 8am until 8pm',
  //   Monday: 'CLOSED',
  // }
  // if (dayName === undefined) {
  //   return cronograma;
  // }
  // return {
  //   [dayName]: cronograma[dayName]
  // };
}

function oldestFromFirstSpecies(id) {
  // const idDaEspecie = employees.find(cur => cur.id === id).responsibleFor[0];
  // const animais = animals.find(cur => cur.id === idDaEspecie).residents;
  // const maisVelho = animais.sort((a, b) => b.age - a.age)[0];
  // return Object.values(maisVelho);
}

function increasePrices(percentage) {
  // const adulto = parseFloat((prices.Adult + percentage / 100 * prices.Adult + 0.005).toFixed(2));
  // prices.Adult = adulto;
  // const idoso = parseFloat((prices.Senior + percentage / 100 * prices.Senior + 0.005).toFixed(2));
  // prices.Senior = idoso;
  // const criança = parseFloat((prices.Child + percentage / 100 * prices.Child + 0.005).toFixed(2));
  // prices.Child = criança;
  // return prices;
}

function employeeCoverage(idOrName) {
  // if (idOrName === undefined) {
  //   const lista = {};
  //   employees.forEach(employee => lista[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map(speciesId => {
  //     const especie = animals.find(especie => especie.id === speciesId).name;
  //     return especie;
  //   }))
  //   return lista;
  // } else {
  //   const employee = employees
  //   .find(employee => employee.id === idOrName ||
  //     employee.firstName === idOrName || employee.lastName === idOrName);
  //   return {
  //     [`${employee.firstName} ${employee.lastName}`]: employee.responsibleFor
  //     .map(speciesId => {
  //       const especie = animals.find(especie => especie.id === speciesId).name;
  //       return especie;
  //     }),
  //   };
  // }
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
