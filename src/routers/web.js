const express=require("express");
const router =express.Router();
const CategoryController=require("../apps/controllers/apis/category");
const OrderController=require("../apps/controllers/apis/order");
const ProductController=require("../apps/controllers/apis/product");
router.get("/category",CategoryController.index);
router.get("/category/:id",CategoryController.show);
router.post("/category/create",CategoryController.create);
router.post("/category/delete/:id",CategoryController.delete);
router.get("/products",ProductController.index);
router.get("/category/:id/products", ProductController.CategoryProducts);
router.get("/products/:id",ProductController.show);
router.get("/products/:id/comments",ProductController.comments);
router.post("/products/:id/comments",ProductController.storeComments);
router.post("/orders", OrderController.order);
// router.get("/orders",OrderController.index);

module.exports = router;
