const express = require("express");
const { error } = require("node:console");
const app = express();

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

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 25.99,
    stock: 120,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    stock: 60,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Fashion",
    price: 75.5,
    stock: 45,
    rating: 4.3,
  },
  {
    id: 4,
    name: "Water Bottle",
    category: "Home & Kitchen",
    price: 75.5,
    stock: 200,
    rating: 4.2,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 55.99,
    stock: 80,
    rating: 4.6,
  },
];

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.get("/users", (req, res) => {
  const id = req.query.id;
  const email = req.query.email;
  let user;

  if (id) {
    user = users.find((user) => user.id === parseInt(id));

    if (!user) {
      return res.json({ error: `user with id: ${id} not found` });
    } else if (email) {
      user = users.find((user) => user.email === email);

      if (!email) {
        return res.json({ error: `user with id: ${id} not found` });
      }
      return res.json({ messages: "user fetched  successfully", user });
    }

    return res.json({ messages: "user fetched  successfully", user });
  }
  return res.json({ message: "users fetched successfully", users });
});

app.get("/products", (req, res) => {
  const { price, name } = req.query;
  let product;

  if (price) {
    product = products.filter((product) => product.price === parseFloat(price));

    if (product.length === 0) {
      return res.status(404).json({ error: `no product found` });
    }

    return res.status(200).json({ product });
  } else if (name) {
    product = products.filter((product) => product.name === name);

    if (product.length === 0) {
      return res.status(404).json({ error: `no product found` });
    }

    return res.status(200).json({ product });
  }
});

app.listen(4000, () => {
  console.log("sever is running");
});
