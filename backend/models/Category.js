const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "The name of the new category is required."],
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
});

module.exports = mongoose.model("category", CategorySchema);
