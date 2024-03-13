const cleanSet = (set, startstring) => {
  const newSet = new Set();
  set.forEach((value) => {
    if (value && value.startsWith(startstring)) {
      newSet.add(value);
    }
  });
  return newSet;
};
export default cleanSet;
