import express, { Request, Response } from 'express';
import { Player } from '../models/player';

const router = express.Router();

router.get('/api/player', async (req: Request, res: Response) => {
  const player = await Player.find({});
  return res.status(200).send(player);
});

router.get('/api/player/:id', async (req: Request, res: Response) => {
  const player = await Player.find({_id: req.params.id})
  return res.status(200).send(player);
});

router.post('/api/player', async (req: Request, res: Response) => {
  const { name, score } = req.body;

  const player = Player.build({ name, score });
  await player.save();
  return res.status(201).send(player);
});

router.put('/api/player/:id', async (req: Request, res: Response) => {
  const { name, score } = req.body;

  const player =  await Player.updateOne({_id: req.params.id}, {$set: {name, score}});
  return res.status(201).send(player);
});

router.delete('/api/player/:id', async (req: Request, res: Response) => {
  await Player.deleteOne({_id: req.params.id})
  return res.status(201).send('DELETED');
})

export { router as playerRouter };