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

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return ids;
  }

  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(elem => elem.name === animal);
  return findAnimal.residents.every(eachAnimal => eachAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees.find(
    person =>
      person.firstName === employeeName || person.lastName === employeeName
  );
}

function createEmployee(personalInfo, associatedWith) {
  if (!personalInfo || !associatedWith) {
    return {};
  }
  const employee = {
    ...personalInfo,
    ...associatedWith,
  };

  return employee;
}

function isManager(id) {
  let checkTrueOrFalse = false;
  const checkManager = data.employees.find(element =>
    element.managers.includes(id)
  );
  if (checkManager !== undefined) {
    checkTrueOrFalse = true;
  }

  return checkTrueOrFalse;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) {
  if (!id || !firstName || !lastName) {
    return {};
  }
  const addNewEmployee = data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });

  return addNewEmployee;
}

function animalCount(species) {
  const countAnimal = {};
  if (!species) {
    animals.forEach(
      animal => (countAnimal[animal.name] = animal.residents.length)
    );
    return countAnimal;
  }
  const findAnimal = animals.find(animal => animal.name === species);
  const totalRes = findAnimal.residents.length;
  return totalRes;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const entrantsKeys = Object.keys(entrants).map(
    eachKey => data.prices[eachKey]
  );
  const entrantsValues = Object.values(entrants).reduce(
    (acc, curr, index) => acc + entrantsKeys[index] * curr,
    0
  );

  return entrantsValues;
}

const animalFilter = (name, sorted, sex) => {
  let filterAnimal = animals.find(animal => animal.name === name).residents;
  if (sex === 'female' || sex === 'male') {
    filterAnimal = filterAnimal.filter(animal => animal.sex === sex);
  }

  const filteredAnimal = filterAnimal.map(animal => animal.name);

  if (sorted) {
    filteredAnimal.sort();
  }

  return { [name]: filteredAnimal };
};

function animalMap(options = {}) {
  // codigo
  const { includeNames = false, sorted = false, sex } = options;

  let mapResult = animals.reduce((acc, animal) => {
    if (!acc[animal.location]) {
      acc[animal.location] = [];
    }
    acc[animal.location].push(animal.name);
    return acc;
  }, {});

  if (includeNames) {
    mapResult = Object.entries(mapResult).reduce((acc, [region, animal]) => {
      acc[region] = animal.map(name => animalFilter(name, sorted, sex));
      return acc;
    }, {});
  }

  return mapResult;
}

function schedule(dayName = '') {
  // seu código aqui
  const myObj = {};

  Object.entries(data.hours).reduce((acc, [index, value]) => {
    const closeTime = value.close % 12;
    return (myObj[index] =
      value.close - value.open > 0
        ? `Open from ${value.open}am until ${closeTime}pm`
        : 'CLOSED');
  }, {});

  const dayExist = Object.entries(myObj).some(day => day[0] === dayName);
  if (dayName !== '') {
    if (!dayExist) {
      return 'Dia inválido!';
    }

    return { [dayName]: myObj[dayName] };
  }

  return myObj;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  let result = data.employees.find(employee => employee.id === id);
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

function increasePrices(percentage) {
  // seu código aqui
  const { prices } = data;
  return Object.entries(prices).forEach(price => {
    let newValue = Math.round(price[1] * (percentage / 100 + 1) * 100) / 100;
    prices[price[0]] = newValue;
  });
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const { employees } = data;
  const obj = {};

  if (!idOrName) {
    employees.map(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      const respFor = employee.responsibleFor.map(resp => {
        const animalName = animals.find(animal => animal.id === resp);
        return animalName.name;
      });
      obj[fullName] = respFor;
    });
    return obj;
  }

  const findEmployee = employees.find(
    employee =>
      employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName
  );

  const resposibleFor = findEmployee.responsibleFor.map(resp => {
    const animalName = animals.find(animal => animal.id === resp);
    return animalName.name;
  });
  const fullName = `${findEmployee.firstName} ${findEmployee.lastName}`;
  obj[fullName] = resposibleFor;

  return obj;
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
