const { Router } = require("express");
const router = new Router();
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../controllers/task.controller");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
