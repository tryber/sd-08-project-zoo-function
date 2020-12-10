const data = require('./data');
function firstSpeciesId(id) {
  return data.employees.find(emp => emp.id === id).responsibleFor.shift()
}

function getAnimalResidents(id) {
  const anialId = firstSpeciesId(id);
  return data.animals.find(specie => specie.id === anialId).residents;
}

function oldestFromFirstSpecies(id) {
  const residents = getAnimalResidents(id);
  return Object.values(residents.sort(function (a, b) {
    return a.age - b.age;
  }).pop());
}

console.log(Object.values(oldestFromFirstSpecies('b0dc644a-5335-489b-8a2c-4e086c7819a2')));
