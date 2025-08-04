import { createProduct } from "./createProduct";
import { deleteProduct } from "./deleteProduct";
import { findProductByID } from "./findProductByID";
import { listProducts } from "./listProducts";
import { updateAllPricebases } from "./updateAllPricebases";
import { updateProduct } from "./updateProduct";
import { Items } from "./Items";

export const Products = {
  Items,
  createProduct,
  deleteProduct,
  findProductByID,
  listProducts,
  updateAllPricebases,
  updateProduct,
};
