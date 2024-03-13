const getStudentIdsSum = (arrayOfObjects) => arrayOfObjects.reduce((sum, student) => sum + student.id, 0);
export default getStudentIdsSum;
