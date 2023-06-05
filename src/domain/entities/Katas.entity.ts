import mongoose from 'mongoose';
import { IKata } from '../interfaces/IKata.interface';

// TO DO RANDOM ITEMS
// import { faker } from '@faker-js/faker';

export const kataEntity = () => {
  let kataSchema = new mongoose.Schema<IKata>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    intents: { type: Number, required: true },
    stars: { type: Number, required: true },
    creator: { type: String, required: true },
    solution: { type: String, required: true },
    participants: { type: [], required: true },
  });

  return mongoose.models.Katas || mongoose.model<IKata>('Katas', kataSchema);
};

/* // Genera 20 documentos distintos con datos aleatorios
export const generateKata = async () => {
  try {
    await kataEntity.deleteMany({});

    for (let i = 0; i < 20; i++) {
      const example = new kataEntity({
        name: faker.person.firstName(),
        description: faker.lorem.sentence(),
        level: getRandomLevel(),
        intents: faker.number.int({ min: 1, max: 10 }),
        stars: faker.number.int({ min: 1, max: 5 }),
        creator: faker.person.firstName(),
        solution: faker.lorem.paragraph(),
        participants: [],
      });

      for (let i = 0; i < Math.floor(Math.random() * 4) + 1 ; i++) {
        example.participants.push(faker.person.firstName());
      }

      await example.save();
      console.log(`[ Generate kata ] Example ${i + 1}: "${example.name}" created.`);
    }
  } catch (error) {
    console.error(error);
  }
};

// Función para generar un nivel aleatorio del 1 al 10
function getRandomLevel() {
  return Math.floor(Math.random() * 10) + 1;
} */
