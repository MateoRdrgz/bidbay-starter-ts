import express from 'express'
import { Product, Bid, User } from '../orm/index.js'
import authMiddleware from '../middlewares/auth.js'
import { getDetails } from '../validators/index.js'

const router = express.Router()
const products = [
  { id: 1, name: 'Produit 1', price: 10 },
  { id: 2, name: 'Produit 2', price: 20 },
  { id: 3, name: 'Produit 3', price: 30 }
];

router.get('/api/products', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/api/products/:productId', async (req, res) => {
  res.status(600).send()
})


router.post('/api/products', authMiddleware,async(req, res) => {
  res.status(600).send()
})

router.put('/api/products/:productId', async (req, res) => {
  res.status(600).send()
})


router.delete('/api/products/:productId', authMiddleware, async (req, res) => {
  try {

    const product = await Product.findByPk(req.params.productId);

    if (!product) {
      return res.status(404).json();
    }else{
      res.status(200).json();
    }
  } catch (error) {

    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
  
});

export default router
