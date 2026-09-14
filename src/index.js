const express = require("express");
const env = require("./config/env");
const { logger } = require("./middleware/auth");
const userRouter = require("./routes/user.routes");
const sequelize = require("./config/sequelize");
const testRouter = require("./routes/test.route");
// const { Sequelize, DataTypes } = require("sequelize");


// const aToken = require("./config/jwt");

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use("/test", testRouter)
app.use(logger);

// const Product = sequelize.define("Products", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   category: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   stock: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   rating: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
// });




// app.get("/", (req, res) => {
//   return res.json({ message: "Hello World" });
// });

// app.get("/users", async (req, res) => {
//   const id = req.query.id;
//   const email = req.query.email;
//   let user;

//   if (id) {
//     // user = users.find((user) => user.id === parseInt(id));
//     user = await User.findOne({
//       where: { id },
//     });
//     if (!user) {
//       return res.json({ error: `user with id: ${id} not found` });
//     }
//     return res.json({ messages: "user fetched  successfully", user });
//   } else if (email) {
//     // user = users.find((user) => user.email === email);
//     user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.json({ error: `user with email: ${email} not found` });
//     }
//     return res.json({ messages: "user fetched  successfullyyyyy", user });
//   }
//   const allUsers = await User.findAll();
//   return res.json({ message: "users fetched successfully", allUsers });
// });

// app.post("/login", async (req, res) => {
//   
// });

// app.get("/products", authorize, async (req, res) => {
//   const { price, name } = req.query;
//   let product;

//   if (price) {
//     product = await Product.findAll({ where: { price: parseFloat(price) } });

//     if (!product) {
//       return res.status(404).json({ error: `no product found` });
//     }

//     return res.status(200).json({ product });
//   } else if (name) {
//     product = await Product.findAll({ where: { name } });

//     if (!product) {
//       return res.status(404).json({ error: `no product found` });
//     }

//     return res.status(200).json({ product });
//   }

//   return res
//     .status(200)
//     .json({ message: "products fetched successfully", product });
// });

// app.post("/product", async (req, res) => {
//   const { name, price, category, stock, rating } = req.body;

//   if (!name || !price || !category || !stock || !rating) {
//     return res.status(400).json({ message: "Please all fields are required" });
//   }

//   const newProduct = {
//     name,
//     price,
//     category,
//     stock,
//     rating,
//   };

//   const product = await Product.create(newProduct);

//   return res
//     .status(201)
//     .json({ message: "New Product added successfully", product });
// });

// app.post("/products/bulk", (req, res) => {
//   const newProducts = req.body;
//   console.log(products);

//   if (newProducts.length == 0) {
//     return res.status.json({ message: "please input a value" });
//   }

//   for (const product of newProducts) {
//     products.push({ id: products.length + 1, ...product, rating: 0 });
//   }

//   return res
//     .status(201)
//     .json({ message: "bulk product added successfully", products });
// });

// app.patch("/product/:id", async (req, res) => {
//   const { stock } = req.body;
//   const { id } = req.params;

//   if (!stock) {
//     return res.status(400).json({ message: "all field are required" });
//   }

//   const foundProduct = await Product.findByPk(id);

//   console.log(foundProduct);

//   if (!foundProduct) {
//     return res.status(404).json({ error: "product not found" });
//   }

//   await foundProduct.update({ stock });

//   return res.status(200).json({
//     message: `product with id - ${id} has been updated`,
//     foundProduct,
//   });
// });

// app.put("/product/:id", (req, res) => {
//   const { id } = req.params;

//   const { name, category, price, stock } = req.body;

//   if (!name || !price || !category || !stock || !rating) {
//     return res.status(400).json({ message: "Please all fields are required" });
//   }

//   const foundProduct = products.find((p) => p.id == id);

//   if (!foundProduct) {
//     return res.status(404).json({ error: "product not found" });
//   }

//   foundProduct.name = name;
//   foundProduct.category = category;
//   foundProduct.price = price;
//   foundProduct.stock = stock;

//   return res
//     .status(200)
//     .json({ message: "Product updated successfully", foundProduct });
// });

// app.delete("/product/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log(parseInt(id));
//   const foundProduct = await Product.findOne({ where: { id: id } });
//   if (!foundProduct) {
//     return res.status(404).json({ error: "product not found" });
//   }
//   await foundProduct.destroy({ where: { id: id } });

//   return res.status(200).json({ message: "product deleted successfully" });
// });

// app.get("/task/:id", (req, res) => {
//   const { id } = req.params;

//   const findTask = tasks.find((p) => p.id == id);

//   if (!findTask) {
//     return res.status(404).json({ error: "Task not found" });
//   }

