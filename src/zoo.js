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

const {
  animals, employees, prices, hours,
} = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return ids.map(paramId => animals.find(species => species.id === paramId));
}

function animalsOlderThan(animal, age) {
  const species = animals.find(element => element.name === animal);
  return species.residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  const employee = employees.find(element => (
    element.firstName === employeeName
    || element.lastName === employeeName));
  return employee || {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return Boolean(employees.find(employee => employee.managers.includes(id)));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  employees.push(
    {
      id,
      firstName,
      lastName,
      managers: managers || [],
      responsibleFor: responsibleFor || [],
    },
  );
}

function animalCount(species) {
  if (species) {
    return animals.find(animal => animal.name === species).residents.length;
  }
  const countArray = animals.map(animal => ({ [animal.name]: animal.residents.length }));
  return countArray.reduce((accumulator, currentValue) => ({ ...accumulator, ...currentValue }));
}

function entryCalculator(entrants) {
  if (!entrants) { return 0; }
  return Object.entries(entrants).reduce(((acc, val) => acc + (val[1] * prices[val[0]])), 0);
}

function animalsByLocation() {
  return animals.map(element => ({
    [element.location]: element.name,
  }));
}

function animalNames() {
  return animals.map(element => ({
    [element.location]: { [element.name]: element.residents.map(being => being.name) },
  }));
}

function genderNames(sex) {
  return animals.map(element => ({
    [element.location]: {
      [element.name]: element.residents
        .filter(being => being.sex === sex)
        .map(being => being.name),
    },
  }));
}

function nameReducer(mappedNames) {
  return mappedNames.reduce(((acc, obj) => {
    const key = Object.keys(obj)[0];
    if (key in acc) {
      acc[key].push(obj[key]);
    } else {
      acc[key] = [obj[key]];
    }
    return acc;
  }), {});
}

function animalSort(nameList) {
  const keys = Object.keys(nameList);
  keys.forEach(key => (nameList[key]).forEach((obj) => {
    const subKey = Object.keys(obj)[0];
    obj[subKey].sort();
  }));
  return nameList;
}

function animalMap(options) {
  const { includeNames = false, sorted = false, sex } = options || {};
  let result = nameReducer(animalsByLocation());

  if (includeNames && !sorted && !sex) {
    result = nameReducer(animalNames());
  }

  if (includeNames && sorted && !sex) {
    result = animalSort(nameReducer(animalNames()));
  }

  if (includeNames && !sorted && sex) {
    result = nameReducer(genderNames(sex));
  }

  if (includeNames && sorted && sex) {
    result = animalSort(nameReducer(genderNames(sex)));
  }

  return result;
}

function timeConvert(number) {
  if (number < 13) return `${number}am`;
  return `${number - 12}pm`;
}

function schedule(dayName = 'All') {
  const { ...weekDays } = hours;
  Object.keys(weekDays).forEach((key) => {
    if (weekDays[key].open === weekDays[key].close) {
      weekDays[key] = 'CLOSED';
    } else {
      weekDays[key] = `Open from ${timeConvert(weekDays[key].open)} until ${timeConvert(weekDays[key].close)}`;
    }
  });

  if (dayName === 'All') {
    return weekDays;
  }
  return { [dayName]: weekDays[dayName] };
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  const oldestSpecimen = animalsByIds(animalId)[0].residents.sort((a, b) => b.age - a.age)[0];
  return Object.values(oldestSpecimen);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.ceil(prices[key] * (100 + percentage)) / 100;
  });
  return prices;
}

function allAnimals(ids) {
  return ids.map(id => animals.find(animal => animal.id === id).name);
}

function employeeCoverage(idOrName = 'All') {
  const employeeList = Object.fromEntries(employees.map(element => [`${element.firstName} ${element.lastName}`, allAnimals(element.responsibleFor)]));

  if (idOrName === 'All') return employeeList;

  const selectedEmployee = employees.find(employee => employee.id === idOrName
    || employee.firstName === idOrName
    || employee.lastName === idOrName);

  const selectedEmployeeName = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;

  return { [selectedEmployeeName]: employeeList[selectedEmployeeName] };
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
