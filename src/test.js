const { animals } = require('./data');
const data = require('./data');

const auxEmployeeCoverage = resp => {
  const animalName = animals.find(animal => animal.id === resp);
  return animalName.name;
};

function employeeCoverage(idOrName) {
  // seu código aqui
  const { employees } = data;
  const obj = {};

  if (!idOrName) {
    employees.map(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      const respFor = employee.responsibleFor.map(resp => {
        return auxEmployeeCoverage(resp);
      });
      obj[fullName] = respFor;
    });
    return obj;
  }

  const findEmployee = employees.find(
    employee =>
      employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName
  );

  const resposibleFor = findEmployee.responsibleFor.map(resp => {
    return auxEmployeeCoverage(resp);
  });
  const fullName = `${findEmployee.firstName} ${findEmployee.lastName}`;
  obj[fullName] = resposibleFor;

  return obj;
}

console.log(employeeCoverage());
