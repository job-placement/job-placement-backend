/** @format */

const router = require("express").Router();
const { User } = require("../models");

// Create a user
router.post("/", async (req, res, next) => {
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    let userCreated = await User.create(newUser);

    if (userCreated) {
      res.send("A new user has been created").json({ newUser });
    }
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.json(users);
    } else {
      const err = new Error("products not found !!!");
      err.status = 404;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
});

// Get a user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      const err = new Error("products not found !!!");
      err.status = 404;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
});

// Update a user
router.put("/:id", async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id);
    const updatedUser = await userToUpdate.update(req.body);

    if (updatedUser) {
      res.status(201).send("user has been updated");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
