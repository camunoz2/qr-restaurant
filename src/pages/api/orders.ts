import { NextApiRequest, NextApiResponse } from 'next';

type Order = {
  tableId: string;
  items: string[];
};

export default async function ordersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { tableId, items }: Order = req.body;

  // Here you would handle the logic to save the order to a database or other service
  console.log(`Order placed for table ${tableId}: ${items.join(', ')}`);

  return res.status(201).json({ message: 'Order placed successfully' });
}
