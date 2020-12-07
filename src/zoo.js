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
  if (ids === undefined) {
    return [];
  } else if (ids.length === 1) {
    return data.animals.filter(animal => animal.id === ids[0]);
  }
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const selectedAnimal = data.animals.find(
    animalName => animalName.name === animal,
  );
  const result = selectedAnimal.residents.reduce(
    (previousValue, currentValue) => {
      if (currentValue.age >= age) {
        return previousValue;
      }
      return false;
    },
    true,
  );
  return result;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
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
  let result = false;
  data.employees.forEach((employee) => {
    if (employee.managers.includes(id)) {
      result = true;
    }
  });
  return result;
}

function addEmployee(
  id,firstName,lastName,managers = [],responsibleFor = [],
) {
  const employee = {
    id,firstName,lastName,managers,responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    const returnObj = {};
    data.animals.forEach((animal) => {
      returnObj[animal.name] = animal.residents.length;
    });
    return returnObj;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce(
    (previousValue, currentValue) =>
      previousValue + (data.prices[currentValue] * entrants[currentValue]),
    0,
  );
}

function returnToAnimalMapNoParameter(region) {
  return data.animals
  .filter(animalFilter => animalFilter.location === region)
  .map(animal => animal.name);
}

function animalMapNoParameter() {
  const NE = returnToAnimalMapNoParameter('NE');
  const NW = returnToAnimalMapNoParameter('NW');
  const SE = returnToAnimalMapNoParameter('SE');
  const SW = returnToAnimalMapNoParameter('SW');
  return {
    NE,NW,SE,SW,
  };
}

function animalsPerRegions(region) {
  const animalsPerRegion = data.animals
    .filter(animalFilter => animalFilter.location === region)
    .map((animal) => {
      const objNamesSpecie = {};
      const names = animal.residents.map(
        informationOfAnimal => informationOfAnimal.name,
      );
      objNamesSpecie[animal.name] = names;
      return objNamesSpecie;
    });
  return animalsPerRegion;
}

function animalMapJustIncludeNames() {
  const NE = animalsPerRegions('NE');
  const NW = animalsPerRegions('NW');
  const SE = animalsPerRegions('SE');
  const SW = animalsPerRegions('SW');
  return {
    NE,NW,SE,SW,
  };
}

function ordRegion(regions) {
  regions.forEach((region) => {
    region[Object.keys(region)[0]].sort();
  });
  return regions;
}

function animalMapIncludesAndSort() {
  const NE = ordRegion(animalsPerRegions('NE'));
  const NW = ordRegion(animalsPerRegions('NW'));
  const SE = ordRegion(animalsPerRegions('SE'));
  const SW = ordRegion(animalsPerRegions('SW'));
  return {
    NE,NW,SE,SW,
  };
}

function animalsPerRegionsWithSex(regions, sex) {
  if (sex === 'male') {
    return regions.map((specie) => {
      const objReturn = {};
      objReturn[specie.name] = specie.residents
        .filter(information => information.sex === 'male')
        .map(allInfo => allInfo.name);
      return objReturn;
    });
  }
  return regions.map((specie) => {
    const objReturn = {};
    objReturn[specie.name] = specie.residents
      .filter(information => information.sex === 'female')
      .map(allInfo => allInfo.name);
    return objReturn;
  });
}

function returnToanimalMapIncludesAndSex(region){
  return data.animals.filter(
    animalFilter => animalFilter.location === region,
  );
}

function animalMapIncludesAndSex(sex) {
  const NE = returnToanimalMapIncludesAndSex('NE');
  const NW = returnToanimalMapIncludesAndSex('NW');
  const SE = returnToanimalMapIncludesAndSex('SE');
  const SW = returnToanimalMapIncludesAndSex('SW');

  return {
    NE: animalsPerRegionsWithSex(NE, sex),
    NW: animalsPerRegionsWithSex(NW, sex),
    SE: animalsPerRegionsWithSex(SE, sex),
    SW: animalsPerRegionsWithSex(SW, sex),
  };
}

function orderNames(region) {
  region.forEach((specie) => {
    specie[Object.keys(specie)[0]].sort();
  });
  return region;
}

function animalMapIncludesAndSexSorted(objPerSex) {
  const { NE, NW, SE, SW } = objPerSex;
  return {
    NE: orderNames(NE),
    NW: orderNames(NW),
    SE: orderNames(SE),
    SW: orderNames(SW),
  };
}

function returnNamesPerRegion(regions) {
  return regions.map(specie => Object.keys(specie)[0]);
}

function justNames(objWithInformation) {
  const { NE, NW, SE, SW } = objWithInformation;
  return {
    NE: returnNamesPerRegion(NE),
    NW: returnNamesPerRegion(NW),
    SE: returnNamesPerRegion(SE),
    SW: returnNamesPerRegion(SW),
  };
}

function animalMap(options) {
  if (options === undefined) {
    return animalMapNoParameter();
  }
  const { includeNames, sorted, sex } = options;
  if (includeNames === true && sorted === undefined && sex === undefined) {
    return animalMapJustIncludeNames();
  } else if (includeNames === true && sorted === true && sex === undefined) {
    return animalMapIncludesAndSort();
  } else if (
    includeNames === true &&
    sorted === undefined &&
    sex !== undefined
  ) {
    return animalMapIncludesAndSex(sex);
  } else if (includeNames === true && sorted === true && sex !== undefined) {
    return animalMapIncludesAndSexSorted(animalMapIncludesAndSex(sex));
  } else {
    return justNames(animalMapIncludesAndSort());
  }
}

function isClosed(openTime, closeTime) {
  if (openTime === 0 && closeTime === 0) {
    return true;
  }
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
  if (isClosed(open, close)) {
    timeOpen = 'CLOSED';
  } else {
    timeOpen = `Open from ${openAmPm(open)} until `;
    timeOpen += `${closeAmPm(close)}`;
  }
  return timeOpen;
}

function schedule(dayName) {
  const returnObj = {};
  if (dayName === undefined) {
    Object.keys(data.hours).forEach((day) => {
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
      if (currentValue.age > acc.age) {
        return currentValue;
      }
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
  data.employees.forEach((employee) => {
    const fullNameEmployee = `${employee.firstName} ${employee.lastName}`;
    const responsibleFor = employee.responsibleFor.map((animalId) => {
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
  if (idOrName === undefined) {
    return employeeCoverageWithNoParameter();
  }
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
