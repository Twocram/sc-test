import Citizen from '../models/Citizen.js';

// get all Citizens from mongodb
export const getAll = async (req, res) => {
  try {
    const citizens = await Citizen.find();
    res.json(citizens);
  } catch (e) {
    res.json({ message: 'Sorry! Cant get citizens' });
  }
};
