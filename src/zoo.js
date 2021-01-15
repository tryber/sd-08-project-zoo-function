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

const { animals, prices, hours } = require('./data');
const { employees } = require('./data');
const data = require('./data');

  // 1- Implemente a função animalsByIds:
  // Caso receba nenhum parâmetro, necessário retornar um array vazio
  // Ao receber como parâmetro um único id, retorna um array com a espécie referente à esse id
  // Ao receber mais de um id, retorna um array com as espécies referentes aos ids

function animalsByIds(...ids) {
  const animalsIds = [...ids];
  const animalArray = [];
  animalsIds.forEach((element) => {
    animals.forEach((animalList) => {
      if (element === animalList.id) {
        animalArray.push(animalList);
      }
    });
  });
  return animalArray;
}

  // 2- Implemente a função animalsOlderThan:
  // Ao passar o nome de uma espécie e uma idade, testa se todos os animais
  // desta espécie possuem a idade mínima especificada
function animalsOlderThan(animal, age) {
  const animalName = animals.find(element => element.name === animal);
  const validate = animalName.residents.every(animalAge => animalAge.age >= age);
  return validate;
}

  // 3- Implemente a função employeeByName:
  // Sem parâmetros, retorna um objeto vazio
  // Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  // Quando provido o último nome do funcionário, retorna o objeto do funcionário

function employeeByName(empName = {}) {
  const empSearch = employees.find(emp => empName === emp.firstName || empName === emp.lastName);
  return empSearch === undefined ? {} : empSearch;
}
  // 4- Implemente a função createEmployee:
  // Cria um novo colaborador a partir de objetos contendo
  // informações pessoais e gerentes e animais gerenciados.

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {};
  Object.assign(newEmployee, personalInfo, associatedWith);
  return newEmployee;
}

  // 5- Implemente a função isManager:
  // Testa se o id passado é de um gerente

function isManager(id) {
  const isManageer = employees.some((element) => {
    const objects = Object.values(element.managers);
    return objects.some(elementMan => elementMan === id);
  });
  return isManageer;
}

  // 6- Implemente a função addEmployee:
  // Adiciona um funcionário no fim da lista

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

  // 7- Implemente a função animalCount:
  // Sem parâmetros, retorna animais e suas quantidades
  // Com o nome de uma espécie de animal, retorna somente a quantidade

