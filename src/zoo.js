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
  if (ids === undefined) return [];
  else if (ids.length === 1) return data.animals.filter(animal => animal.id === ids[0]);
  return ids.map(id => data.animals.find(animal => animal.id === id));
}
function animalsOlderThan(animal, age) {
  const selectedAnimal = data.animals.find(
    animalName => animalName.name === animal,
  );
  const result = selectedAnimal.residents.reduce(
    (previousValue, currentValue) => {
      if (currentValue.age >= age) return previousValue;
      return false;
    },
    true,
  );
  return result;
}
function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
}
function createEmployee(personalInfo, associatedWith) {
  const result = {};
  Object.assign(result, personalInfo, associatedWith);
  return result;
}
function isManager(id) {
  data.employees.forEach(employee => {
    if (employee.managers.includes(id)) return true;
  });
  return false;
}
function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}
function animalCount(species) {
  if (species === undefined) {
    const returnObj = {};
    data.animals.forEach(animal => {
      returnObj[animal.name] = animal.residents.length;
    });
    return returnObj;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}
function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce(
    (previousValue, currentValue) =>
      previousValue + data.prices[currentValue] * entrants[currentValue],
    0,
  );
}
function divisionPerRegion() {
  const NE = data.animals.filter(specie => specie.location === 'NE');
  const NW = data.animals.filter(specie => specie.location === 'NW');
  const SE = data.animals.filter(specie => specie.location === 'SE');
  const SW = data.animals.filter(specie => specie.location === 'SW');
  const arrayRegions = [NE, NW, SE, SW];
  return arrayRegions;
}
function animalMapNoParameter() {
  return {
    NE: divisionPerRegion()[0].map(specie => specie.name),
    NW: divisionPerRegion()[1].map(specie => specie.name),
    SE: divisionPerRegion()[2].map(specie => specie.name),
    SW: divisionPerRegion()[3].map(specie => specie.name),
  };
}
function objReturnForIncludesTrue(specie) {
  return specie.map(specie => {
    const obj = {};
    obj[specie.name] = specie.residents.map(animal => animal.name);
    return obj;
  });
}
function justIncludesTrue() {
  return {
    NE: objReturnForIncludesTrue(divisionPerRegion()[0]),
    NW: objReturnForIncludesTrue(divisionPerRegion()[1]),
    SE: objReturnForIncludesTrue(divisionPerRegion()[2]),
    SW: objReturnForIncludesTrue(divisionPerRegion()[3]),
  };
}
function sortedAnimal() {
  const objAnimalNames = justIncludesTrue();
  const regions = Object.keys(objAnimalNames);
  regions.forEach(region => {
    objAnimalNames[region].forEach(specie =>
      specie[Object.keys(specie)[0]].sort(),
    );
  });
  return objAnimalNames;
}
function auxSortedAnimalWithSex(region, sex, sorted) {
  return region.map(specie => {
    const obj = {};
    if (sorted === true) {
      obj[specie.name] = specie.residents
        .filter(animal => animal.sex === sex)
        .map(info => info.name)
        .sort();
    } else {
      obj[specie.name] = specie.residents
        .filter(animal => animal.sex === sex)
        .map(info => info.name);
    }
    return obj;
  });
}
function sortedAnimalWithSex(sorted, sex) {
  return {
    NE: auxSortedAnimalWithSex(divisionPerRegion()[0], sex, sorted),
    NW: auxSortedAnimalWithSex(divisionPerRegion()[1], sex, sorted),
    SE: auxSortedAnimalWithSex(divisionPerRegion()[2], sex, sorted),
    SW: auxSortedAnimalWithSex(divisionPerRegion()[3], sex, sorted),
  };
}
function includesNameTrue(sorted, sex) {
  if (sorted === undefined && sex === undefined) return justIncludesTrue();
  else if (sorted !== undefined && sex === undefined) return sortedAnimal();
  return sortedAnimalWithSex(sorted, sex);
}
function includeNamesUndefined() {
  return {
    NE: divisionPerRegion()[0].map(specie => specie.name),
    NW: divisionPerRegion()[1].map(specie => specie.name),
    SE: divisionPerRegion()[2].map(specie => specie.name),
    SW: divisionPerRegion()[3].map(specie => specie.name),
  };
}
function animalMap(options) {
  if (options === undefined) return animalMapNoParameter();
  const { includeNames, sorted, sex } = options;
  if (includeNames === true) return includesNameTrue(sorted, sex);
  return includeNamesUndefined();
}
function isClosed(openTime, closeTime) {
  if (openTime === 0 && closeTime === 0) return true;
  return false;
}
function openAmPm(openTime) {
  return openTime > 11 ? `${openTime - 12}pm` : `${openTime}am`;
}
function closeAmPm(closeTime) {
  return closeTime > 11 ? `${closeTime - 12}pm` : `${closeTime}am`;
}
function sayTheTimeOpen(day) {
  const open = data.hours[day].open;
  const close = data.hours[day].close;
  let timeOpen = '';
  if (isClosed(open, close)) timeOpen = 'CLOSED';
  else {
    timeOpen = `Open from ${openAmPm(open)} until `;
    timeOpen += `${closeAmPm(close)}`;
  }
  return timeOpen;
}
function schedule(dayName) {
  const returnObj = {};
  if (dayName === undefined) {
    Object.keys(data.hours).forEach(day => {
      const timeInString = sayTheTimeOpen(day);
      returnObj[day] = timeInString;
    });
    return returnObj;
  }
  returnObj[dayName] = sayTheTimeOpen(dayName);
  return returnObj;
}
function oldestFromFirstSpecies(id) {
  const idFirsSpecies = data.employees.find(employee => employee.id === id)
    .responsibleFor[0];
  const animalsById = data.animals.find(animal => animal.id === idFirsSpecies)
    .residents;
  return Object.values(
    animalsById.reduce((acc, currentValue) => {
      if (currentValue.age > acc.age) return currentValue;
      return acc;
    }),
  );
}
function increasePrices(percentage) {
  const kindOfClient = Object.keys(data.prices);
  const pricesPerClient = Object.values(data.prices);
  const multiple = percentage + 100;
  kindOfClient.forEach((client, index) => {
    const newValue = Math.ceil(pricesPerClient[index] * multiple) / 100;
    data.prices[client] = newValue;
  });
}
function employeeCoverageWithNoParameter() {
  const objReturn = {};
  data.employees.forEach(employee => {
    const fullNameEmployee = `${employee.firstName} ${employee.lastName}`;
    const responsibleFor = employee.responsibleFor.map(animalId => {
      const animalNameSelected = data.animals.find(
        animal => animal.id === animalId,
      ).name;
      return animalNameSelected;
    });
    objReturn[fullNameEmployee] = responsibleFor;
  });
  return objReturn;
}
function employeeCoverage(idOrName) {
  const objReturn = {};
  if (idOrName === undefined) return employeeCoverageWithNoParameter();
  const selectedEmployee = data.employees.find(
    employee =>
      employee.firstName === idOrName ||
      employee.lastName === idOrName ||
      employee.id === idOrName,
  );
  const fullNameEmployee = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
  const responsibleFor = selectedEmployee.responsibleFor.map(
    animalId => data.animals.find(animal => animal.id === animalId).name,
  );
  objReturn[fullNameEmployee] = responsibleFor;
  return objReturn;
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
