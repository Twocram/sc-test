import Citizen from '../models/Citizen.js';

// get all citizens from mongodb
export const getAll = async (req, res) => {
  try {
    const citizens = await Citizen.find().sort({ id: 1 });
    res.json(citizens);
  } catch (e) {
    res.json({ message: 'Sorry! Cant get citizens' });
  }
};
