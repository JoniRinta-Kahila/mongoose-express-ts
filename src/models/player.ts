import mongoose from 'mongoose';

interface IPlayer {
  name: string;
  score: number;
};

interface playerModelInterface extends mongoose.Model<PlayerDoc> {
  build(attr: IPlayer): PlayerDoc
};

interface PlayerDoc extends mongoose.Document {
  name: string;
  score: number;
};

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number, 
    required: true
  },
});

playerSchema.statics.build = (attr: IPlayer) => {
  return new Player(attr);
}

const Player = mongoose.model<PlayerDoc, playerModelInterface>('Player', playerSchema);

export { Player };