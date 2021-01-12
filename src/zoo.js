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

const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
// return ids.map(id => animals.find(animal => animal.id === id));
// Vídeo Plantão e Vídeo PSimões, pra cada id ele vai rodar um map e trazer o animal.
  return animals.filter(animal => ids.includes(animal.id));
  // filtrando o critério (animal) e vendo se ele entra na lista - Plantão
}

function animalsOlderThan(animalName, age) {
  let result = animals.find(animal => animal.name === animalName);
  if (result) result = result.residents.every(animal => animal.age >= age);
  return result;

  //  Para existir um tratamento de erro, caso não exista o objeto buscado e apresente o erro.
  //  return animals.find(animal => animal.name === animalName)
  //  .residents.every(animal => animal.age >= age;
  //  Buscando a forma de retornar o array do residents, com todas as infos.
  //  Assumindo claro que todos os objetos vão retornar,
  //  se o resultado for nulo vai dar erro, por isso o tratamento do erro acima. Video PSimões
}
  //  console.log(animalsOlderThan('otters',7));

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(employee => (
      employee.firstName === employeeName || employee.lastName === employeeName));
  // retornando uma procura pelo funcionário com aquele primeiro nome
  // mesma coisa que com os animais, só que agora com employees ex no console.log ('Emery')
}

  //  console.log(employeeByName('Emery'));

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}
// com o destructuring eu consigo os objetos todos personalinfo e associatedwith
// to trazendo os objetos do data e colocando td junto no return, criando um novo objeto
// um novo employee.
// return Object.assign({}, personalInfo, associatedWith); tbm passa no teste-PS
// no exemplo acima to criando um objeto novo, novo employee, copiando,
// colocando personlInfo e associatedWith dentro dele.

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

// no data se localiza o managers - no sentido de quem é o manager do employee
// e tem o responsiblefor - o que o employee é responsável, quais ids animais ele responde
// o return pega employees, faz um some, onde para cada employee eu verifico, se o manager
// tem aquele id, se ele tiver significa que ele é de algum gerente.

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  return employees.push(createEmployee(personalInfo, associatedWith));
}

// employees já ta desestruturado lá em cima.
// o teste só cria id, firstName, lastName, se a gnt não determinar um padrão fica undefined
// managers = [] e responsibleFor = [] são os objetos padrões.
// reutiliza a função createEmployee, e passa como parametros personalInfo e associatedWith

function animalCount(species) {
  const result = animals.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
    // return Object.assign(acc, {
    //   [cur.name]: cur.residents.length
    // });
  }, {});
  if (typeof species === 'string' && species.length !== 0) return result[species];
  return result;
}

// olhando os animais, cada um tem um objeto geral, com name, id, popularity, residents
// necessário iterar animais, e para cada objeto geral retornar uma propriedade desse nome
// com o length desse array residents.
// A função percorre o array de animais, faz um reduce, começa com objeto vazio, para cada animal a
// pega o objeto que ta acumulando e adiciona o name e length da quantidade de animais que tem nele
// Aula de reduce - Gus. Declara o objeto vazio, (ou no // chave valor), acumulador com cur.name,
// não precisa do object.assign.
// if (species) return result[species]
// esse if acima é para fazer uma checagem na hora de passar a specie. Confia que o usuario vai
// passar string, uma string no lugar de specie. Por isso o teste feito é mais confiável, delimita

function entryCalculator(entrants) {
  if (typeof entrants !== 'object' || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((accumulator, key) => (
      accumulator + (entrants[key] * prices[key])
  ), 0);
}

// verificar qual o tipo de entrant, se adult, child or senior
// percorre cada chave do entrant, e cada chave coincide entre os entrants com seus prices
// determina o valor inicial como 0 e o atual na primeira chave do entrants
// determinado o numero de entrants,verifica o preço e multiplica um pelo outro e add no acumulator

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
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
