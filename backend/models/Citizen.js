import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const CitizenSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  city_id: {
    type: mongoose.Schema.Types.Number,
    ref: 'City',
    required: true,
  },
  groups: {
    type: [GroupSchema],
    default: [],
    required: false,
  },
});

export default mongoose.model('Citizen', CitizenSchema);
