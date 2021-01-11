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

const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...args) {
  // seu código aqui
  const animais = [];
  args.forEach((id) => {
    data.animals.forEach((animal) => {
      if (animal.id === id) {
        animais.push(animal);
      }
    });
  });
  return animais;
}

// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function animalsOlderThan(animal, age) {
  // seu código aqui
  const listaDeAnimais = data.animals;
  let temIdade = true;
  let especimes;
  listaDeAnimais.forEach((atual) => {
    if (atual.name === animal) {
      especimes = atual.residents;
    }
  });
  especimes.forEach((especime) => {
    if (especime.age < age) {
      temIdade = false;
    }
  });
  return temIdade;
}

// console.log(animalsOlderThan('otters', 7))
// console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  // seu código aqui
  const employee = {};
  employees.forEach((objFunc) => {
    if (objFunc.firstName === employeeName || objFunc.lastName === employeeName) {
      Object.assign(employee, objFunc);
    }
  });
  return employee;
}

// console.log(employeeByName("Elser"))

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  // seu código aqui
  let ehGerente = false;
  const gerentes = [];
  employees.forEach((empregado) => {
    empregado.managers.forEach((gerente) => {
      if (gerentes.indexOf(gerente) === -1 && gerente === id) {
        ehGerente = true;
      }
    });
  });
  return ehGerente;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  let naLista = false;
  employees.forEach((empregado) => {
    if (empregado.id === id) {
      naLista = true;
    }
  });
  if (naLista === false) {
    employees.push({ id, firstName, lastName, managers, responsibleFor });
  }
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const listaAnimais = {};
    data.animals.forEach((animal) => {
      listaAnimais[animal.name] = animal.residents.length;
    });
    return listaAnimais;
  }
  let saida = 0;
  data.animals.forEach((animal) => {
    if (animal.name === species) {
      saida = animal.residents.length;
    }
  });
  return saida;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined) {
    return 0;
  } else if (Object.keys(entrants).length === undefined) {
    return 0;
  }
  let custo = 0;
  Object.keys(entrants).forEach((chave) => {
    custo += data.prices[chave] * entrants[chave];
  });
  return custo;
}

// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }))

function animalMap(options) {
  // seu código aqui

  // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
}

function schedule(dayName) {
  // seu código aqui
  const calendario = {};
  const dias = Object.keys(data.hours);
  dias.forEach((dia) => {
    if (data.hours[dia].open !== 0) {
      calendario[dia] = `Open from ${data.hours[dia].open}am until ${data.hours[dia].close - 12}pm`;
    } else {
      calendario[dia] = 'CLOSED';
    }
  });
  if (dayName === undefined) {
    return calendario;
  }
  const saida = {};
  saida[dayName] = calendario[dayName];
  return saida;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const funcionario = employees.find(pessoa => pessoa.id === id);
  const idAnimal = funcionario.responsibleFor[0];
  const primeiraEspecie = data.animals.find(animal => idAnimal.includes(animal.id));
  const maiorIdade = primeiraEspecie.residents.map(especime => especime.age)
  .sort((a, b) => b - a)[0];
  const maisVelho = primeiraEspecie.residents.find(especime => especime.age === maiorIdade);
  return Object.values(maisVelho);
}

// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  // seu código aqui
  const faixas = Object.keys(data.prices);
  faixas.forEach((idade) => {
    data.prices[idade] *= (percentage / 100) + 1;
    data.prices[idade] = Math.round(data.prices[idade] * 100) / 100;
  });
  return data.prices;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const tabela = {};
  let nome;
  const animaisNomeId = {};
  // data.animals.forEach((animal) => animaisIdNome[animal.id] = animal.name);
  data.animals.forEach((animal) => animaisNomeId[animal.name] = animal.id);
  employees.forEach((empregado) => {
    let nomeDoEmpregado = empregado.firstName + ' ' + empregado.lastName;
    if (idOrName === empregado.firstName || idOrName === empregado.lastName || idOrName === empregado.id) {
      nome = nomeDoEmpregado;
    }
    const animais = animalsByIds(...empregado.responsibleFor);
    tabela[nomeDoEmpregado] = animais.map((animal) => animal.name)
  });
  if (idOrName === undefined) {
    return tabela;
  }
  const saida = {};
  saida[nome] = tabela[nome];
  return saida; 
}

console.log(employeeCoverage())

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
