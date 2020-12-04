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

//
const data = require('./data');

const {
  animals, employees, hours, prices,
} = data;

function animalsByIds(...ids) {
  const res = [];
  ids.forEach(id => {
    res.push(animals.find(animal => animal.id === id));
  });
  return res;
}

function animalsOlderThan(animal, age) {
  return animals
    .find(a => a.name === animal)
    .residents.every(e => e.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  // const v = employeeName;
  return (
    employees.find(
      e => e.firstName === employeeName || e.lastName === employeeName,
    ) || {}
  );
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {};
  Object.assign(newEmployee, personalInfo);
  Object.assign(newEmployee, associatedWith);
  return newEmployee;
}

function isManager(id) {
  return employees.some(e => e.managers.some(m => m === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    const res = {};
    animals.forEach(a => {
      res[a.name] = a.residents.length;
    });
    return res;
  }
  return animals.find(a => a.name === species).residents.length;
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
    animals.forEach(a => {
      map[a.location].push(a.name);
    });
    return map;
  }
  animals.forEach(a => {
    const field = {};
    field[a.name] = getResidentsNames(a.residents, opt.sex);
    if (opt.sorted) {
      field[a.name].sort((ra, rb) => ra > rb);
    }
    map[a.location].push(field);
  });
  return map;
};

function animalMap(options) {
  return animalMapBuilder(options);
}

const scheduleDay = (day = {}) => {
  const defday = {
    open: 0,
    close: 0,
  };
  Object.assign(defday, day);
  if (day.open - day.close === 0) {
    return 'CLOSED';
  }
  return `Open from ${day.open}am until ${day.close - 12}pm`;
};

function schedule(dayName) {
  const list = {};
  if (dayName) {
    list[dayName] = scheduleDay(hours[dayName]);
    return list;
  }
  const days = Object.entries(hours);
  days.forEach(d => {
    const [day, prog] = d;
    list[day] = scheduleDay(prog);
  });
  return list;
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(e => e.id === id).responsibleFor[0];
  const resList = animals.find(a => a.id === animalId).residents;
  const { name, sex, age } = resList.sort((a, b) => a.age <= b.age)[0];
  return [name, sex, age];
}

const priceAdjustment = (currentPrice, percentage) => {
  const adjustment = Math.round(currentPrice * percentage) / 100;
  return parseFloat((currentPrice + adjustment).toFixed(2));
};

function increasePrices(percentage) {
  const priceList = {};
  Object.entries(prices).forEach(item => {
    const [key, value] = item;
    priceList[key] = priceAdjustment(value, percentage);
  });
  Object.assign(prices, priceList);
}

const animaisNameByEmployee = responsibleFor => {
  const res = responsibleFor.map(rf => animals.find(a => a.id === rf).name);
  return res;
};

function employeeCoverage(idOrName) {
  const ed = employees;
  const res = {};
  if (!idOrName) {
    ed.forEach(e => {
      // res[`${e.firstName} ${e.lastName}`] = e.responsibleFor.map(
      //   (rf) => data.animals.find((a) => a.id === rf).name,
      // );
      res[`${e.firstName} ${e.lastName}`] = animaisNameByEmployee(
        e.responsibleFor,
      );
    });
  } else {
    const p = idOrName;
    const emp = ed.find(
      e => e.id === p || e.firstName === p || e.lastName === p,
    );
    res[`${emp.firstName} ${emp.lastName}`] = animaisNameByEmployee(
      emp.responsibleFor,
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
