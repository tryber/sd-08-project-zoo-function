const { animals } = require('./data');
const data = require('./data');

function animalMap(...options) {
  // codigo
  const locations = {};
  animals.forEach((animal) => {
    locations[animal.location] = [];
  });
  if (!options || options.length === 0) {
    animals.forEach((animal) => {
      locations[animal.location].push(animal.name);
    });
    return locations;
  }

  const includeName = options.some((item) => item.includeNames === true);
  const sorted = options.some((item) => item.sorted === true);
  let sex = null;
  options.find((item) => {
    if (item.sex === 'male') {
      sex = 'male';
      return sex;
    } else if (item.sex === 'female') {
      sex = 'female';
      return sex;
    }
  });

  if (includeName && sorted) {
    animals.forEach((animal) => {
      const animalName = animal.name;
      const residentsName = animal.residents.map((resident) => {
        return resident.name;
      });
      const animalObj = {};
      animalObj[animalName] = residentsName.sort();
      console.log(animalObj);
      console.log(sex);
      locations[animal.location].push(animalObj);
    });
  } else if (includeName && sex !== null) {
    animals.forEach((animal) => {
      const animalName = animal.name;
      const residentsName = animal.residents.map((resident) => {
        if (resident.sex === sex) {
          return resident.name;
        }
      });
      const animalObj = {};
      animalObj[animalName] = residentsName;
      console.log(residentsName);
      locations[animal.location].push(animalObj);
    });

    return locations;
  } else if (includeName) {
    animals.forEach((animal) => {
      const animalName = animal.name;
      const residentsName = animal.residents.map((resident) => {
        return resident.name;
      });
      const animalObj = {};
      animalObj[animalName] = residentsName;
      locations[animal.location].push(animalObj);
    });

    return locations;
  }

  return locations;
}
const options = { includeNames: true, sex: 'female' };
console.log(animalMap(options));
