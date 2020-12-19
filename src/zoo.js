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
  return data.animals.filter(animal => ids.some(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // const specie = data.animals.find(specie => specie.name === animal);
  // return specie.residents.every(resident => resident.age >= age);
  return data.animals
    .find(specie => specie.name === animal)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return data.animals.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
  }
  const animalSearch = data.animals.find(animal => animal.name === species);
  return animalSearch.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  const { prices } = data;
  return Object.keys(entrants).reduce(
    (acc, key) => (acc += prices[key] * entrants[key]),
    0,
  );
}
function filterBySex(specie, sex) {
  return specie.residents.reduce((accumulator, resident) => {
    if (resident.sex === sex) {
      accumulator.push(resident.name);
    }
    return accumulator;
  }, []);
}
function animalsNamesForSpecie(specie, options) {
  const { includeNames, sorted, sex } = options;
  const animalFinded = data.animals.find(animal => animal.name === specie);
  let names = animalFinded.residents.map(resident => resident.name);
  if (includeNames) {
    if (sex) {
      names = filterBySex(animalFinded, sex);
    }
    if (sorted === true) {
      names.sort();
    }
  }
  return names;
}
function mapEstructure() {
  const result = data.animals.reduce((acc, animal) => {
    acc[animal.location] = [];
    return acc;
  }, {});
  return Object.keys(result);
}
function speciesForLocation(location) {
  const result = data.animals.reduce((accumulator, animal) => {
    const validate = animal.location === location;
    if (validate) {
      accumulator.push(animal.name);
    }
    return accumulator;
  }, []);
  return result;
}
function animalMap(options) {
  const result = mapEstructure();
  if (options === undefined || options.includeNames === undefined) {
    return result.reduce((acc, region) => {
      acc[region] = speciesForLocation(region);
      return acc;
    }, {});
  }
  return result.reduce((accumulator, region) => {
    const species = speciesForLocation(region);
    accumulator[region] = species.reduce((acc, specie) => {
      const obj = {};
      obj[specie] = animalsNamesForSpecie(specie, options);
      acc.push(obj);
      return acc;
    }, []);
    return accumulator;
  }, {});
}

function schedule(dayName) {
  // seu código aqui
  const hours = data.hours;

  const message = Object.entries(hours).reduce((acc, [key, value]) => {
    const { open, close } = value;
    acc[key] =
      close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (dayName === undefined) {
    return message;
  }
  return { [dayName]: message[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const { responsibleFor } = data.employees.find(
    employee => employee.id === id,
  );
  return Object.values(
    data.animals
      .find(animal => animal.id === responsibleFor[0])
      .residents.reduce((acc, value) => (value.age > acc.age ? value : acc)),
  );
}

function increasePrices(percentage) {
  // seu código aqui
  const percent = percentage / 100;
  const prices = Object.entries(data.prices);
  prices.map(
    element =>
      (element[1] = Math.round(element[1] * (percent + 1) * 100) / 100),
  );
  prices.forEach(value => (data.prices[value[0]] = value[1]));
  return data.prices;
}
function animalsEmployeeResponsible(employee) {
  return employee.responsibleFor.map(id => animalsByIds(id)[0].name);
}
function employeeCoverage(idOrName) {
  if (idOrName !== undefined) {
    const employeeFinded = data.employees.find(
      employee =>
        employee.id === idOrName ||
        employee.firstName === idOrName ||
        employee.lastName === idOrName,
    );
    const { firstName, lastName } = employeeFinded;
    const result = {};
    result[`${firstName} ${lastName}`] = animalsEmployeeResponsible(
      employeeFinded,
    );
    return result;
  }
  return data.employees.reduce((acc, employee) => {
    const { firstName, lastName } = employee;
    acc[`${firstName} ${lastName}`] = animalsEmployeeResponsible(employee);
    return acc;
  }, {});
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
