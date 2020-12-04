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
    .residents.every(e => e.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  if (
    employees.some(
      e => e.firstName === employeeName || e.lastName === employeeName,
    )
  ) {
    return employees.find(
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
    sum += prices[type] * num;
  });
  return sum;
}

const parseOptions = op => {
  const defaults = {
    includeNames: false,
    sorted: false,
    sex: '',
  };
  Object.assign(defaults, op);
  return defaults;
};

const mapFactory = () => ({
  NE: [],
  NW: [],
  SE: [],
  SW: [],
});

const getResidentsNames = (residents = [], sorted = false, sex = '') => {
  const res = [];
  residents.forEach(r => {
    if (sex === '') {
      res.push(r.name);
    } else if (r.sex === sex) {
      res.push(r.name);
    }
  });
  if (sorted) {
    res.sort((ra, rb) => ra > rb);
  }
  return res;
};

const mapNamed = (options = {}) => {
  const opt = parseOptions(options);
  const map = mapFactory();

  animals.forEach(a => {
    const field = {};
    field[a.name] = getResidentsNames(a.residents, opt.sorted, opt.sex);
    map[a.location].push(field);
  });
  return map;
};

const mapSimple = () => {
  // const opt = parseOptions(options);
  const map = mapFactory();
  animals.forEach(a => {
    map[a.location].push(a.name);
  });

  return map;
};

function animalMap(options) {
  const opt = parseOptions(options);
  if (opt.includeNames) {
    return mapNamed(options);
  }
  return mapSimple(options);
}

// if (opt.sorted) {
//   Object.values(map).forEach(item => {
//     item.sort((ra, rb) => ra > rb);
//   });
// }

const scheduleDay = (
  day = {
    open: 0,
    close: 0,
  },
) => {
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
  const { name, sex, age } = resList.sort((a, b) => a.age < b.age)[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  const priceList = {};
  Object.entries(prices).forEach(priceItem => {
    const [item, currentPrice] = priceItem;
    const ajustment = Math.round(currentPrice * percentage) / 100;
    priceList[item] = parseFloat((currentPrice + ajustment).toFixed(2));
  });
  Object.assign(data.prices, priceList);
}

const responsibleForAnimals = (responsibleFor = []) => {
  const res = responsibleFor.map(
    rf => data.animals.find(a => a.id === rf).name,
  );
  return res || [];
};

function employeeCoverage(idOrName) {
  const res = {};
  if (!idOrName) {
    employees.forEach(e => {
      res[`${e.firstName} ${e.lastName}`] = responsibleForAnimals(
        e.responsibleFor,
      );
    });
  } else {
    const employee = employees.find(
      e => e.id === idOrName || e.firstName === idOrName || e.lastName === idOrName,
    );
    res[`${employee.firstName} ${employee.lastName}`] = responsibleForAnimals(
      employee.responsibleFor,
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
