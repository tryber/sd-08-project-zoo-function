const { animals, prices } = require('./data');
const data = require('./data');

function getEmployeeById(idOrName) {
  const employeeObjectById = data.employees.find(element => element.id === idOrName);
  return employeeObjectById;
}

function getEmployeeByAnyName(idOrName) {
  const employeeObjectByAnyName = data.employees.find(elemet => elemet.firstName === idOrName) ||
    data.employees.find(elemet => elemet.lastName === idOrName);
  return employeeObjectByAnyName;
}

function verifyingIdOrName(idOrName) {
  const regex = /[0-9]/g;
  if (typeof idOrName === 'string' && idOrName.match(regex) !== null) {
    return getEmployeeById(idOrName);
  }
  return getEmployeeByAnyName(idOrName);
}

function getCoverageArray(idOrName) {
  const coverageArray = verifyingIdOrName(idOrName).responsibleFor;
  const animalsCoverage = [];
  coverageArray.forEach(animalId => animalsCoverage.push(data.animals
    .filter(animal => animal.id === animalId)
    .map(element => element.name)
    .toString()));
  return animalsCoverage;
}

function employeeFullName(idOrName) {
  const firstName = verifyingIdOrName(idOrName).firstName;
  const lastName = verifyingIdOrName(idOrName).lastName;
  const fullName = firstName + ' ' + lastName;
  return fullName;
}

function allEmployeesCoverage() {
  return data.employees.reduce((acc, employee) => {
    acc[employeeFullName(employee.id)] = getCoverageArray(employee.id);
    return acc;
  }, {});
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    return allEmployeesCoverage()
  }
  const employeeCoverageObject = {};
  getCoverageArray(idOrName).forEach(animalId =>
    (employeeCoverageObject[employeeFullName(idOrName)] = getCoverageArray(idOrName)));
  return employeeCoverageObject;
}

// console.log(getCoverageArray('c1f50212-35a6-4ecd-8223-f835538526c2'));

// console.log(getCoverageArray('Stephanie'));

// console.log(getCoverageArray('c1f50212-35a6-4ecd-8223-f835538526c2'));

// console.log(getCoverageArray('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

// console.log(employeeFullName('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

console.log(employeeCoverage());

console.log(employeeCoverage('c1f50212-35a6-4ecd-8223-f835538526c2'));

console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

console.log(employeeCoverage('Stephanie'));

console.log(employeeCoverage('Azevado'));