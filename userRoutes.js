const express = require("express");
const router = express.Router();
const database = require("./database").getConnection;

router.get("/", (req, res) => {
  console.log(database());
  res.status(200).json({
    message: "Conectado",
    routs: {
      list: "/users on GET",
      select: "/users/:id on GET",
      insert: "/user on POST",
      update: "/users/:id on PUT",
      delete: "/users/:id on DELETE"
    }
  });
});

router.get("/users", (req, res) => {
  database().query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  database().query(
    "SELECT * FROM users WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});
router.post("/users", (req, res) => {
  const { name, email } = req.body;
  database().query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added`);
    }
  );
});
router.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  database().query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
});
router.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  database().query(
    "DELETE FROM users WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  );
});

module.exports = router;
