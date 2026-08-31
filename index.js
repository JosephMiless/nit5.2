const express = require("express");
const app = express();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize =  require('./config/sequelize');
const User = require("./models/user");

app.use(express.json());


const Product = sequelize.define("Products", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+2348012345678",
    age: 28,
    gender: "Male",
    isActive: true,
    role: "User",
    country: "Nigeria",
    createdAt: "2026-07-13T08:00:00Z",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+2348023456789",
    age: 31,
    gender: "Female",
    isActive: true,
    role: "Admin",
    country: "Ghana",
    createdAt: "2026-07-12T14:20:00Z",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    phone: "+2348034567890",
    age: 24,
    gender: "Male",
    isActive: false,
    role: "User",
    country: "Kenya",
    createdAt: "2026-07-11T09:45:00Z",
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    phone: "+2348045678901",
    age: 27,
    gender: "Female",
    isActive: true,
    role: "Moderator",
    country: "South Africa",
    createdAt: "2026-07-10T16:30:00Z",
  },
];

// const products = [
//   {
//     id: 1,
//     name: "Wireless Mouse",
//     category: "Electronics",
//     price: 25.99,
//     stock: 120,
//     rating: 4.5,
//   },
//   {
//     id: 2,
//     name: "Mechanical Keyboard",
//     category: "Electronics",
//     price: 89.99,
//     stock: 60,
//     rating: 4.7,
//   },
//   {
//     id: 3,
//     name: "Running Shoes",
//     category: "Fashion",
//     price: 75.5,
//     stock: 45,
//     rating: 4.3,
//   },
//   {
//     id: 4,
//     name: "Water Bottle",
//     category: "Home & Kitchen",
//     price: 75.5,
//     stock: 200,
//     rating: 4.2,
//   },
//   {
//     id: 5,
//     name: "Bluetooth Speaker",
//     category: "Electronics",
//     price: 55.99,
//     stock: 80,
//     rating: 4.6,
//   },
// ];

const logger = (req, res, next) => {
  console.log(`you hit this route: ${req.url} ${new Date()}`);

  next();
};

app.use(logger);

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.get("/users", async(req, res) => {
  const id = req.query.id;
  const email = req.query.email;
  let user;

  if (id) {
    // user = users.find((user) => user.id === parseInt(id));
    user = await User.findOne({
      where: { id },
    });
    if (!user) {
      return res.json({ error: `user with id: ${id} not found` });
    }
    return res.json({ messages: "user fetched  successfully", user });
  } else if (email) {
    // user = users.find((user) => user.email === email);
    user = await User.findOne({ where: {email} });
    if (!user) {
      return res.json({ error: `user with email: ${email} not found` });
    }
    return res.json({ messages: "user fetched  successfullyyyyy", user });
  }
  const allUsers = await User.findAll();
  return res.json({ message: "users fetched successfully", allUsers });
});

app.post("/user", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: "Please all fields are required" });
  }

  const userExixts = await User.findOne({where: {email}});

  if(userExixts) return res.status(400).json({error: "User exists"});

  const newUser = {
    firstName,
    lastName,
    email
  };

  const user = await User.create(newUser);

  return res
    .status(201)
    .json({ message: "Account created successfully", user });
});

app.get("/products", async (req, res) => {
  const { price, name } = req.query;
  let product;

  if (price) {
    product = await Product.findAll({ where: { price: parseFloat(price) } });

    if (!product) {
      return res.status(404).json({ error: `no product found` });
    }

    return res.status(200).json({ product });
  } else if (name) {
    product = await Product.findAll({ where: { name } });

    if (!product) {
      return res.status(404).json({ error: `no product found` });
    }

    return res.status(200).json({ product });
  }

  return res
    .status(200)
    .json({ message: "products fetched successfully", product });
});

app.post("/product", async (req, res) => {
  const { name, price, category, stock, rating } = req.body;

  if (!name || !price || !category || !stock || !rating) {
    return res.status(400).json({ message: "Please all fields are required" });
  }

  const newProduct = {
    name,
    price,
    category,
    stock,
    rating,
  };

  const product = await Product.create(newProduct);

  return res
    .status(201)
    .json({ message: "New Product added successfully", product });
});

app.post("/products/bulk", (req, res) => {
  const newProducts = req.body;
  console.log(products);

  if (newProducts.length == 0) {
    return res.status.json({ message: "please input a value" });
  }

  for (const product of newProducts) {
    products.push({ id: products.length + 1, ...product, rating: 0 });
  }

  return res
    .status(201)
    .json({ message: "bulk product added successfully", products });
});

