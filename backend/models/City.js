import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

export default mongoose.model('City', CitySchema);