//   return res
//     .status(200)
//     .json({ message: "Task retrived successfully", findTask });
// });

// app.get("/tasks", (req, res) => {
//   const { status, sortBy } = req.query;
//   let tasksResponse;

//   if (status) {
//     tasksResponse = tasks.filter((task) => task.status == status);

//     if (tasksResponse.length === 0) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     return res.status(200).json({
//       message: `All ${status} tasks have retrieved successfully`,
//       tasksResponse,
//     });
//   }

//   if (sortBy) {
//     tasksResponse = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

//     if (tasksResponse.length === 0) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     return res.status(200).json({
//       message: `All ${status} tasks have retrieved successfully`,
//       tasksResponse,
//     });
//   }

//   return res.status(200).json({
//     message: `All tasks have retrieved successfully`,
//     tasks,
//   });
// });

// app.get("/books", (req, res) => {
//   const { genre, publicationYear } = req.query;
//   let results;
//   if (genre) {
//     results = books.filter((book) => book.genre == genre);
//     if (results.length == 0) {
//       return res
//         .status(404)
//         .json({ error: `No book with this genre: ${genre} exist` });
//     }
//     return res
//       .status(200)
//       .json({ message: `Book with Genre: ${genre}`, results });
//   }
//   if (publicationYear) {
//     results = books.filter((book) => book.publicationYear == publicationYear);
//     if (results.length == 0) {
//       return res.status(404).json({
//         error: `No book with this publicationYear: ${publicationYear} exist`,
//       });
//     }
//     return res.status(200).json({
//       message: `Book with publicationYear: ${publicationYear}`,
//       results,
//     });
//   }
//   return res.status(200).json(books);
// });

// Get a book

// app.get("/books/:id", (req, res) => {
//   const { id, author } = req.params;
//   let book;
//   if (id) {
//     book = books.find((book) => book.id === parseInt(id));
//   }

//   if (!book) {
//     return res.status(404).json({ error: "Book not found!" });
//   }
//   return res.status(200).json({ message: "Book found!", book });
// });

//Add a new book
// app.post("/books", (req, res) => {
//   const {
//     title,
//     subtitle,
//     author,
//     isbn,
//     genre,
//     language,
//     publisher,
//     publicationYear,
//     edition,
//     pages,
//     format,
//     price,
//     currency,
//     quantityInStock,
//     availableCopies,
//     shelfLocation,
//     description,
//     coverImage,
//     averageRating,
//     totalRatings,
//     createdAt,
//     updatedAt,
//   } = req.body;
//   if (
//     !title ||
//     !subtitle ||
//     !author ||
//     !isbn ||
//     !genre ||
//     !language ||
//     !publisher ||
//     !publicationYear ||
//     !edition ||
//     !pages ||
//     !format ||
//     !price ||
//     !currency ||
//     !quantityInStock ||
//     !availableCopies ||
//     !shelfLocation ||
//     !description ||
//     !coverImage ||
//     !averageRating ||
//     !totalRatings ||
//     !createdAt ||
//     !updatedAt
//   ) {
//     return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
//   }
//   newBook = {
//     id: books.length + 1,
//     title,
//     subtitle,
//     author,
//     isbn,
//     genre,
//     language,
//     publisher,
//     publicationYear,
//     edition,
//     pages,
//     format,
//     price,
//     currency,
//     quantityInStock,
//     availableCopies,
//     shelfLocation,
//     description,
//     coverImage,
//     averageRating,
//     totalRatings,
//     createdAt,
//     updatedAt,
//   };
//   books.push(newBook);
//   return res.status(201).json({ message: "Book added successfully", books });
// });

// app.patch("/book/:id", (req, res) => {
//   const { id } = req.params;
//   const { availableCopies, quantityInStock } = req.body;

//   const findBook = books.find((b) => b.id == id);

//   if (!findBook) {
//     return res.status(404).json({ error: "book not found" });
//   }

//   findBook.availableCopies = availableCopies;
//   findBook.quantityInStock = quantityInStock;

//   return res
//     .status(200)
//     .json({ message: "Book updated succussfully", findBook });
// });

// app.delete("/book/:id", (req, res) => {
//   const { id } = req.params;
//   let newBooks;

//   const findBook = books.find((b) => b.id == id);

//   if (!findBook)
//     return res.status(404).json({ error: "This book doesn't exist" });

//   newBooks = books.filter((b) => b.id != id);

//   res.status(200).json({ message: "This book has been deleted successfully" });
// });

app.listen(env.port, async () => {
  await sequelize.authenticate();
  console.log("Database has successfuly established a connection");
  console.log("sever is running");
});
