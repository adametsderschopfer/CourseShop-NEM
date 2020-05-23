const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

class Course {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid.v4();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }

  async save() {
    const courses = await Course.getAll();
    courses.push(this.toJSON());

    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "courses.json"),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "courses.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            rej(err);
          } else {
            res(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    const courses = await Course.getAll();
    if (!id) {
      return new Error('You do not enter id!')
    }
    return courses.find((c) => c.id === id);
  }

  static async update(course) {
    const courses = await Course.getAll();
    const idx = courses.findIndex(c => c.id === course.id)

    courses[idx] = course

    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "courses.json"),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        }
      );
    });
  }
}

module.exports = Course;
