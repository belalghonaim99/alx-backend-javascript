const cleanSet = (set, startString) => {
  const filteredSet = new Set([...set].filter((value) => value.startsWith(startString)));
  return filteredSet;
};
export default cleanSet;
