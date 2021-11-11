Users: [
  id: ObjectId,
  username: string,
  password: string,
  fullname: string,
  createdAt: datetime,
  updatedAt: datetime
]

Categories: [
  id: ObjectId,
  title: string,
  description: string,
  createdAt: datetime,
  updatedAt: datetime
]

Expenses: [
  id: ObjectId,
  title: string,
  category: ReferenceId, => Ref: Categories
  value: number,
  createdBy: ReferenceId, => Ref: Users
  createdAt: datetime,
  updatedAt: datetime
]