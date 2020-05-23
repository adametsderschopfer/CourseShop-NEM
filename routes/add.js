const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add a new course",
    isAdd: true,
  });
});

router.post("/", async (req, res) => {
  const { title, price, img } = req.body
  const course = new Course(title, price, img);

  await course.save()
  return res.redirect("/courses");
});

module.exports = router;
