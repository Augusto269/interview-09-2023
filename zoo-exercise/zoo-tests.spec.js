const { zooCreation } = require('./zoo-index');
const { Animal } = require('./animals/animals.class');
const { listOfAnimals } = require('./animals/animals.const');
describe('Test zoo app', () => {
    describe('test zoo initialization and functionality ', () => {
        let zoo = [];
        beforeEach(() => {
            zoo = zooCreation();
        });
        test('Create a zoo with basic animals', () => {
            expect(zoo).toEqual(listOfAnimals);
        });
        describe('test zoo animals', () => {
            test('lion can talk', () => {
                const lionAnimal = zoo.find((animal) => animal.species === 'lion');
                expect(lionAnimal.speak(`I'm a lion`)).toBe("I'm roar a roar lion roar");
            });
            test('tiger  can talk', () => {
                const tigerAnimal = zoo.find((animal) => animal.species === 'tiger');
                expect(tigerAnimal.speak('Lions suck')).toBe('Lions grrr suck grrr');
            });
            test('lion can talk with send any phrase', () => {
                const lionAnimal = zoo.find((animal) => animal.species === 'lion');
                expect(lionAnimal.speak('')).toBe('roar');
            });
            test('lion can makeSound ', () => {
                const lionAnimal = zoo.find((animal) => animal.species === 'lion');
                expect(lionAnimal.makeSound()).toBe('roar');
            });
        });
    });
    describe('test new zoo animals', () => {
        let zooWithFrog = [];
        const frog = { name: 'frogy', species: 'frog', sound: 'croak' };
        beforeEach(() => {
            zooWithFrog = zooCreation(frog);
        });
        test('the new frog is adding correctly ', () => {
            const frogAnimal = zooWithFrog.find((animal) => animal.species === 'frog');
            expect(frogAnimal).toEqual(frog);
        });
        test('the new frog can talk', () => {
            const frogAnimal = zooWithFrog.find((animal) => animal.species === 'frog');
            expect(frogAnimal.speak('I am a frog')).toBe('I croak am croak a croak frog croak');
        })
        test('the new frog can makeSound', () => {
            const frogAnimal = zooWithFrog.find((animal) => animal.species === 'frog');
            expect(frogAnimal.makeSound()).toBe('croak');
        })
    });
    describe('test validation new animal', () => {
        describe('test zoo errors', () => {
            test('new animal is an object but not a complite instace', () => {
                try {
                    zooCreation({ name: 'frogy', species: 'frog' });
                } catch (err) {
                    expect(err).toBeInstanceOf(Error);
                    expect(err).toHaveProperty('message', 'Animal must have name, species and sound');
                }
            });
            test('zooCreation new animals  without parameters', () => {
                try {
                    zooCreation({});
                } catch (err) {
                    expect(err).toBeInstanceOf(Error);
                    expect(err).toHaveProperty('message', 'Animal must have name, species and sound');
                }
            });
            test('zooCreation with a new animals is array', () => {
                try {
                    zooCreation([]);
                } catch (err) {
                    expect(err).toBeInstanceOf(TypeError);
                    expect(err).toHaveProperty('message', 'Animal must be an object');
                }
            });
            test('zooCreation with a new animals is string', () => {
                try {
                    zooCreation('string');
                } catch (err) {
                    expect(err).toBeInstanceOf(TypeError);
                    expect(err).toHaveProperty('message', 'Animal must be an object');
                }
            })
            test('zooCreation with a new animals is number', () => {
                try {
                    zooCreation(123);
                } catch (err) {
                    expect(err).toBeInstanceOf(TypeError);
                    expect(err).toHaveProperty('message', 'Animal must be an object');
                }
            })
            test('zooCreation with a new animals is not defined', () => {
                try {
                    zooCreation();
                } catch (err) {
                    expect(err).toBeInstanceOf(TypeError);
                    expect(err).toHaveProperty('message', 'Animal must be defined');
                }
            })

        });
    });
});
