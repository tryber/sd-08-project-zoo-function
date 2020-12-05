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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(({ name }) => name === animal)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  const employee = data.employees
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
  if (!employee) return {};
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const animals = data.animals.reduce((accumulator, animal) => {
    const { name, residents } = animal;
    return { ...accumulator, [name]: residents.length };
  }, {});
  if (!species) return animals;
  return animals[species];
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const { Adult: AdultPrice, Child: ChildPrice, Senior: SeniorPrice } = data.prices;
  return (Adult * AdultPrice) + (Child * ChildPrice) + (Senior * SeniorPrice);
}

const getNames = (objArray, sort = false) => {
  const names = objArray.map(({ name }) => name);
  if (sort) names.sort();
  return names;
};

const filterSex = (objArray, sex) => objArray
  .filter(({ sex: aSex }) => !([sex, aSex].includes('male') && [sex, aSex].includes('female')));

function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex = 'both' } = options;

  const animalsMapObj = data.animals.reduce((accumulator, animal) => {
    const { location, name, residents } = animal;
    let nameS = name;

    if (includeNames) nameS = { [name]: getNames(filterSex(residents, sex), sorted) };

    if (Object.keys(accumulator).includes(location)) {
      accumulator[location] = [...accumulator[location], nameS];
    } else accumulator[location] = [nameS];

    return accumulator;
  }, {});

  return animalsMapObj;
}

const ampm = (hour) => {
  if (hour % 24 === 0) return '12am';
  return (hour < 12 ? `${hour}am` : `${(12 * (hour === 12)) + (hour % 12)}pm`);
};

function schedule(dayName = 'everyday') {
  const days = Object.keys(data.hours);

  const scheduleFormated = days.map((day) => {
    const { open, close } = data.hours[day];
    if (open === close) return 'CLOSED';
    return `Open from ${ampm(open)} until ${ampm(close)}`;
  });

  const scheduleObj = scheduleFormated.reduce((accumulator, scheduleDay, index) => {
    if (dayName === days[index] || dayName === 'everyday') {
      return { ...accumulator, [days[index]]: scheduleDay };
    }
    return accumulator;
  }, {});

  return scheduleObj;
}


function oldestFromFirstSpecies(id) {
  const { responsibleFor: animalsIds } = data.employees.find(({ id: idEmp }) => id === idEmp);
  const [firstAnimalId] = animalsIds;
  const { residents: animalList } = animalsByIds(firstAnimalId)[0];
  animalList.sort((a, b) => b.age - a.age);
  const { name, sex, age } = animalList[0];
  return [name, sex, age];
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
