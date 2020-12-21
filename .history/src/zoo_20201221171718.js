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

const { animals } = require('./data');
const data = require('./data');
const { hours } = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  // Esta função é responsável pela busca das espécies de animais por id. Ela retorna um array
  // contendo as espécies referentes aos ids passados como parâmetro,
  // podendo receber um ou mais ids.
  // Observações técnicas
  // O parâmetro desta função pode ser alterado para atender ao requisito proposto
  // O que será avaliado
  // Caso receba nenhum parâmetro, necessário retornar um array vazio
  // Ao receber como parâmetro um único id, retorna um array com a espécie referente à esse id
  // Ao receber mais de um id, retorna um array com as espécies referentes aos ids
  // console.log(ids);
  // console.log(ids.forEach((id) => animals.filter((animal) => animal.id === id)));
  const result = [];
  if (ids.length === 0) { return []; }
  ids.forEach(id => result.push(animals.find(animal => animal.id === id)));
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais
  // daquela espécie possuem a idade mínima especificada
  // Observações técnicas
  // Deve retornar um valor booleano
  // O que será avaliado
  // Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie possuem
  // a idade mínima especificada
  let result = true;
  const dataAnimal = animals.find(creature => creature.name === animal);
  // console.table(dataAnimal.residents)
  // console.log(age)
  dataAnimal.residents.forEach((creature) => {
    if (creature.age < age) {
      result = false;
    }
  });
  // console.log(result);
  return result;
}

function employeeByName(employeeName) {
  // seu código aqui
  // Esta função é responsável pela busca das pessoas colaboradoras através do
  // primeiro ou do último nome delas
  // O que será avaliado
  // Sem parâmetros, retorna um objeto vazio
  // Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  // Quando provido o último nome do funcionário, retorna o objeto do funcionário
  if (typeof employeeName === 'undefined') { return {}; }
  return data.employees.find((employee) => {
    const result = employee.firstName === employeeName || employee.lastName === employeeName;
    return result;
  });
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  // A função, a partir de informações recebidas nos parâmetros, é capaz de criar
  // um objeto equivalente ao de uma pessoa colaboradora, retornando-o
  // Observações técnicas
  // O parâmetro personalInfo recebe um objeto que contém o id, o firstName e o lastName
  // O parâmetro associatedWith recebe um objeto que contém dois array: managers e responsibleFor
  // O que será avaliado
  // Cria um novo colaborador a partir de objetos contendo informações
  // pessoais e gerentes e animais gerenciados.
  const employee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return employee;
}

function isManager(id) {
  // seu código aqui
  // Verifica se uma pessoa colaboradora, a partir de seu id, ocupa cargo de gerência.
  // Observações técnicas
  // Deve retornar um valor booleano
  // O que será avaliado
  // Testa se o id passado é de um gerente
  let isIdOfManager = false;
  const result = data.employees.filter((employee) => {
    const results = employee.managers[0] === id || employee.managers[1] === id;
    return results;
  });
  // data.employees.forEach((employee) => {console.log(employee.managers)});
  if (result.length >= 1) { isIdOfManager = true; }
  // console.log(` string de resultado   ${result} e tem como resoltado ${isManager}`);
  return isIdOfManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  // A função irá adicionar uma nova pessoa colaboradora ao array employees,
  // presente no arquivo data.js.
  // O que será avaliado
  // Adiciona um funcionário no fim da lista
  const newEmploy = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmploy);
}

function animalCount(species) {
  // seu código aqui
  // Esta função é responsável por contabilizar a quantidade de animais.
  // Observações técnicas
  // Sem parâmetros, retorna um objeto
  // Com o nome de uma espécie de animal, retorna um número
  // O que será avaliado
  // Sem parâmetros, retorna animais e suas quantidades
  // Com o nome de uma espécie de animal, retorna somente a quantidade
  if (typeof species === 'string') {
    const theAnimal = animals.find(animal => animal.name === species);
    return theAnimal.residents.length;
  }
  const numberOfAnimal = {};
  animals.forEach((animal) => {
    numberOfAnimal[animal.name] = animal.residents.length;
  });
  return numberOfAnimal;
}

function entryCalculator(entrants) {
  // seu código aqui
  // A partir da quantidade de visitantes e a faixa etária de cada um,
  // esta função é responsável por retornar o preço total a ser cobrado
  // Observações técnicas
  // O parâmetro entrants recebe um objeto que contém as chaves Adult, Child e Senior,
  // com suas respectivas quantidades de pessoas
  // O que será avaliado
  // Retorna 0 se nenhum argumento for passado
  // Retorna 0 se um objeto vazio for passado
  // Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
  if (typeof entrants !== 'object') { return 0; }
  if (entrants === {}) { return 0; }
  let received = 0;
  // const multipleEntries(a,b) => {
  //   received += a * b;
  //   console.log(`${received} =  ${a} x ${b}`);
  // }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  // const zooPrices = data.prices;
  // const {priceAdult, priceChild, priceSenior} = zooPrices;
  received += data.prices.Adult * Adult;
  received += data.prices.Child * Child;
  received += data.prices.Senior * Senior;
  // multipleEntries(...entrants, ...data.prices);
  return received;
}

function animalMap(options) {
  // seu código aqui
  // A função é responsável pelo mapeamento geográfico das espécies e seus animais,
  // podendo ainda filtrá-los por ordem alfabética e gênero, por exemplo
  // Observações técnicas
  // Analise o teste unitário para entender os retornos que são esperados para esta função
  // O que será avaliado
  // Sem parâmetros, retorna animais categorizados por localização
  // Com a opção includeNames: true especificada, retorna nomes de animais
  // Com a opção sorted: true especificada, retorna nomes de animais ordenados
  // Com a opção sex: 'female' ou sex: 'male' especificada, retorna somente nomes de animais
  // macho/fêmea
  // Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada,
  // retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
  // Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada
}