app.patch("/product/:id", async (req, res) => {
  const { stock } = req.body;
  const { id } = req.params;

  if (!stock) {
    return res.status(400).json({ message: "all field are required" });
  }

  const foundProduct = await Product.findByPk(id);

  console.log(foundProduct);

  if (!foundProduct) {
    return res.status(404).json({ error: "product not found" });
  }

  await foundProduct.update({ stock });

  return res
    .status(200)
    .json({
      message: `product with id - ${id} has been updated`,
      foundProduct,
    });
});

app.put("/product/:id", (req, res) => {
  const { id } = req.params;

  const { name, category, price, stock } = req.body;

  if (!name || !price || !category || !stock || !rating) {
    return res.status(400).json({ message: "Please all fields are required" });
  }

  const foundProduct = products.find((p) => p.id == id);

  if (!foundProduct) {
    return res.status(404).json({ error: "product not found" });
  }

  foundProduct.name = name;
  foundProduct.category = category;
  foundProduct.price = price;
  foundProduct.stock = stock;

  return res
    .status(200)
    .json({ message: "Product updated successfully", foundProduct });
});

app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  console.log(parseInt(id));
  const foundProduct = await Product.findOne({ where: { id: id } });
  if (!foundProduct) {
    return res.status(404).json({ error: "product not found" });
  }
  await foundProduct.destroy({ where: { id: id }  });

  return res.status(200).json({ message: "product deleted successfully" });
});

const tasks = [
  {
    id: 1,
    title: "Title One",
    description: "This is title One",
    status: "completed",
    date: "2025-08-20",
  },
  {
    id: 2,
    title: "Title Two",
    description: "This is title Two",
    status: "in-progress",
    date: "2025-06-12",
  },
];

