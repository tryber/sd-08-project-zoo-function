const { animals, employees } = require('./data');
const data = require('./data');

function oldestFromFirstSpecies(id) {
  // seu código aqui
  let result = employees.find(employee => employee.id === id);
  result = result.responsibleFor[0];
  result = animals.find(animal => animal.id === result);

  result = result.residents.reduce((acc, curr) => {
    if (acc.age > curr.age) {
      return acc;
    }

    return curr;
  });
  result = [result.name, result.sex, result.age];

  return result;
}

console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
