const { Animal, validateAnimal } = require('./animals/animals.class');
const { listOfAnimals } = require('./animals/animals.const');
const zooCreation = (newAnimal) => {
  const animalsInTheZoo = listOfAnimals.map((animal) => {
    return new Animal(animal.name, animal.species, animal.sound);
  });
  if (newAnimal) {
    validateAnimal(newAnimal);
    animalsInTheZoo.push(new Animal(newAnimal.name, newAnimal.species, newAnimal.sound));
  }
  return animalsInTheZoo;
};

module.exports = { zooCreation };
