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

function animalsByIds(...ids) {
  if (!ids) return [];

// return ids.map(id => animals.find(animal => animal.id === id));
// Vídeo Plantão e Vídeo PSimões, pra cada id ele vai rodar um map e trazer o animal.
// desestrutura no global o animals , seria a mesma coisa de data.animals e da p usar direto animal
// usa o destructuring por serem só quatro propriedades, animals, employees, prices e hours
// ou se não usaria
// const data = require('./data') e utilizaria data.animals,data.employees,data.prices,data.hours
// utilizando o data.employees por ex deixaria claro que o employees advem do arquivo data
// vscode já adiciona o global desestruturado como está na linha 12, e a sintaxe fica mais clean
// destructuring é mais usado quando tem mtas propriedades, normalmente usa o data.hours etc.
// limite de não usar banco de dados, depois que entra o banco de dados mais facil usar destruct.

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
// determina o valor inicial como 0 (indice ou index [0]) e o atual na primeira chave do entrants
// determinado o numero de entrants,verifica o preço e multiplica um pelo outro e add no acumulator
// prices ta desestruturado lá em cima

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const endResult = Object.entries(hours).reduce((store, [key, val]) => {
    const { open, close } = val;
    store[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return store;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: endResult[dayName] };
  return endResult;
}

// retornar os dias, horario de abertura e horario de fechamento nessa ordem.
// basicamente precisa criar um novo objeto, mantendo as propriedades somente
// alterando o valor delas, horario de abertura e fechamento. Lembrando do formato de AM/PM
// hours tá desestruturado lá em cima
// object.entries, pegar tds entradas (hours) e partir para um reduce. Que retorna sempre
// propriedade e valor. Vai ter um reduce no array
// de array. A gnt mantem a propriedade mas altera o valor.
// O primeiro valor - key é a chave e o segundo val é o valor.
// que na sequencia tem a função que tem o acumulador e a propriedade com a mesma chave anterior
// % módulo - 12 horas - sempre divide por 12 as horas, retornando valor inteiro assim tem AM/PM
// determinando se o close for maior que 0 tem a condicional de quando vai abrir.
// se a condição for verdadeira : retorna o open until, se não retorna closed.
// sempre começando com objeto vazio e iterando dentro do acumulator
// pegamos o objeto pronto, e testamos se o dayname for uma string e o valor maior que 0
// retorna ele e o horário.

function oldestFromFirstSpecies(id) {
  const employee = employees.find(current => current.id === id);
  const speciesId = employee.responsibleFor[0];
  const animal = animalsByIds(speciesId)[0];
  const { residents } = animal;
  const oldestAnimal = residents.reduce((olderAnimal, actual) => (
    actual.age > olderAnimal.age ? actual : olderAnimal
  ));
  return Object.values(oldestAnimal);
}

// console.log(oldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

// passado o id de um funcionário, encontra a primeira especie de um animal gerenciado pelo
// funcionário e retorna array com nome, sexo e idade do animal mais velho da especie.
// Pegar o funcionário, passar seu ID e retornar o animal que ele é responsável naquele ID
// buscados os animais, faz um reduce, com o acumulador apos o atual, itera e verifica o mais velho
// depois dos condicionais retorna o valor encontrado, se o atual tiver idade maior que o mais
// velho retorna o atual se nao o mais velho

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach(key => (
    prices[key] = Math.round(prices[key] * increase * 100) / 100
  ));
}

// Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais
// para arredondar um valor é necessário multiplicar por 100, e depois utilizar o math.round
// e  divivir por 100 e assim retorna duas casas decimais.
// se for porcentagem, utiliza-se o seguinte ex: 1000 * (50/100 + 1)
// começa com object.keys, pega as chaves dos preços, faz um foreach, pega cada chave, prices
// na chave, que vai ser um valor novo, passando o math round para arrendodar e trazer as casas.
// como são duas casas multiplica por 100.

function employeeById(id) {
  return employees.find(employee => employee.id === id);
}
function employeeCoverage(idOrName) {
  const result = employees.reduce((acc, employee) => {
    const { firstName, lastName, responsibleFor } = employee;
    acc[`${firstName} ${lastName}`] = responsibleFor.map(id => animalsByIds(id)[0].name);
    return acc;
  }, {});
  if (typeof idOrName === 'string' && idOrName.length !== 0) {
    const employee = employeeByName(idOrName) || employeeById(idOrName);
    const { firstName, lastName } = employee;
    const name = `${firstName} ${lastName}`;
    return { [name]: result[name] };
  }
  return result;
}

// Sem parâmetros, retorna uma lista de funcionários e os animais pelos quais eles são responsáveis
// uma lista de funcionários buscando o grupo mais geral dos animais, o que cada func é responsável
// fazendo um reduce e um objeto por fora, vazio, utilizando o acumulador,percorre employee
// suas propriedades, pedido no teste:
// first e last name, e os seus animais responsibleFor. Faz um map no responsiblefor pega o id do
// animal através da função animalsByIds chama c o id e utliza ela no index[0] -> elemento name.
// o nome animais e os funcionários responsáveis.
// quando recebe nada retorna array vazio, quando recebe id retorna array com elementos
// como eu sei que vou passar id, ou vai ter array vazio ou array com um elemento só, o name

// tendo tudo em uma lista, const result, crio a verificação id or name, se existe,
// primeiro crio a função employeeById que vai retornar somente os id.
// caso exista, tento encontrar o employee, const employee, e retorno objeto que tenha
// primeiro pelo nome, caso nao encontre, procura pelo id, retornando o objeto - > funcionário
// com os elementos(propriedades) first name, last name. const name
// retornando propriedade [name] e o result [name].

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
