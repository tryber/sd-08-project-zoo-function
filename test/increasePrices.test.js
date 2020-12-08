const assert = require('assert');
const zoo = require('../src/zoo');
const data = require('../src/data');


describe('Implemente a função increasePrices', () => {
  it('Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais', () => {
    zoo.increasePrices(50);
    let expected = {
      'Adult': 74.99,
      'Senior': 37.49,
      'Child': 31.49
    };
    assert.deepStrictEqual(data.prices, expected);

    zoo.increasePrices(30);
    expected = {
      'Adult': 64.99,
      'Senior': 32.49,
      'Child': 27.29
    };
    assert.deepStrictEqual(data.prices, expected);
  });
});
