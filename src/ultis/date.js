const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const convertToInputDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};
export { formatDate, convertToInputDate };
