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

function getAnimalName(animalId) {
  const animalName = data.animals.filter(animal => animal.id === animalId)
    .map(element => element = element.name);
  return animalName;
}

function getCoverageArray(idOrName) {
  const coverageArray = verifyingIdOrName(idOrName).responsibleFor;
  const animalsCoverage = [];
  coverageArray.forEach( animalId => animalsCoverage.push(data.animals
    .filter( animal => animal.id === animalId )
      .map( element => element.name)
        .toString()));
  return animalsCoverage;
}

function employeeFullName(idOrName) {
  const firstName = verifyingIdOrName(idOrName).firstName;
  const lastName = verifyingIdOrName(idOrName).lastName;
  const fullName = firstName + ' ' + lastName;
  if (idOrName === '') {
    data.employees.reduce((acc, obj) => {
      acc[fullName] = getCoverageArray(obj.id)
    }, {});
    return fullName;
  }
  return fullName;
}

function allEmployeesCoverage() {
  const allEmployeesCoverageObject = {};

}

function employeeCoverage(idOrName) {
  const employeeCoverageObject = {};
  data.employees.forEach( employee =>
    (employeeCoverageObject[employeeFullName(idOrName)] = getCoverageArray(employee.id)));
  return employeeCoverageObject;
}

// console.log(getCoverageArray('c1f50212-35a6-4ecd-8223-f835538526c2'));

// console.log(getCoverageArray('Ardith'));

console.log(employeeFullName());

// console.log(employeeCoverage('c1f50212-35a6-4ecd-8223-f835538526c2'));

