import { kataEntity } from '../entities/Katas.entity';
import { LogError, LogSuccess } from '../../utils/logger';
import { IKata } from '../interfaces/IKata.interface';

// CRUD

export const getKatas = async (): Promise<any> => {
  try {
    LogSuccess(`[ KATA ORM / GET ALL ] Success.`);

    let kataModel = kataEntity();

    //Search all katas
    return await kataModel.find();
  } catch (error) {
    LogError(`[ KATA ORM / GET ALL ] Error: ${error}`);
  }
};

// Debes poder filtrar las Katas disponibles por nivel de dificultad
export const getKatasByLevel = async (): Promise<any> => {
  try {
    LogSuccess(`[ KATA ORM / GET BY LEVEL ] Success.`);

    let kataModel = kataEntity();

    // Search Katas sorted by level
    return await kataModel.find().sort({ "level": -1 });
  } catch (error) {
    LogError(`[ KATA ORM / GET BY LEVEL ] Error: ${error}`);
  }
};

// Debes poder obtener las 5 Katas más recientes

// Debes poder listar las Katas ordenadas de mejor valoradas a menos valoradas

// Debes poder valorar una Kata con una nueva nota y debe almacenarse la media

// Por lo que el modelo de Kata deberá tener un valor que será número de valoraciones de usuarios, para así obtener la media

// Debes poder encontrar las Katas ordenadas por intentos
