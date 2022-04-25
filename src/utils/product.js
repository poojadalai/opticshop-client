export const sumOfProducts = (products) => {
  return products.reduce((a, b) => a + b.amount * parseInt(b.price), 0);
};
