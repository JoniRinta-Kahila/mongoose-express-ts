import express, { Request, Response } from 'express';
import { Trophy } from '../models/trophy';
import { TrophyNames } from '../models/trophy'

const router = express.Router();

router.get('/api/trophy', async (req: Request, res: Response) => {
  const trophy = await Trophy.find({});
  return res.status(200).send(trophy);
});

router.get('/api/trophy/:id', async (req: Request, res: Response) => {
  const trophy = await Trophy.find({playerId: req.params.id})
  return res.status(200).send(trophy);
});

router.post('/api/trophy', async (req: Request, res: Response) => {
  const { playerId, trophy, deserved } = req.body;
  
  if (!TrophyNames.includes(trophy)) {
    res.status(500).send('Bad request.');
    return;
  }
  
  try {
    const newTrophy = Trophy.build({ playerId, trophy, deserved });
    await newTrophy.save();
    return res.status(201).send(newTrophy);
  } catch (err) {
    const error: string = err.message

    if(error.startsWith('E11000')) {
      return res.status(200).send('user have this trophy already.');
    } else {
      return res.status(500).send(error);
    }
  }
});

router.delete('/api/trophy/:id', async (req: Request, res: Response) => {
  await Trophy.deleteOne({playerId: req.params.id})
  return res.status(201).send('DELETED');
})

export { router as trophyRouter };