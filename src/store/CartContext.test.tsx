// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import { describe, test, expect, beforeEach } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider, useCart } from './CartContext';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('quantity tests', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('out of stock', () => {
    let currentCart: any = null;

    function TestConsumer() {
      currentCart = useCart();
      return null;
    }

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <CartProvider>
          <TestConsumer />
        </CartProvider>
      );
    });

    act(() => {
      currentCart.addItem({
        id: 3,
        title: 'Mens Cotton Jacket',
        price: 55.99,
        image: 'http://example.com/3.png',
      });
    });

    expect(currentCart.cartItems.length).toBe(0);

    act(() => {
      currentCart.addItem({
        id: 1,
        title: 'Fjallraven Backpack',
        price: 109.95,
        image: 'http://example.com/1.png',
      });
    });

    expect(currentCart.cartItems[0].quantity).toBe(1);

    for (let i = 0; i < 5; i++) {
      act(() => {
        currentCart.addItem({
          id: 1,
          title: 'Fjallraven Backpack',
          price: 109.95,
          image: 'http://example.com/1.png',
        });
      });
    }

    expect(currentCart.cartItems[0].quantity).toBe(5);

    act(() => {
      currentCart.updateQuantity(1, 10);
    });

    expect(currentCart.cartItems[0].quantity).toBe(5);

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
