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
  const animalObjects = data.animals.filter((object, index) => (object.id === ids[index]));
  return animalObjects;
}

function animalsOlderThan(animal, age) {
  const animalFound = data.animals.find(animalObject => animalObject.name === animal);
  const ageList = animalFound.residents.map(resident => resident.age);
  return ageList.every(ageIndex => ageIndex >= age);
}

function employeeByName(employeeName = '') {
  const employerFound = (employeeName !== '') ? data.employees.find(employer => (employeeName === employer.firstName || employeeName === employer.lastName)) : {};
  return employerFound;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const employerFound = data.employees.find(employer => employer.id === id);
  return employerFound.managers.length <= 1;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObject = [{
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  }];
  data.employees = [...data.employees, ...newObject];
  return data.employees;
}

function animalCount(species = '') {
  const quantiForSpecieObject = data.animals.reduce((previousValue, currentValue) => {
    previousValue[currentValue.name] = currentValue.residents.length;
    return previousValue;
  }, {});
  const specieObject = data.animals.find(object => object.name === species);
  const count = (species === '') ? quantiForSpecieObject : specieObject.residents.length;
  return count;
}

function entryCalculator(entrants = '') {
  // seu código aqui
  const { Adult, Senior, Child } = data.prices;
  const { Adult: entrantAdult = 0, Senior: entrantSenior = 0, Child: entrantChild = 0 }
  = entrants;
  return (Adult * entrantAdult) + (Senior * entrantSenior) + (Child * entrantChild);
}

const createSimpleContainer = (locationList, newObject) => {
  for (let index = 0; index < locationList.length; index += 1) {
    const speciesByRegion = data.animals.filter(object => object.location === locationList[index]);
    const speciesList = speciesByRegion.map((objectFound) => {
      const species = objectFound.name;
      return species;
    });
    newObject[locationList[index]] = speciesList;
  }
};

const createContainerIncludeNames = (locationList, newObject) => {
  for (let index = 0; index < locationList.length; index += 1) {
    const speciesByRegion = data.animals.filter(object => object.location === locationList[index]);
    const speciesByRegionReduce = speciesByRegion.map((specie) => {
      const specieKey = specie.name;
      const animalList = specie.residents.map(resident => resident.name);
      const container = {};
      container[specieKey] = animalList;
      return container;
    });
    newObject[locationList[index]] = speciesByRegionReduce;
  }
};
const createContainerSorted = (locationList, newObject) => {
  for (let index = 0; index < locationList.length; index += 1) {
    const speciesByRegion = data.animals.filter(object => object.location === locationList[index]);
    const speciesByRegionReduce = speciesByRegion.map((specie) => {
      const specieKey = specie.name;
      const animalList = specie.residents.map(resident => resident.name);
      const animalListSorted = animalList.sort();
      const container = {};
      container[specieKey] = animalListSorted;
      return container;
    });
    newObject[locationList[index]] = speciesByRegionReduce;
  }
};
const createContainerIncludeNamesSex = (locationList, newObject, sexParam) => {
  for (let index = 0; index < locationList.length; index += 1) {
    const speciesByRegion = data.animals.filter(object => object.location === locationList[index]);
    const speciesByRegionReduce = speciesByRegion.map((specie) => {
      const specieKey = specie.name;
      const animalList = specie.residents.filter(resident => resident.sex === sexParam);
      const animalBySex = animalList.map(resident => resident.name);
      const container = {};
      container[specieKey] = animalBySex;
      return container;
    });
    newObject[locationList[index]] = speciesByRegionReduce;
  }
};
const createContainerIncludeNamesSexSorted = (locationList, newObject, sexParam) => {
  for (let index = 0; index < locationList.length; index += 1) {
    const speciesByRegion = data.animals.filter(object => object.location === locationList[index]);
    const speciesByRegionReduce = speciesByRegion.map((specie) => {
      const specieKey = specie.name;
      const animalList = specie.residents.filter(resident => resident.sex === sexParam);
      const animalBySex = animalList.map(resident => resident.name);
      animalBySex.sort();
      const container = {};
      container[specieKey] = animalBySex;
      return container;
    });
    newObject[locationList[index]] = speciesByRegionReduce;
  }
};
const isSortedTrue = (includeNames, sex, locationList, newObject) => {
  if (includeNames === true && sex === false) {
    createContainerSorted(locationList, newObject);
  } else if (includeNames === true && sex !== false) {
    createContainerIncludeNamesSexSorted(locationList, newObject, sex);
  }
};

