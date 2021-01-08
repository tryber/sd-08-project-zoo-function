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
  if (!ids) {
    return [];
  }
  const animais = data.animals;
  const animaisFiltrados = animais.filter(each => each.id === ids[0] || each.id === ids[1]);
  return animaisFiltrados;
}

function animalsOlderThan(animal, age) {
  const animais = data.animals;
  const animalSelecionado = animais.find(each => each.name === animal);
  const residentes = animalSelecionado.residents;
  const resultado = residentes.every(each => each.age >= age);
  return resultado;
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const employees = data.employees;
  const resultado = employees.find(each => Object.values(each).includes(employeeName));
  return resultado;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const employees = data.employees;
  const managers = employees.find(each => each.managers.includes(id));
  if (!managers) {
    return false;
  }
  return true;
}

function addEmployee(iD, firstname, lastname, Managers, responsiblefor) {
  if (!responsiblefor) {
    responsiblefor = [];
  }
  if (!Managers) {
    Managers = [];
  }
  let newEmployee = {};
  newEmployee = {
    id: iD,
    firstName: firstname,
    lastName: lastname,
    managers: Managers,
    responsibleFor: responsiblefor,
  };
  // let n =  data.employees.length;
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    const retorno = {};
    data.animals.forEach((each) => {
      const animal = each.name;
      const quantidade = each.residents.length;
      retorno[animal] = quantidade;
    });
    return retorno;
  }
  const animal = data.animals.find(each => Object.values(each).includes(species));
  return animal.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  if (Object.keys(entrants).length === 0) {
    return 0;
  }
  const adult = 'Adult';
  const child = 'Child';
  const senior = 'Senior';
  if (!Object.prototype.hasOwnProperty.call(entrants, 'Adult')) entrants[adult] = 0;
  if (!Object.prototype.hasOwnProperty.call(entrants, 'Child')) entrants[child] = 0;
  if (!Object.prototype.hasOwnProperty.call(entrants, 'Senior')) entrants[senior] = 0;
  const totalAdult = entrants[adult] * 49.99;
  const totalChild = entrants[child] * 20.99;
  const totalSenior = entrants[senior] * 24.99;
  const valorTotal = totalAdult + totalChild + totalSenior;
  return valorTotal;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const agenda = data.hours;
  const dia = Object.keys(agenda);
  dia.forEach((each) => {
    const open = agenda[each].open;
    const close = agenda[each].close;
    agenda[each] = `Open from ${open}am until ${(close - 12)}pm`;
    if (each === 'Monday') {
      agenda[each] = 'CLOSED'; 
    }
  });
  if (!dayName) {
    return agenda;
  }
  const alone = {};
  alone[dayName] = agenda[dayName];
  return alone;
}
// console.log(schedule('Tuesday'));

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const porcentagem = percentage / 100;
  const precos = data.prices;
  const adult = 'Adult';
  const child = 'Child';
  const senior = 'Senior';
  precos[adult] += (precos[adult] * porcentagem);
  precos[adult] = Math.round(precos[adult] * 100) / 100;
  precos[child] += (precos[child] * porcentagem);
  precos[child] = Math.round(precos[child] * 100) / 100;
  precos[senior] += (precos[senior] * porcentagem);
  precos[senior] = Math.round(precos[senior] * 100) / 100;
  return precos;
}

function employeeCoverage(idOrName) {
  const empregados = data.employees;
  const animals = data.animals;
  const result = {};
  if (!idOrName) {
    empregados.forEach((each) => {
      const name = `${each.firstName} ${each.lastName}`;
      const animais = each.responsibleFor;
      result[name] = [];
      animais.forEach((ouch, index) => {
        const animName = animals.find((one) => ouch === one.id);
        result[name].push(animName.name);
      })
      // const respons = animals.filter((anim) => anim.id === animais[0] || anim.id === animais[1]);
      // result[name] = [respons[0].name, respons[1].name];
    })
    return result;
  }
  const empregadinho = empregados.find(each => each.id === idOrName || each.firstName === idOrName || each.lastName === idOrName);
  const name = `${empregadinho.firstName} ${empregadinho.lastName}`;
  const animais = empregadinho.responsibleFor;
  result[name] = [];
  animais.forEach((each) => {
    const respons = animals.find((anim) => anim.id === each)
    result[name].push(respons.name);
  })
  // const respons = animals.filter((anim) => anim.id === animais[animais.length - 1] || anim.id === animais[animais.length - 2] || anim.id === animais[animais.length - 3] || anim.id === animais[animais.length - 4]);
  return result;
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
