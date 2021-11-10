export default (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const Category = mongoose.model("category", schema);
  return Category;
};
