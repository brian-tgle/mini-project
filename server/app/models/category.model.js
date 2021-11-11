export default (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String
    },
    {
      timestamps: true
    }
  );
  schema.virtual('expensesInCategory', {
    ref: 'expense',
    foreignField: 'category',
    localField: '_id'
  });
  schema.virtual('totalValues').get(function() {
    return this.expensesInCategory.reduce((total, item) => total + item.value, 0);
 });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  schema.set('toObject', { virtuals: true });
  schema.set('toJSON', { virtuals: true });
  schema.plugin(mongoosePaginate);
  const Category = mongoose.model("category", schema);
  return Category;
};
