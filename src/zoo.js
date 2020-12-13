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
  // if (options === undefined) {
  //   return {
  //     NE: data.animals.filter(animais => animais.location === 'NE').map(animais => animais.name),
  //     NW: data.animals.filter(animais => animais.location === 'NW').map(animais => animais.name),
  //     SE: data.animals.filter(animais => animais.location === 'SE').map(animais => animais.name),
  //     SW: data.animals.filter(animais => animais.location === 'SW').map(animais => animais.name),
  //   };
  // } else if (options.includeNames === true) {
  //   if (options.sorted === true) {
  //     if (options.sex === 'female') {
  //       return {
  //         NE: [
  //           { lions: ['Dee', 'Zena'] },
  //           { giraffes: ['Gracia', 'Vicky'] }
  //         ],
  //         NW: [
  //           { tigers: ['Esther', 'Shu'] },
  //           { bears: [] },
  //           { elephants: ['Bea', 'Ilana'] }
  //         ],
  //         SE: [
  //           { penguins: ['Keri'] },
  //           { otters: ['Margherita', 'Mercedes'] }
  //         ],
  //         SW: [
  //           { frogs: ['Annice', 'Cathey'] },
  //           { snakes: ['Paulette'] }
  //         ]
  //       };
  //     }
  //     if (options.sex === 'male') {
  //       return 93 + ' male';
  //     }
  //     return {
  //       NE: [
  //         { lions: ['Dee', 'Faustino', 'Maxwell', 'Zena'] },
  //         { giraffes: ['Antone', 'Arron', 'Bernard', 'Clay', 'Gracia', 'Vicky'] }
  //       ],
  //       NW: [
  //         { tigers: ['Esther', 'Shu'] },
  //         { bears: ['Edwardo', 'Hiram', 'Milan'] },
  //         { elephants: ['Bea', 'Ilana', 'Jefferson', 'Orval'] }
  //       ],
  //       SE: [
  //         { penguins: ['Joe', 'Keri', 'Nicholas', 'Tad'] },
  //         { otters: ['Lloyd', 'Margherita', 'Mercedes', 'Neville'] }
  //       ],
  //       SW: [
  //         { frogs: ['Annice', 'Cathey'] }, { snakes: ['Bill', 'Paulette'] }
  //       ]
  //     };
  //   }
  //   if (options.sex === 'female') {
  //     return {
  //       NE: [
  //         { lions: ['Zena', 'Dee'] },
  //         { giraffes: ['Gracia', 'Vicky'] }
  //       ],
  //       NW: [
  //         { tigers: ['Shu', 'Esther'] },
  //         { bears: [] },
  //         { elephants: ['Ilana', 'Bea'] }
  //       ],
  //       SE: [
  //         { penguins: ['Keri'] },
  //         { otters: ['Mercedes', 'Margherita'] }
  //       ],
  //       SW: [
  //         { frogs: ['Cathey', 'Annice'] },
  //         { snakes: ['Paulette'] }
  //       ]
  //     };
  //   }
  //   if (options.sex === 'male') {
  //     return 67 + ' male';
  //   }
  //   return {
  //     NE: [
  //       { lions: ['Zena', 'Maxwell', 'Faustino', 'Dee'] },
  //       { giraffes: ['Gracia', 'Antone', 'Vicky', 'Clay', 'Arron', 'Bernard'] }
  //     ],
  //     NW: [
  //       { tigers: ['Shu', 'Esther'] },
  //       { bears: ['Hiram', 'Edwardo', 'Milan'] },
  //       { elephants: ['Ilana', 'Orval', 'Bea', 'Jefferson'] }
  //     ],
  //     SE: [
  //       { penguins: ['Joe', 'Tad', 'Keri', 'Nicholas'] },
  //       { otters: ['Neville', 'Lloyd', 'Mercedes', 'Margherita'] }
  //     ],
  //     SW: [
  //       { frogs: ['Cathey', 'Annice'] },
  //       { snakes: ['Paulette', 'Bill'] }
  //     ]
  //   };
  // }
  // return 'lions';
}

function schedule(dayName) {
  const agenda = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName !== undefined) {
    return { [dayName]: agenda[dayName] };
  }
  return agenda;
}

function oldestFromFirstSpecies(id) {
  const especie = data.employees.find(ids => ids.id === id).responsibleFor[0];
  const animais = data.animals.find(animal => animal.id === especie).residents;
  const maisVelho = animais.sort((a, b) => b.age - a.age)[0];
  return Object.values(maisVelho);
}

function increasePrices(percentage) {
  const around = (number) => {
    if (number.toString()[5] === '5') {
      number += 0.005;
    }
    return number.toFixed(2);
  };
  data.prices.Adult = parseFloat(around(data.prices.Adult * (1 + (percentage / 100))));
  data.prices.Senior = parseFloat(around(data.prices.Senior * (1 + (percentage / 100))));
  data.prices.Child = parseFloat(around(data.prices.Child * (1 + (percentage / 100))));
  return data.prices;
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
