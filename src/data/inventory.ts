export const INVENTORY_STOCK: Record<number, number> = {
  1: 5,
  2: 10,
  3: 0,
  4: 8,
  5: 3,
  6: 15,
  7: 2,
  8: 0,
  9: 6,
  10: 4,
  11: 12,
  12: 5,
  13: 7,
  14: 9,
  15: 1,
  16: 0,
  17: 4,
  18: 3,
  19: 8,
  20: 5,
};

export const getProductStock = (id: number): number => {
  return id in INVENTORY_STOCK ? INVENTORY_STOCK[id] : 10;
};