function schedule(dayName) {
//   // // seu código aqui
//   // // A função é responsável por disponibilizar as informações de horário para uma
//   // // consulta, que pode querer ter acesso a todo o cronograma da semana ou apenas
//   // // o cronograma de um dia específico
//   // // Observações técnicas
//   // // Analise o teste unitário para entender os retornos que são esperados para esta função
//   // // O que será avaliado
//   // // Sem parâmetros, retorna um cronograma legível para humanos
//   // // Se um único dia for passado, retorna somente este dia em um formato legível para humanos
//   // let calendar = data.hours;
//   // let daysAsked=[];
//   // if (typeof dayName !== 'string') {
//   //   daysAsked = Object.keys(calendar);
//   // } else {
//   //   daysAsked[0] = dayName;
//   // }


//   // let result = {};
//   // // let result ="";
//   // console.table(calendar);
//   // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
//   // // https://stackoverflow.com/questions/54651873/how-to-map-key-value-pairs-of-a-map-in-javascript
//   // const days = Object.entries(calendar).reduce((,[k,v]) =>{
//   //   if (v.open === 0) { return `CLOSED` };
//   //   return `Open from  ${v.open}am until  ${v.close}pm`;
//   // })
//   // console.table(days);
//   // let daysList = Object.keys(calendar);
//   // for (const day in calendar){
//   //   result  = daysAsked.forEach((date,index) => {
//   //     if (day === date){
//   //       day = days[index];
//   //     }
//   //   })
//   // }
//   // console.table(result);
//   // return days;
//   // // return result;

//   // // function logMapElements(value, key, map) {
//   // //   console.log(`m[${key}] = ${value}`);
//   // // }

//   // // new Map([['foo', 3], ['bar', {}], ['baz', undefined]])
//   // //   .forEach(logMapElements);

//   // // // expected output: "m[foo] = 3"
//   // // // expected output: "m[bar] = [object Object]"
//   // // // expected output: "m[baz] = undefined"
//   // let daysAsked=[];
//   // if (typeof dayName !== 'string') {
//   //   daysAsked = Object.keys(calendar);
//   // } else {
//   //   daysAsked[0] = dayName;
//   // }
//   const result = {};
//   // let result ="";
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
//   // https://stackoverflow.com/questions/54651873/how-to-map-key-value-pairs-of-a-map-in-javascript

//   const xblau = Object.entries(hours).reduce((day) => {
//     console.table(day);
//     // console.log(`value: ${day[0].valueOf()}`);
//    // console.log(`open: ${day[1].open}`);
//     if(day[0].valueOf() === dayName){
//       if (day[1].open === 0) {
//         result[day[0].valueOf()] = `CLOSED` ;
//         return 0;
//       }
//         result[day[0].valueOf()] =  `Open from  ${day[1].open}am until  ${day[1].close}pm`;
//         return 1;
//     } else {
//       if (day[1].open === 0) {
//         result[day[0].valueOf()] = `CLOSED` ;
//       }
//         result[day[0].valueOf()] =  `Open from  ${day[1].open}am until  ${day[1].close}pm`;
//     }
//   })

//   // const days = Object.entries(calendar).reduce(([k,v]) =>{
//   //   if (v.open === 0) { return `CLOSED` };
//   //   return `Open from  ${v.open}am until  ${v.close}pm`;
//   // })
//   // console.table(days);
//   // let daysList = Object.keys(calendar);
//   // for (const day in calendar){
//   //   result  = daysAsked.forEach((date,index) => {
//   //     if (day === date){
//   //       day = days[index];
//   //     }
//   //   })
//   // }
//   console.log(`resultado ${xblau}`)
//   console.table(result);
//   return days;
}


function oldestFromFirstSpecies(id) {
  // seu código aqui
  // A função busca por informações do animal mais velho da primeira espécie
  // gerenciada pela pessoa colaboradora do parâmetro
  // O que será avaliado
  // Passado o id de um funcionário, encontra a primeira espécie de animal
  // gerenciado pelo funcionário, e retorna um array com nome, sexo e idade
  // do animal mais velho dessa espéciet
  const firstAnimalID = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const AnimalsList = animals.find(animal => animal.id === firstAnimalID).residents;
  AnimalsList.sort((animal, bnimal) => bnimal.age - animal.age);
  console.log(AnimalsList[0]);
  return [AnimalsList[0].name, AnimalsList[0].sex, AnimalsList[0].age];
}

function increasePrices(percentage) {
  // seu código aqui
  // A função é responsável por aumentar o preço das visitas, com base no
  // valor de aumento recebido no parâmetro, em porcentagem
  // Observações técnicas
  // Se o parâmetro da função recebe o valor 20, o aumento é de 20%
  // Altera o objeto prices do arquivo data.js
  // O que será avaliado
  // Ao passar uma porcentagem, incrementa todos os preços, arrendondados
  // em duas casas decimais
}

function employeeCoverage(idOrName) {
  // seu código aqui
  // A função é responsável por consultar as espécies pela qual a pessoa colaborada, recebida
  // no parâmetro através de seu id, firstName ou lastName, é responsável
  // Observações técnicas
  // Analise o teste unitário para entender os retornos que são esperados para esta função
  // O que será avaliado
  // Sem parâmetros, retorna uma lista de funcionários e os
  // animais pelos quais eles são responsáveis
  // Com o id de um funcionário, retorna os animais pelos quais o funcionário é responsável
  // Com o primeiro nome de um funcionário, retorna os
  // animais pelos quais o funcionário é responsável
  // Com o último nome de um funcionário, retorna os animais pelos quais o funcionário é responsável
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