function animalCount(species) {
  const animalsList = {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
  const searchAnimal = animals.find(element => element.name === species);
  return searchAnimal === undefined ? animalsList : searchAnimal.residents.length;
}

  // 8- Implemente a função entryCalculator:
  // Retorna 0 se nenhum argumento for passado
  // Retorna 0 se um objeto vazio for passado
  // Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos

function entryCalculator(entrants = 0) {
  const arrayEntry = Object.entries(entrants);
  const priceEntry = Object.entries(prices);
  let value = 0;
  arrayEntry.forEach((element) => {
    priceEntry.forEach((price) => {
      if (element[0] === price[0]) value += (element[1] * price[1]);
    });
  });
  return value;
}

  // 9- Implemente a função animalMap:
  // Sem parâmetros, retorna animais categorizados por localização
  // Com a opção includeNames: true especificada, retorna nomes de animais
  // Com a opção sorted: true especificada, retorna nomes de animais ordenados
  // Com a opção sex: 'female' ou sex: 'male' especificada,
  // retorna somente nomes de animais macho/fêmea
  // Com a opção sex: 'female' ou sex: 'male' especificada e a
  // opção sort: true especificada, retorna somente nomes
  // de animais macho/fêmea com os nomes dos animais ordenados
  // Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada
const animalMapLocation = () => {
  const locations = animals.map(animal => animal.location);
  const set = new Set(locations);
  return [...set];
};

const filteredAnimal = element => animals.filter(animal => animal.location === element);
const animalMapObject = (location) => {
  const objReturn = {};
  location.forEach((element) => {
    const filtered = filteredAnimal(element).map(anim => anim.name);
    objReturn[element] = filtered;
  });
  return objReturn;
};

const animalMapObjectName = (location, sort, sex) => {
  const objReturn = {};
  location.forEach((element) => {
    objReturn[element] = [];
    filteredAnimal(element).map((anim) => {
      const animalName = anim.name;
      let animalResidents = anim.residents.map(residents => residents.name);
      if (sex) {
        animalResidents = anim.residents.filter(animalSex => animalSex.sex === sex)
        .map(animalsexName => animalsexName.name);
      }
      if (sort) animalResidents = animalResidents.sort();
      return objReturn[element].push({ [animalName]: animalResidents });
    });
  });
  return objReturn;
};


function animalMap(options = '') {
  const { includeNames, sorted, sex } = options;
  const location = animalMapLocation();
  if (includeNames) return animalMapObjectName(location, sorted, sex);
  return animalMapObject(location);
}

  // 10- Implemente a função schedule:
  // Sem parâmetros, retorna um cronograma legível para humanos
  // Se um único dia for passado, retorna somente este dia em um formato legível para humanos

const objectDays = () => {
  const arrayHours = Object.entries((hours));
  const object = {};
  arrayHours.forEach((element) => {
    if (element[1].close === 0) object[element[0]] = 'CLOSED';
    else object[element[0]] = `Open from ${element[1].open}am until ${element[1].close - 12}pm`;
  });
  return object;
};

const UniDay = (object, day) => {
  const newArray = Object.entries(object);
  const resultFilter = newArray.find(element => element[0] === day);
  const objectReturn = {};
  objectReturn[resultFilter[0]] = resultFilter[1];
  return objectReturn;
};
function schedule(dayName = 0) {
  if (dayName === 0) {
    return objectDays();
  }
  return UniDay(objectDays(), dayName);
}

  // 11- Implemente a função oldestFromFirstSpecies:
  // Passado o id de um funcionário, encontra a
  // primeira espécie de animal gerenciado pelo funcionário,
  // e retorna um array com nome, sexo e idade do animal mais velho dessa espécie

const oldestEmployeeSearch = (id) => {
  const employeeSearch = employees.find(element => element.id === id);
  return employeeSearch;
};
const oldestAnimalSearch = (employee) => {
  const rspSearch = employee.responsibleFor.map(resp => animals.find(animal => animal.id === resp));
  return rspSearch;
};
const oldestUniqueAnimalSearch = (animal) => {
  const oldestAnimal = animal[0].residents.reduce((big, next) => (next.age > big.age ? next : big));
  const transformArray = Object.values(oldestAnimal);
  return transformArray;
};
function oldestFromFirstSpecies(id) {
  const search = oldestAnimalSearch(oldestEmployeeSearch(id));
  return oldestUniqueAnimalSearch(search);
}

  // 12- Implemente a função increasePrices:
  // Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais

function increasePrices(percentage) {
  const entryPrices = Object.entries(prices);
  const objectValues = entryPrices.map((element) => {
    const calculated = element[1] + (element[1] * (percentage / 100));
    const adjust = Math.round(calculated * 100) / 100;
    return { [element[0]]: adjust };
  });
  objectValues.forEach(element => Object.assign(prices, element));
}

  // Agradeço ao Ricardo Alves, que vi em seu código
  // a utilização do Math.round de forma * 100 e me deu uma luz!

  // 13- Implemente a função employeeCoverage:
  // Sem parâmetros, retorna uma lista de funcionários e os
  // animais pelos quais eles são responsáveis
  // Com o id de um funcionário, retorna os
  // animais pelos quais o funcionário é responsável
  // Com o primeiro nome de um funcionário, retorna os
  // animais pelos quais o funcionário é responsável
  // Com o último nome de um funcionário, retorna os
  // animais pelos quais o funcionário é responsável

const returnObject = (employee) => {
  const objectReturn = {};
  const fullName = `${employee.firstName} ${employee.lastName}`;
  objectReturn[fullName] = [];
  employee.responsibleFor.forEach((respons) => {
    const finder = animals.find(animal => animal.id === respons);
    objectReturn[fullName].push(finder.name);
  });
  return objectReturn;
};
const returnList = () => {
  const objectReturn = {};
  employees.forEach((employee) => {
    Object.assign(objectReturn, returnObject(employee));
  });
  return objectReturn;
};

const returnID = (id) => {
  const employeeFind = employees.find(employee => employee.id === id);
  return returnObject(employeeFind);
};

const returnName = (name) => {
  const employeeFind = employees.find(employee => employee.firstName === name
    || employee.lastName === name);
  return returnObject(employeeFind);
};

const nameOrID = (idOrName) => {
  if (idOrName.length > 25) return returnID(idOrName);
  return returnName(idOrName);
};
function employeeCoverage(idOrName) {
  if (!idOrName) return returnList();
  return nameOrID(idOrName);
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
