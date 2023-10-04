import { swell } from "./node";

try {
  const products = await swell.get('/products', {
    active: true
  });
  console.log(products);
} catch (err) {
  console.error(err);
}