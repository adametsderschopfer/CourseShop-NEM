const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "..", "data", "cart.json");

class Cart {
  static async add(course) {
    const cart = await Cart.fetch();

    const idx = cart.courses.findIndex((c) => c.id === course.id);
    const candidate = cart.courses[idx];

    if (candidate) {
      candidate.count++;
      cart.courses[idx] = candidate;
    } else {
      course.count = 1;
      cart.courses.push(course);
    }

    cart.price += +course.price + 0;

    return new Promise((res, rej) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  }

  static async remove(id) {
    const cart = await Cart.fetch();

    const idx = cart.courses.findIndex((c) => c.id === id);
    const course = cart.courses[idx];

    if (course.count === 1) {
      cart.courses = cart.courses.filter((c) => c.id !== id);
    } else {
      cart.courses[idx].count--;
    }

    cart.price -= course.price;

    return new Promise((res, rej) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          rej(err);
        } else {
          res(cart);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((res, rej) => {
      fs.readFile(p, "utf-8", (err, data) => {
        if (err) {
          rej(err);
        } else {
          res(JSON.parse(data));
        }
      });
    });
  }
}

module.exports = Cart;
