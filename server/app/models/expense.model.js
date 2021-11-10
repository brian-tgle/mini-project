export default (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
      title: String,
      date: Date,
      rejectionReason: Number,
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const Expense = mongoose.model("expense", schema);
  return Expense;
};