const isSortedFalse = (includeNames, sex, locationList, newObject) => {
  if (includeNames === true && sex !== false) {
    createContainerIncludeNamesSex(locationList, newObject, sex);
  } else if (includeNames === true && sex === false) {
    createContainerIncludeNames(locationList, newObject);
  }
};

function animalMap(options = '') {
  const locationList = ['NE', 'NW', 'SE', 'SW'];
  const newObject = {};
  const { includeNames = false, sorted = false, sex = false } = options;
  if (options === '' || includeNames === false) {
    createSimpleContainer(locationList, newObject);
  } else if (sorted === true) {
    isSortedTrue(includeNames, sex, locationList, newObject);
  } else if (sorted === false) {
    isSortedFalse(includeNames, sex, locationList, newObject);
  }
  return newObject;
}
//   if (options === '' || includeNames === false) {
//     createSimpleContainer(locationList, newObject);
//   } else if (includeNames === true && sorted === false && sex === false) {
//     createContainerIncludeNames(locationList, newObject);
//   } else if (sorted === true && includeNames === true && sex === false) {
//     createContainerSorted(locationList, newObject);
//   } else if (sorted === false && includeNames === true && sex !== false) {
//     createContainerIncludeNamesSex(locationList, newObject, sex);
//   } else if (sorted === true && includeNames === true && sex !== false) {
//     createContainerIncludeNamesSexSorted(locationList, newObject, sex);
//   }
//   return newObject;
// }

function schedule(dayName = '') {
  if (dayName === '') {
    return {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED',
    };
  }
  const { open, close } = data.hours[dayName];
  const event = (dayName !== 'Monday') ? {
    [dayName]: `Open from ${open}am until ${close - 12}pm`,
  } : { [dayName]: 'CLOSED' };
  return event;
}
function oldestFromFirstSpecies(id) {
  const employerObject = data.employees.find(employer => employer.id === id);
  const specieId = employerObject.responsibleFor[0];
  const specieObject = data.animals.find(specie => specie.id === specieId);
  const biggAge = specieObject.residents.reduce((biggerAge, animal) =>
  ((biggerAge > animal.age) ? biggerAge : animal.age));
  const animalObject = specieObject.residents.find(animal => animal.age === biggAge);
  const { name, sex, age } = animalObject;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  data.prices = {
    Adult: Math.ceil(Adult * (100 + percentage)) / 100,
    Senior: Math.ceil(Senior * (100 + percentage)) / 100,
    Child: Math.ceil(Child * (100 + percentage)) / 100,
  };
  return data.prices;
}

const createCompleteList = () => {
  const idForfullName = data.employees.reduce((accEmployees, employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    const idForSpecie = data.animals.reduce((accSpecie, specie) => {
      accSpecie[specie.name] = specie.id;
      return accSpecie;
    }, []);
    const pairIdSpecie = Object.entries(idForSpecie);
    const teste = employee.responsibleFor;
    teste.forEach((id, index) =>
      pairIdSpecie.forEach((pair) => {
        if (id === pair[1]) {
          teste[index] = pair[0];
        }
      }),
    );
    accEmployees[fullName] = teste;
    return accEmployees;
  }, {});
  return idForfullName;
};

function employeeCoverage(idOrName = '') {
  if (idOrName === '') {
    return createCompleteList();
  } else if (idOrName.length > 0 && idOrName.length < 36) {
    const idForfullNamelist = Object.entries(createCompleteList());
    const speciesByEmployee = idForfullNamelist.find(employee => employee[0].includes(idOrName));
    return {
      [speciesByEmployee[0]]: speciesByEmployee[1],
    };
  }
  const emploieeFound = data.employees.find(employee => employee.id === idOrName);
  const employeeName = emploieeFound.firstName;
  const idForfullNamelist = Object.entries(createCompleteList());
  const speciesByEmployee = idForfullNamelist.find(employee =>
  employee[0].includes(employeeName));
  return {
    [speciesByEmployee[0]]: speciesByEmployee[1],
  };
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
