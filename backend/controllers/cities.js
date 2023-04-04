import City from '../models/City.js';

//get all Cities from mongoDB
export const getAll = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (e) {
    res.json({ message: 'Sorry! Cant get cities' });
  }
};

// get city name and his population
export const getCityPopulation = async (req, res) => {
  try {
    const cities = await City.find();
  } catch (e) {
    res.json({ message: 'Sorry! Cant get citizens count with citizens name' });
  }
};
