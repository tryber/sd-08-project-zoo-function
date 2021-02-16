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
//Requisito 1.
const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
/*  if(!ids) return [];
  if (ids === undefined) return [];
  return [animals.find(animal => animal.id === ids)]; // Caminho 1
  return animals.filter(animal => ids.find(id => animal.id === id)); //Caminho 2 */
  return animals.filter(animal => ids.includes(animal.id)); //Caminho 3
}

//Requisito 2.
function animalsOlderThan(specie, age) {
/*   const compareAnimal = animals.find(specie => specie.name === animal)
  .residents.every(resident => resident.age >= age);
  return compareAnimal; */
  return animals.find(animal => animal.name === specie).residents
    .every(resident => resident.age >= age);
}

//Requisito 3.
function employeeByName(employeeName) {
/*   if (!employeeName) return {};
  function analyzeEmployee(employee) {
    return employee.firstName === employeeName || employee.lastName === employeeName;
  }
  return employees.find(name => analyzeEmployee(name)); */
  // if (employeeName === undefined) return [];
  return employees.find(({ firstName, lastName }) => (
    firstName === employeeName || lastName === employeeName
  )) || {};
}

//Requisito 4.
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith }
}

//Requisito 5.
function isManager(id) {
/*   return employees.some((employee, index) => employee.managers[index] === id); */
  return employees.some(({ managers }) => managers.includes(id));
}

//Requisito 6.
function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
/*   const manager = {
    id,
    firstName,
    lastName,
    managers: [],
    responsibleFor: [],
  };
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  const newEmployee = !managers ? employees.push(manager) : employees.push(employee);
  return newEmployee; */
  const personalInfo =  { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  const employee = createEmployee(personalInfo, associatedWith);
  employees.push(employee);
}

//Requisito 7.
function animalCount(species) {
/*   if (!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length; */
  const result = animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
  // if (typeof species === 'string' && species.length !== 0) return result[species]
  if (species) return result[species];
  return result;
}

//Requsito 8.
function entryCalculator(entrants = {}) {
/*   if (!entrants) return 0;
  const valueEntrance = Object.keys(entrants);
  const ticketSum = valueEntrance.reduce((sum, index) => {
    sum += entrants[index] * prices[index];
    return sum;
  }, 0);
  return ticketSum; */
/*  if (entrants === undefined || Object.keys(entrants).length) return 0;
  return Object.entries(entrants)
    .reduce((acc, [category, quantity]) => {
      return acc + prices[category] * quantity;
    }, 0);
     */
    return Object.keys(entrants)
      .reduce((acc, cur) => {
        return acc + prices[cur] * entrants[cur];
      }, 0);
}

//Requisito 9.

//Implementação de funções auxiliares.

function getSpecieByName(specieName) {
  return animals.find(specie => specie.name === specieName);
}

//Precisa refatorar essa função pois ela é reponsável por várias ações.
function getSpecieResidentsName(specieName, sorted, sex) {
  let residents = getSpecieByName(specieName).residents;
  if (sex) residents = residents.filter(resident => resident.sex === sex); 
  const names = residents.map(resident => resident.name);
  if (sorted) names.sort();
  return { [specieName]: names };
}

function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex } = options;
  const results = animals.reduce((acc, { name, location }) => {
    // if (!Array.isArray(acc[location])) acc[location] = [];
    if (!acc[location]) acc[location] = [];
    acc[location].push(name);
    return acc;
  }, {});
  if (includeNames) {
    return Object.entries(results).reduce((acc, [key, animalNames]) => {
      acc[key] = animalNames.map((animalName) => getSpecieResidentsName(animalName, sorted, sex));
      return acc;
    }, {});
  }
  return results;
}

//Requisito 10;
function schedule(dayName) {
/*   const businessDay = {};
  if (!dayName) {
    Object.keys(hours).forEach((day) => {
      const { open, close } = hours[day];
      if (open === 0) {
        businessDay[day] = 'CLOSED';
      } else {
        businessDay[day] = `Open from ${open}am until ${close - 12}pm`;
      }
    });
    return businessDay;
  }
  if (dayName === 'Monday') {
    businessDay[dayName] = 'CLOSED';
  } else {
    businessDay[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  }
  return businessDay; */
  const result = Object.entries(hours).reduce((acc, [key, val]) => {
    const { open, close } = val;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close -12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (dayName !== undefined) return { [dayName]: result[dayName] };
  return result;
}

//Requisito 11.

//função auxiliar

function employeeById(id) {
  return employees.find(employee => employee.id === id);
}

function oldestFromFirstSpecies(id) {
/*   const responsible = employees.find(employee => employee.id === id).responsibleFor[0];
  const older = animals
  .find(animal => animal.id === responsible).residents
  .sort((animalA, animalB) => animalB.age - animalA.age);
  return Object.values(older[0]); */
  const employee = employeeById(id);
  const [ specie ] = animalsByIds(employee.responsibleFor[0]);
  const oldest = specie.residents.reduce((acc, cur) => acc.age > cur.age ? acc : cur);
  return Object.values(oldest);
}

//Requisito 12.
function increasePrices(percentage) {
/*   const newValues = Object.keys(prices);
  newValues.forEach((index) => {
    prices[index] = Math.ceil(prices[index] * (percentage + 100)) / 100;
  });
  return prices; */
  Object.entries(prices).forEach(([category, price]) => {
    const newPrice = price * (1 + percentage/100);
    prices[category] = Math.round(newPrice * 100) / 100;
  });
}

//Requisito 13.

//Função auxliar;
function getEmployeeFullName ({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
function employeeCoverage(idOrName) {
/*   const zooEmployees = employees.map(employee => `${employee.firstName} ${employee.lastName}`);
  const zooAnimals = employees.map(respAnimal => respAnimal.responsibleFor
    .map(id => animals.find(animal => animal.id === id).name));
  let list = {};
  if (!idOrName) {
    zooEmployees.forEach((responsable, index) => {
      list = { ...list, [responsable]: zooAnimals[index] };
    });
  } else {
    const findEmployee = employees
    .find(({ id, firstName, lastName }) =>
    idOrName === id || idOrName === firstName || idOrName === lastName);
    const nameEmployee = `${findEmployee.firstName} ${findEmployee.lastName}`;
    list = { [nameEmployee]: zooAnimals[zooEmployees.indexOf(nameEmployee)] };
  }
  return list; */
  const result = employees.reduce((acc, employee) => {
    acc[getEmployeeFullName(employee)] = employee.responsibleFor
      .map(animalsId => animalsByIds(animalsId)[0])
      .map(({ name }) => name);
    return acc;
  }, {});
  if (idOrName !== undefined) {
    const employee = employeeById(idOrName) || employeeByName(idOrName);
    const employeeFullName = getEmployeeFullName(employee);
    if (employee) return { [employeeFullName]: result[employeeFullName] };
  }
  return result;
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
