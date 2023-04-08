import { useState } from 'react';
import { useRouter } from 'next/router';
import { menuItems } from '@/menuItems';

export default function Table() {
  const router = useRouter();
  const { tableId } = router.query;

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleOrder = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId, items: selectedItems }),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setSelectedItems([]);
      } else {
        alert('Error placing order.');
      }
    } catch (error) {
      console.error(error);
      alert('Error placing order.');
    }
  };

  const handleItemClick = (itemId: number) => {
    setSelectedItems([...selectedItems, itemId]);
  };

  return (
    <div>
      <h1>Table {tableId} Menu</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
            <button onClick={() => handleItemClick(item.id)}>Order</button>
          </li>
        ))}
      </ul>
      <button onClick={handleOrder} disabled={!selectedItems.length}>
        Place Order
      </button>
    </div>
  );
}
