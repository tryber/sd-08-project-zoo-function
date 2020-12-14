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

const { hours } = require('./data');
const { prices } = require('./data');
const { employees } = require('./data');
const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.some(id => animal.id === id));
  // return animals.map(ids => animals.find(id => animals.id === id));
}
console.log(animalsByIds());

function animalsOlderThan(animal, age) {
  const animalAgora = animals.find(amm => amm.name === animal);
  return animalAgora.residents.every(name => name.age >= age);
}
console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  let retorno;
  if (typeof employeeName === 'undefined') {
    retorno = {};
  } else {
    retorno = employees.find(empregado => empregado.firstName === employeeName
      || empregado.lastName === employeeName);
  }
  return retorno;
}
console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // const verificar = employees.find(obj => obj.id === id);
  return employees.some(empregado => empregado.managers.includes(id));
}
console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (!managers) {
    managers = [];
  }
  if (!responsibleFor) {
    responsibleFor = [];
  }
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  const novoEmpregado = createEmployee(personalInfo, associatedWith);
  employees.push(novoEmpregado);
}

function animalCount(species) {
  let contagem = {};
  if (!species) {
    animals.forEach((animal) => {
      contagem[animal.name] = animal.residents.length;
    });
  } else {
    contagem = animals.find(obj => species === obj.name).residents.length;
  }
  return contagem;
}
console.log(animalCount());

function entryCalculator(entrants) {
  let total;
  if (!entrants) {
    total = 0;
    return total;
  } else if (Object.keys(entrants).length === 0) {
    total = 0;
    return total;
  }
  let valorAdulto = 0;
  let valorSenior = 0;
  let valorInfantil = 0;

  if (Object.keys(entrants).includes('Adult')) {
    valorAdulto = entrants.Adult * prices.Adult;
  }
  if (Object.keys(entrants).includes('Senior')) {
    valorSenior = entrants.Senior * prices.Senior;
  }
  if (Object.keys(entrants).includes('Child')) {
    valorInfantil = entrants.Child * prices.Child;
  }
  total = valorAdulto + valorSenior + valorInfantil;
  return total;
}
console.log(entryCalculator({ Adult: 2, Child: 3, Senior: 1 }));

function animalMap(options = {}) {
  const retorno = { NE: [], NW: [], SE: [], SW: [] };
  const { includeNames = false, sorted = false, sex = false } = options;
  if (includeNames) {
    animals.forEach((animal) => {
      const object = {};
      let residents = animal.residents;
      if (sex) {
        residents = animal.residents.filter(resident => resident.sex === sex);
      }
      object[animal.name] = residents.map(resident => resident.name);
      retorno[animal.location].push(object);
    });
    if (sorted) {
      Object.keys(retorno).forEach((location) => {
        retorno[location].forEach((especie) => {
          const key = Object.keys(especie);
          especie[key[0]].sort();
        });
      });
    }
    return retorno;
  }
  animals.forEach(animal => retorno[animal.location].push(animal.name));
  return retorno;
}
console.log(animalMap());

function schedule(dayName) {
  let retorno = {};
  const dias = Object.keys(hours);
  if (!dayName) {
    dias.forEach((dia) => {
      const horaAtual = hours[dia];
      retorno[dia] = (horaAtual.open === 0) ? 'CLOSED' :
        `Open from ${horaAtual.open}am until ${horaAtual.close - 12}pm`;
    });
    return retorno;
  }
  if (dayName === 'Monday') {
    retorno = { Monday: 'CLOSED' };
    return retorno;
  }
  retorno[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  return retorno;
}
console.log(schedule('Monday'));

function oldestFromFirstSpecies(id) {
  const empregadoRecebido = employees.find(empregado => empregado.id === id);
  const animalRecebido = empregadoRecebido.responsibleFor[0];
  const especieRecebido = animals.filter(animal => animal.id === animalRecebido);
  const residentesRecebido = especieRecebido[0].residents;
  let maiorIdade = 0;
  residentesRecebido.forEach((residente) => {
    if (residente.age > maiorIdade) {
      maiorIdade = residente.age;
    }
  });
  const objetoAnimal = residentesRecebido.filter(residente => residente.age === maiorIdade);
  const retorno = [objetoAnimal[0].name, objetoAnimal[0].sex, objetoAnimal[0].age];
  return retorno;
}
console.log(oldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

// pesquisei para saber como arredondar corretamente: https://www.alura.com.br/artigos/formatando-numeros-no-javascript?gclid=Cj0KCQiAzsz-BRCCARIsANotFgNTwpZy8AYQk0KE4-pew9B4eFz2yrLD06t9g2gGnaFv3syTP7i14L8aAkF7EALw_wcB
function increasePrices(percentage) {
  const valorAumento = prices.Adult * (percentage / 100);
  const novoValor = prices.Adult + valorAumento;
  prices.Adult = Math.round(novoValor * 100) / 100;
  const valorAumento2 = prices.Senior * (percentage / 100);
  const novoValor2 = prices.Senior + valorAumento2;
  prices.Senior = Math.round(novoValor2 * 100) / 100;
  const valorAumento3 = prices.Child * (percentage / 100);
  const novoValor3 = prices.Child + valorAumento3;
  prices.Child = Math.round(novoValor3 * 100) / 100;
}

// fiz com a ajuda do grupo de estudos gravado :).

function employeeById(id) {
  return employees.find(employee => employee.id === id);
}

function employeeCoverage(idOrName) {
  const resultado = employees.reduce((acc, employee) => {
    const { firstName, lastName, responsibleFor } = employee;
    acc[`${firstName} ${lastName}`] = responsibleFor.map(id => animalsByIds(id)[0].name);
    return acc;
  }, {});
  if (typeof idOrName === 'string' && idOrName.length !== 0) {
    const employee = employeeByName(idOrName) || employeeById(idOrName);
    const { firstName, lastName } = employee;
    const name = `${firstName} ${lastName}`;
    return { [name]: resultado[name] };
  }
  return resultado;
}
console.log(employeeCoverage());
// minha lógica inicial:
// function employeeCoverage(idOrName) {
//   const retorno = {};
//   if (!idOrName) {
//     const funcionarios = [];
//     const animalRespectivoIDs = [];
//     employees.forEach((empregado) => {
//       funcionarios.push(empregado.firstName + ' ' + empregado.lastName)
//       animalRespectivoIDs.push(empregado.responsibleFor);
//     });
//     const objAnimais = [];
//     animalRespectivoIDs.forEach((ids) => {
//       objAnimais.push(animals.filter(animal => ids.some(id => animal.id === id)));
//     })
//     let index = -1;
//     funcionarios.forEach((funcionario) => {
//       index++;
//       const animaisAgora = objAnimais[index]
//       retorno[funcionario] = animaisAgora.forEach((animal) => {
//         return animal.name;
//       });
//     })
//     return retorno;
//   }
// }

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
