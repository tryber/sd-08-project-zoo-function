const { animals, employees, prices } = require('./data');

function oldestFromFirstSpecies(id) {
    const idAnimal = employees.find(element => element.id === id).responsibleFor[0];
    const residentsAnimals = animals.find(element => element.id === idAnimal).residents;
    let oldAnimal = residentsAnimals[0].age;
    residentsAnimals.forEach(element => {
        if (element.age > oldAnimal) {
            oldAnimal = element
        }
    })
    const { name, sex, age } = oldAnimal;

    return `['${name}', '${sex}', ${age}]`;
}

console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

//console.log(employees[0].responsibleFor);

//employees.map(element => console.log(element.id));
