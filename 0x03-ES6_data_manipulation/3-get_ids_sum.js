const getStudentIdsSum = (arrayOfObjects) => arrayOfObjects.reduce((s, st) => s + st.id, 0);
export default getStudentIdsSum;
