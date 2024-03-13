const cleanSet = (set, startString) => {
  const result = [];
  set.forEach((value) => {
    if (!startString || value.startsWith(startString)) {
      result.push(value.slice(startString.length));
    }
  });
  return result.join('-');
};
export default cleanSet;
