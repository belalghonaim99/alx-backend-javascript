function getStudentsByLocation(arrayOfObjects, city) {
  return arrayOfObjects.filter((student) => student.location === city);
}
export default getStudentsByLocation;
