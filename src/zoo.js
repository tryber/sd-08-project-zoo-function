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
  const res = [];
  ids.forEach(id => {
    res.push(data.animals.find(animal => animal.id === id));
  });
  return res;
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find(a => a.name === animal)
    .residents.every(e => e.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  if (
    data.employees.some(
      e => e.firstName === employeeName || e.lastName === employeeName,
    )
  ) {
    return data.employees.find(
      e => e.firstName === employeeName || e.lastName === employeeName,
    );
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {};
  Object.assign(newEmployee, personalInfo);
  Object.assign(newEmployee, associatedWith);
  return newEmployee;
}

function isManager(id) {
  return data.employees.some(e => e.managers.some(m => m === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    const res = {};
    data.animals.forEach(a => {
      res[a.name] = a.residents.length;
    });
    return res;
  }
  return data.animals.find(a => a.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  const list = Object.entries(entrants);
  if (list.length === 0) {
    return 0;
  }
  let sum = 0;
  list.forEach(e => {
    const [type, num] = e;
    sum += data.prices[type] * num;
  });
  return sum;
}

const mapFactory = () => ({
  NE: [],
  NW: [],
  SE: [],
  SW: [],
});

const parseOptions = options => {
  const defaults = {
    includeNames: false,
    sorted: false,
    sex: '',
  };
  Object.assign(defaults, options);
  return defaults;
};

const getResidentsNames = (residents = [], sex = '') => {
  const res = [];
  residents.forEach(r => {
    if (sex === '') {
      res.push(r.name);
    } else if (r.sex === sex) {
      res.push(r.name);
    }
  });
  return res;
};

const animalMapBuilder = (options = {}) => {
  const map = mapFactory();
  const opt = parseOptions(options);
  // No Names
  if (!opt.includeNames) {
    data.animals.forEach(a => {
      map[a.location].push(a.name);
    });
    return map;
  }
  data.animals.forEach(a => {
    const field = {};
    if (!opt.sorted) {
      field[a.name] = getResidentsNames(a.residents, opt.sex);
    } else {
      field[a.name] = getResidentsNames(a.residents, opt.sex).sort(
        (ra, rb) => ra > rb,
      );
    }
    map[a.location].push(field);
  });
  return map;
};

function animalMap(options) {
  return animalMapBuilder(options);
}

const scheduleDay = (day = { open: 0, close: 0 }) => {
  if (day.open - day.close === 0) {
    return 'CLOSED';
  }
  return `Open from ${day.open}am until ${day.close - 12}pm`;
};

function schedule(dayName) {
  const list = {};
  if (dayName) {
    list[dayName] = scheduleDay(data.hours[dayName]);
    return list;
  }
  const days = Object.entries(data.hours);
  days.forEach(d => {
    const [day, prog] = d;
    list[day] = scheduleDay(prog);
  });
  return list;
}

function oldestFromFirstSpecies(id) {
  const animalId = data.employees.find(e => e.id === id).responsibleFor[0];
  const resList = data.animals.find(a => a.id === animalId).residents;
  const { name, sex, age } = resList.sort((a, b) => a.age <= b.age)[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  const priceList = {};
  Object.entries(data.prices).forEach(priceItem => {
    const [item, currentPrice] = priceItem;
    const ajustment = Math.round(currentPrice * percentage) / 100;
    priceList[item] = parseFloat((currentPrice + ajustment).toFixed(2));
  });
  Object.assign(data.prices, priceList);
}

function employeeCoverage(idOrName) {
  const ed = data.employees;
  const res = {};
  if (!idOrName) {
    ed.forEach(e => {
      res[`${e.firstName} ${e.lastName}`] = e.responsibleFor.map(
        rf => data.animals.find(a => a.id === rf).name,
      );
    });
  } else {
    const p = idOrName;
    const emp = ed.find(
      e => e.id === p || e.firstName === p || e.lastName === p,
    );
    res[`${emp.firstName} ${emp.lastName}`] = emp.responsibleFor.map(
      rf => data.animals.find(a => a.id === rf).name,
    );
  }
  return res;
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
