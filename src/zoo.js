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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

const animalsByIds = (...ids) => {
  const listId = [...ids];
  const listAnimalsById = [];
  listId.forEach((id) => {
    listAnimalsById.push(animals.find(animal => animal.id === id));
  });
  return listAnimalsById.reduce((acc, curr) => acc.concat(curr), []);
};

const animalsOlderThan = (species, age) => {
  const animalsSearch = animals.find(animal => animal.name === species);
  const animalsResidents = Object.values(animalsSearch.residents);
  return ((animalsResidents.filter(animal => animal.age < age)).length === 0);
};

const employeeByName = (EmployeeName) => {
  const finder = employees.find(employee =>
    (employee.firstName === EmployeeName || employee.lastName === EmployeeName));
  if (typeof finder === 'object') {
    return finder;
  }
  return {};
};


const createEmployee = ({ id, firstName, lastName }, { managers, responsibleFor }) => {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
};

const isManager = (id) => {
  const listManagerId = [];
  employees.forEach((employee) => {
    employee.managers.forEach((manager) => {
      if (!listManagerId.includes(manager)) {
        listManagerId.push(manager);
      }
    });
  });
  if (listManagerId.includes(id)) {
    return true;
  }
  return false;
};

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const newEmployeeForAdd = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployeeForAdd);
};

const animalCount = (species) => {
  const listSpecies = [];
  animals.forEach(animal => listSpecies.push(animal.name));

  if (listSpecies.includes(species)) {
    return (animals.find(animal => animal.name === species)).residents.length;
  }
  const allCounted = {};
  listSpecies.forEach((animalSpecies) => {
    (allCounted[animalSpecies]) =
      (animals.find(animal => animal.name === animalSpecies)).residents.length;
  });
  return allCounted;
};

const entryCalculator = (entrants) => {
  if (typeof entrants === 'object' && entrants !== {}) {
    const visitors = entrants;
    const defaultVisitors = { Adult: 0, Child: 0, Senior: 0 };
    Object.assign(defaultVisitors, visitors);
    const adultPay = prices.Adult * defaultVisitors.Adult;
    const childPay = prices.Child * defaultVisitors.Child;
    const seniorPay = prices.Senior * defaultVisitors.Senior;

    return (adultPay + childPay + seniorPay);
  }
  return 0;
};

const regions = ['NE', 'NW', 'SE', 'SW'];

const filterByRegion = () => {
  const filtred = {};
  regions.map(region => (
  Object.assign(filtred, ({
    [region]: animals.filter(animalReg =>
      animalReg.location === region).map(animal => animal.name),
  }
  ))));
  return filtred;
};

const objListBySex = (sex, sort) => {
  const filtredSex = {};
  if (sort === true) {
    regions.map(region => (
    Object.assign(filtredSex, ({
      [region]: animals.filter(animalReg =>
        animalReg.location === region).map(animal =>
          ({ [animal.name]: (animal.residents.filter(sexResident =>
            sexResident.sex === sex)).map(resident => resident.name).sort() })),
    }))));
  } else {
    regions.map(region => (
    Object.assign(filtredSex, ({
      [region]: animals.filter(animalReg =>
        animalReg.location === region).map(animal =>
          ({ [animal.name]: (animal.residents.filter(sexResident =>
            sexResident.sex === sex)).map(resident => resident.name) })),
    }))));
  }
  return filtredSex;
};

const objListWithAnimalsNames = (sex, sort) => {
  const filtredName = {};
  if (sort === true) {
    regions.map(region => (
    Object.assign(filtredName, ({
      [region]: animals.filter(animalReg =>
        animalReg.location === region).map(animal =>
            ({ [animal.name]: animal.residents.map(resident => resident.name).sort() })),
    }))));
  } else {
    regions.map(region => (
      Object.assign(filtredName, ({
        [region]: animals.filter(animalReg =>
          animalReg.location === region).map(animal =>
              ({ [animal.name]: animal.residents.map(resident => resident.name) })),
      }))));
  }
  if (sex !== null) {
    return objListBySex(sex, sort);
  }

  return filtredName;
};

const animalMap = (options) => {
  let result = filterByRegion();
  const defaultOptions = { includeNames: false, sorted: false, sex: null };
  if (typeof options === 'object' && options !== {}) {
    Object.assign(defaultOptions, options);
    if (defaultOptions.includeNames === true) {
      result = objListWithAnimalsNames(defaultOptions.sex, defaultOptions.sorted);
    }
    return result;
  }
  return result;
};

const schedule = (dayName) => {
  const result = {};
  const dayFinder = day => hours[day];
  const hoursKeys = Object.keys(hours);
  if (hoursKeys.includes(dayName) === true && dayName !== 'Monday') {
    Object.assign(result, ({ [dayName]: `Open from ${Object.values(dayFinder(dayName))[0]}am until ${Object.values(dayFinder(dayName))[1] - 12}pm` }));
    return result;
  }
  if (dayName === 'Monday') {
    Object.assign(result, ({ Monday: 'CLOSED' }));
  } else {
    for (let index = 0; index < hoursKeys.length; index += 1) {
      Object.assign(result, ({ [hoursKeys[index]]: `Open from ${Object.values(dayFinder(hoursKeys[index]))[0]}am until ${Object.values(dayFinder(hoursKeys[index]))[1] - 12}pm` }));
      Object.assign(result, ({ Monday: 'CLOSED' }));
    }
  }
  return result;
};

const oldestFromFirstSpecies = (id) => {
  const finderById = employees.find(employee => employee.id === id);
  const firstSpecies = finderById.responsibleFor[0];
  const finderByCode = animals.find(animal => animal.id === firstSpecies);
  const finderOldest = finderByCode.residents.reduce((acc, curr) =>
    ((acc.age > curr.age) ? acc : curr));
  return Object.values(finderOldest);
};

const increasePrices = (percentage) => {
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.ceil(prices[key] * (100 + percentage)) / 100;
  });
  return prices;
};

const employeeCoverage = (idOrName = 'List All') => {
  if (idOrName !== 'List All') {
    const finderEmployee = Object.values(employees).find(employee =>
      (Object.values(employee).includes(idOrName)));
    const employeeRespList = [];
    finderEmployee.responsibleFor.forEach(id =>
      employeeRespList.push(...(animals.filter(animal => animal.id === id))));
    return { [`${finderEmployee.firstName} ${finderEmployee.lastName}`]: employeeRespList.map(animal => animal.name) };
  }
  const listAll = {};
  const listOfEmployees = Object.values(employees);
  listOfEmployees.forEach(employee => (
    Object.assign(listAll, ({
      [`${employee.firstName} ${employee.lastName}`]: employee.responsibleFor.map(id => (animals.find(animal => animal.id === id)).name),
    }))
  ));
  return listAll;
};

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
