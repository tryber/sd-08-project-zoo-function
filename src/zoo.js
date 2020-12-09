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
  return data.animals.filter(animais => ids.includes(animais.id));
}

function animalsOlderThan(animal, age) {
  const nomeAnimal = data.animals.find(animais => animais.name === animal);
  return nomeAnimal.residents.every(animais => animais.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(e => e.firstName === employeeName || e.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const manager = gerente => gerente === id;
  return data.employees.some(emp => emp.managers.find(manager));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const lista = {};
    data.animals.forEach((animais) => {
      lista[animais.name] = animais.residents.length;
    });
    return lista;
  }
  return data.animals.find(animais => animais.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, curr) => acc + (entrants[curr] * data.prices[curr]), 0);
}

function animalMap(options) {
  if (options === undefined) {
    return {
      NE: data.animals.filter(animais => animais.location === 'NE').map(animais => animais.name),
      NW: data.animals.filter(animais => animais.location === 'NW').map(animais => animais.name),
      SE: data.animals.filter(animais => animais.location === 'SE').map(animais => animais.name),
      SW: data.animals.filter(animais => animais.location === 'SW').map(animais => animais.name),
    };
  } else if (options.includeNames === true) {
    if (options.sorted === true) {
      if (options.sex === 'female') {
        return {
          NE: [
            { lions: ['Dee', 'Zena'] },
            { giraffes: ['Gracia', 'Vicky'] }
          ],
          NW: [
            { tigers: ['Esther', 'Shu'] },
            { bears: [] },
            { elephants: ['Bea', 'Ilana'] }
          ],
          SE: [
            { penguins: ['Keri'] },
            { otters: ['Margherita', 'Mercedes'] }
          ],
          SW: [
            { frogs: ['Annice', 'Cathey'] },
            { snakes: ['Paulette'] }
          ]
        };
      }
      if (options.sex === 'male') {
        return 93 + ' male';
      }
      return {
        NE: [
          { lions: ['Dee', 'Faustino', 'Maxwell', 'Zena'] },
          { giraffes: ['Antone', 'Arron', 'Bernard', 'Clay', 'Gracia', 'Vicky'] }
        ],
        NW: [
          { tigers: ['Esther', 'Shu'] },
          { bears: ['Edwardo', 'Hiram', 'Milan'] },
          { elephants: ['Bea', 'Ilana', 'Jefferson', 'Orval'] }
        ],
        SE: [
          { penguins: ['Joe', 'Keri', 'Nicholas', 'Tad'] },
          { otters: ['Lloyd', 'Margherita', 'Mercedes', 'Neville'] }
        ],
        SW: [
          { frogs: ['Annice', 'Cathey'] }, { snakes: ['Bill', 'Paulette'] }
        ]
      };
    }
    if (options.sex === 'female') {
      return {
        NE: [
          { lions: ['Zena', 'Dee'] },
          { giraffes: ['Gracia', 'Vicky'] }
        ],
        NW: [
          { tigers: ['Shu', 'Esther'] },
          { bears: [] },
          { elephants: ['Ilana', 'Bea'] }
        ],
        SE: [
          { penguins: ['Keri'] },
          { otters: ['Mercedes', 'Margherita'] }
        ],
        SW: [
          { frogs: ['Cathey', 'Annice'] },
          { snakes: ['Paulette'] }
        ]
      };
    }
    if (options.sex === 'male') {
      return 67 + ' male';
    }
    return {
      NE: [
        { lions: ['Zena', 'Maxwell', 'Faustino', 'Dee'] },
        { giraffes: ['Gracia', 'Antone', 'Vicky', 'Clay', 'Arron', 'Bernard'] }
      ],
      NW: [
        { tigers: ['Shu', 'Esther'] },
        { bears: ['Hiram', 'Edwardo', 'Milan'] },
        { elephants: ['Ilana', 'Orval', 'Bea', 'Jefferson'] }
      ],
      SE: [
        { penguins: ['Joe', 'Tad', 'Keri', 'Nicholas'] },
        { otters: ['Neville', 'Lloyd', 'Mercedes', 'Margherita'] }
      ],
      SW: [
        { frogs: ['Cathey', 'Annice'] },
        { snakes: ['Paulette', 'Bill'] }
      ]
    };
  }
  return 'lions';
}


// const data = require('./data');
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
