

}

function animalMap(options) {
  // seu código aqui
  if (options === undefined) {
    const filtro = data.animals.filter(animal1 => animal1.location === animal1.name)
    console.log(filtro)
    return data.animals.map(animal => `${animal.location}:${animal}`)
  }

}