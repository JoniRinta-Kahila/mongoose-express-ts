import mongoose from 'mongoose';

export const TrophyNames: string[] = [
  'asd',
  'dsa',
]

interface ITrophy {
  playerId: string;
  trophy: string;
  deserved: number;
};

interface trophyModelInterface extends mongoose.Model<TrophyDoc> {
  build(attr: ITrophy): TrophyDoc
};

interface TrophyDoc extends mongoose.Document {
  playerId: string;
  trophy: string;
  deserved: number
};

const trophySchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true
  },
  trophy: {
    type: String, 
    required: true
  },
  deserved: {
    type: Number,
    required: true
  }
});

trophySchema.statics.build = (attr: ITrophy) => {
  return new Trophy(attr);
}
trophySchema.index({playerId: 1, trophy: 1}, { unique: true });

const Trophy = mongoose.model<TrophyDoc, trophyModelInterface>('Trophy', trophySchema);

export { Trophy };