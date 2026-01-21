import express, { Request, Response } from 'express';
import { calculateDiscount } from './utils/pricing';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Get product price with discount
app.get('/api/price/:productId', (req: Request, res: Response) => {
  const { productId } = req.params;
  const discount = req.query.discount ? parseInt(req.query.discount as string) : 0;
  
  // Simple product price lookup (mock data)
  const prices: Record<string, number> = {
    'prod-001': 100,
    'prod-002': 250,
    'prod-003': 500
  };
  
  const basePrice = prices[productId];
  
  if (!basePrice) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const finalPrice = calculateDiscount(basePrice, discount);
  
  res.json({
    productId,
    basePrice,
    discount,
    finalPrice
  });
});

// Start server only if not in test mode
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