app.get("/task/:id", (req, res) => {
  const { id } = req.params;

  const findTask = tasks.find((p) => p.id == id);

  if (!findTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  return res
    .status(200)
    .json({ message: "Task retrived successfully", findTask });
});

app.get("/tasks", (req, res) => {
  const { status, sortBy } = req.query;
  let tasksResponse;

  if (status) {
    tasksResponse = tasks.filter((task) => task.status == status);

    if (tasksResponse.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({
      message: `All ${status} tasks have retrieved successfully`,
      tasksResponse,
    });
  }

  if (sortBy) {
    tasksResponse = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (tasksResponse.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({
      message: `All ${status} tasks have retrieved successfully`,
      tasksResponse,
    });
  }

  return res.status(200).json({
    message: `All tasks have retrieved successfully`,
    tasks,
  });
});

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    subtitle: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    author: "James Clear",
    isbn: "9780735211292",
    genre: "Self-Help",
    language: "English",
    publisher: "Avery",
    publicationYear: 2018,
    edition: "1st",
    pages: 320,
    format: "Paperback",
    price: 12500,
    currency: "NGN",
    quantityInStock: 18,
    availableCopies: 18,
    shelfLocation: "A1-SH-03",
    description:
      "A practical guide to building good habits and breaking bad ones.",
    coverImage: "https://example.com/images/books/atomic-habits.jpg",
    averageRating: 4.8,
    totalRatings: 5823,
    createdAt: "2026-07-20T10:30:00Z",
    updatedAt: "2026-07-25T09:15:00Z",
  },

  {
    id: 2,
    title: "Clean Code",
    subtitle: "A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    genre: "Programming",
    language: "English",
    publisher: "Prentice Hall",
    publicationYear: 2008,
    edition: "1st",
    pages: 464,
    format: "Hardcover",
    price: 18000,
    currency: "NGN",
    quantityInStock: 12,
    availableCopies: 9,
    shelfLocation: "B2-SH-01",
    description:
      "A guide to writing clean, maintainable, and professional software.",
    coverImage: "https://example.com/images/books/clean-code.jpg",
    averageRating: 4.7,
    totalRatings: 4318,
    createdAt: "2026-07-18T14:10:00Z",
    updatedAt: "2026-07-24T11:40:00Z",
  },

  {
    id: 3,
    title: "The Pragmatic Programmer",
    subtitle: "Your Journey to Mastery",
    author: "David Thomas & Andrew Hunt",
    isbn: "9780135957059",
    genre: "Programming",
    language: "English",
    publisher: "Addison-Wesley",
    publicationYear: 2019,
    edition: "20th Anniversary",
    pages: 352,
    format: "Paperback",
    price: 17000,
    currency: "NGN",
    quantityInStock: 10,
    availableCopies: 7,
    shelfLocation: "B2-SH-02",
    description: "Modern software development principles and best practices.",
    coverImage: "https://example.com/images/books/pragmatic-programmer.jpg",
    averageRating: 4.9,
    totalRatings: 2891,
    createdAt: "2026-07-12T09:00:00Z",
    updatedAt: "2026-07-23T15:20:00Z",
  },

  {
    id: 4,
    title: "Rich Dad Poor Dad",
    subtitle: "What the Rich Teach Their Kids About Money",
    author: "Robert T. Kiyosaki",
    isbn: "9781612681139",
    genre: "Personal Finance",
    language: "English",
    publisher: "Plata Publishing",
    publicationYear: 2017,
    edition: "2nd",
    pages: 336,
    format: "Paperback",
    price: 9800,
    currency: "NGN",
    quantityInStock: 20,
    availableCopies: 17,
    shelfLocation: "C1-SH-04",
    description:
      "A bestselling book on financial literacy and wealth creation.",
    coverImage: "https://example.com/images/books/rich-dad-poor-dad.jpg",
    averageRating: 4.6,
    totalRatings: 8901,
    createdAt: "2026-07-11T08:40:00Z",
    updatedAt: "2026-07-25T13:05:00Z",
  },

  {
    id: 5,
    title: "The Psychology of Money",
    subtitle: "Timeless Lessons on Wealth, Greed, and Happiness",
    author: "Morgan Housel",
    isbn: "9780857197689",
    genre: "Finance",
    language: "English",
    publisher: "Harriman House",
    publicationYear: 2020,
    edition: "1st",
    pages: 256,
    format: "Paperback",
    price: 11000,
    currency: "NGN",
    quantityInStock: 14,
    availableCopies: 11,
    shelfLocation: "C1-SH-05",
    description: "Explores the psychology behind financial decisions.",
    coverImage: "https://example.com/images/books/psychology-of-money.jpg",
    averageRating: 4.8,
    totalRatings: 3674,
    createdAt: "2026-07-13T11:10:00Z",
    updatedAt: "2026-07-22T10:30:00Z",
  },

  {
    id: 6,
    title: "Deep Work",
    subtitle: "Rules for Focused Success in a Distracted World",
    author: "Cal Newport",
    isbn: "9781455586691",
    genre: "Productivity",
    language: "English",
    publisher: "Grand Central Publishing",
    publicationYear: 2016,
    edition: "1st",
    pages: 304,
    format: "Paperback",
    price: 10500,
    currency: "NGN",
    quantityInStock: 8,
    availableCopies: 5,
    shelfLocation: "A2-SH-01",
    description:
      "Strategies for achieving focused success in a distracted world.",
    coverImage: "https://example.com/images/books/deep-work.jpg",
    averageRating: 4.7,
    totalRatings: 2788,
    createdAt: "2026-07-09T16:20:00Z",
    updatedAt: "2026-07-23T09:10:00Z",
  },

  {
    id: 7,
    title: "The Alchemist",
    subtitle: "",
    author: "Paulo Coelho",
    isbn: "9780062315007",
    genre: "Fiction",
    language: "English",
    publisher: "HarperOne",
    publicationYear: 2014,
    edition: "25th Anniversary",
    pages: 208,
    format: "Paperback",
    price: 7500,
    currency: "NGN",
    quantityInStock: 25,
    availableCopies: 21,
    shelfLocation: "D3-SH-01",
    description: "A philosophical novel about following one's dreams.",
    coverImage: "https://example.com/images/books/the-alchemist.jpg",
    averageRating: 4.7,
    totalRatings: 12041,
    createdAt: "2026-07-08T09:50:00Z",
    updatedAt: "2026-07-24T12:00:00Z",
  },

  {
    id: 8,
    title: "Think and Grow Rich",
    subtitle: "",
    author: "Napoleon Hill",
    isbn: "9781585424337",
    genre: "Self-Help",
    language: "English",
    publisher: "TarcherPerigee",
    publicationYear: 2005,
    edition: "Revised",
    pages: 320,
    format: "Paperback",
    price: 8900,
    currency: "NGN",
    quantityInStock: 16,
    availableCopies: 15,
    shelfLocation: "A1-SH-05",
    description:
      "Classic principles for personal achievement and financial success.",
    coverImage: "https://example.com/images/books/think-and-grow-rich.jpg",
    averageRating: 4.5,
    totalRatings: 7021,
    createdAt: "2026-07-10T13:30:00Z",
    updatedAt: "2026-07-24T08:45:00Z",
  },

  {
    id: 9,
    title: "You Don't Know JS Yet",
    subtitle: "Get Started",
    author: "Kyle Simpson",
    isbn: "9781091210097",
    genre: "Programming",
    language: "English",
    publisher: "Independently Published",
    publicationYear: 2020,
    edition: "2nd",
    pages: 143,
    format: "Paperback",
    price: 8500,
    currency: "NGN",
    quantityInStock: 30,
    availableCopies: 28,
    shelfLocation: "B1-SH-03",
    description: "An in-depth introduction to JavaScript fundamentals.",
    coverImage: "https://example.com/images/books/ydkjs.jpg",
    averageRating: 4.9,
    totalRatings: 1527,
    createdAt: "2026-07-17T10:00:00Z",
    updatedAt: "2026-07-25T14:20:00Z",
  },

  {
    id: 10,
    title: "Sapiens",
    subtitle: "A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn: "9780062316097",
    genre: "History",
    language: "English",
    publisher: "Harper",
    publicationYear: 2015,
    edition: "1st",
    pages: 498,
    format: "Paperback",
    price: 14500,
    currency: "NGN",
    quantityInStock: 11,
    availableCopies: 8,
    shelfLocation: "D1-SH-02",
    description: "Explores the history and evolution of Homo sapiens.",
    coverImage: "https://example.com/images/books/sapiens.jpg",
    averageRating: 4.8,
    totalRatings: 6350,
    createdAt: "2026-07-15T08:15:00Z",
    updatedAt: "2026-07-24T16:40:00Z",
  },
];

app.get("/books", (req, res) => {
  const { genre, publicationYear } = req.query;
  let results;
  if (genre) {
    results = books.filter((book) => book.genre == genre);
    if (results.length == 0) {
      return res
        .status(404)
        .json({ error: `No book with this genre: ${genre} exist` });
    }
    return res
      .status(200)
      .json({ message: `Book with Genre: ${genre}`, results });
  }
  if (publicationYear) {
    results = books.filter((book) => book.publicationYear == publicationYear);
    if (results.length == 0) {
      return res.status(404).json({
        error: `No book with this publicationYear: ${publicationYear} exist`,
      });
    }
    return res.status(200).json({
      message: `Book with publicationYear: ${publicationYear}`,
      results,
    });
  }
  return res.status(200).json(books);
});

// Get a book

app.get("/books/:id", (req, res) => {
  const { id, author } = req.params;
  let book;
  if (id) {
    book = books.find((book) => book.id === parseInt(id));
  }

  if (!book) {
    return res.status(404).json({ error: "Book not found!" });
  }
  return res.status(200).json({ message: "Book found!", book });
});

//Add a new book
app.post("/books", (req, res) => {
  const {
    title,
    subtitle,
    author,
    isbn,
    genre,
    language,
    publisher,
    publicationYear,
    edition,
    pages,
    format,
    price,
    currency,
    quantityInStock,
    availableCopies,
    shelfLocation,
    description,
    coverImage,
    averageRating,
    totalRatings,
    createdAt,
    updatedAt,
  } = req.body;
  if (
    !title ||
    !subtitle ||
    !author ||
    !isbn ||
    !genre ||
    !language ||
    !publisher ||
    !publicationYear ||
    !edition ||
    !pages ||
    !format ||
    !price ||
    !currency ||
    !quantityInStock ||
    !availableCopies ||
    !shelfLocation ||
    !description ||
    !coverImage ||
    !averageRating ||
    !totalRatings ||
    !createdAt ||
    !updatedAt
  ) {
    return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
  }
  newBook = {
    id: books.length + 1,
    title,
    subtitle,
    author,
    isbn,
    genre,
    language,
    publisher,
    publicationYear,
    edition,
    pages,
    format,
    price,
    currency,
    quantityInStock,
    availableCopies,
    shelfLocation,
    description,
    coverImage,
    averageRating,
    totalRatings,
    createdAt,
    updatedAt,
  };
  books.push(newBook);
  return res.status(201).json({ message: "Book added successfully", books });
});

app.patch("/book/:id", (req, res) => {
  const { id } = req.params;
  const { availableCopies, quantityInStock } = req.body;

  const findBook = books.find((b) => b.id == id);

  if (!findBook) {
    return res.status(404).json({ error: "book not found" });
  }

  findBook.availableCopies = availableCopies;
  findBook.quantityInStock = quantityInStock;

  return res
    .status(200)
    .json({ message: "Book updated succussfully", findBook });
});

app.delete("/book/:id", (req, res) => {
  const { id } = req.params;
  let newBooks;

  const findBook = books.find((b) => b.id == id);

  if (!findBook)
    return res.status(404).json({ error: "This book doesn't exist" });

  newBooks = books.filter((b) => b.id != id);

  res.status(200).json({ message: "This book has been deleted successfully" });
});

app.listen(4000, async () => {
  await sequelize.authenticate();
  console.log("Database has successfuly established a connection")
  console.log("sever is running");
});
