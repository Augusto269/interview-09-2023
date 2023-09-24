class Animal {
  constructor(name, species, sound) {
    this.name = name;
    this.species = species;
    this.sound = sound;
  }
  makeSound() {
    return this.sound;
  }
  speak(phrase) {
    if (!phrase || phrase === undefined || phrase === null) return this.sound;
    return phrase
      .split(' ')
      .map((word) => `${word} ${this.sound}`)
      .join(' ');
  }
}

const validateAnimal = (animal) => {
  if (!animal) throw new TypeError('Animal must be defined');
  if (typeof animal !== 'object') throw new TypeError('Animal must be an object');
  if (Array.isArray(animal)) throw new TypeError('Animal must be an object');
  if (!animal.name || !animal.species || !animal.sound) {
    throw new Error('Animal must have name, species and sound');
  }
};

module.exports = { Animal, validateAnimal };
