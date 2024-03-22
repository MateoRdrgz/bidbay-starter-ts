import express from 'express'
import { Product, Bid, User } from '../orm/index.js'
import authMiddleware from '../middlewares/auth.js'
import { getDetails } from '../validators/index.js'

const router = express.Router()


router.get('/api/products', async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: [{model: User, as: 'seller'}, {model: Bid, as: 'bids', include: [{model:User, as: 'bidder'}]}]});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/api/products/:productId', async (req, res) => {
  try {
    if(!req.params.productId) return res.status(400).json({ error: 'Product ID is required' });
    const products = await Product.findAll({ include: [{model: User, as: 'seller'}, {model: Bid, as: 'bids', include: [{model:User, as: 'bidder'}]}]});
    const product = products.find(product => product.id === req.params.productId);
    if(!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// You can use the authMiddleware with req.user.id to authenticate your endpoint ;)

router.post('/api/products',authMiddleware, async (req, res) => {
  
    try {
      const newProduct: Product = req.body;
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
})

router.put('/api/products/:productId', async (req, res) => {
  res.status(600).send()
})

router.delete('/api/products/:productId', async (req, res) => {
  res.status(600).send()
})

export default router
