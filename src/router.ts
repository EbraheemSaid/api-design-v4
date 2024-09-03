import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "./handlers/product";

const router = Router();

/**
 * Product
 */

router.get("/product", getAllProducts);
router.get("/product/:id", getOneProduct);
router.post(
  "/product/",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post(
  "/update",
  body(["title", "body"]).exists().isString(),
  body("version").optional(),
  handleInputErrors,
  (req, res) => {}
);
router.put(
  "/update/:id",
  body(["title", "body", "version"]).optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  handleInputErrors,
  (req, res) => {}
);
router.delete("/update/:id", () => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body(["name", "description"]).isString(),
  body("updateId").exists().isString(),
  handleInputErrors,
  (req, res) => {}
);
router.put(
  "/updatepoint/:id",
  body(["name", "description"]).isString().optional(),
  handleInputErrors,
  (req, res) => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
