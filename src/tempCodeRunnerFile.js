function employeeCoverage(idOrName) {
  const func = data.employees.find(func => func.id === idOrName).responsibleFor
  return func

}
console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'))