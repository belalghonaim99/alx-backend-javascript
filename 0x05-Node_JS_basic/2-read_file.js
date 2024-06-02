const fs = require('fs');

const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }
  const fileLines = fs
    .readFileSync(dataPath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const studentsGroups = {};
  const dbNames = fileLines[0].split(',');
  const studentNames = dbNames.slice(0, dbNames.length - 1);

  for (const lines of fileLines.slice(1)) {
    const studentRecords = lines.split(',');
    const studentValues = studentRecords.slice(0, studentRecords.length - 1);
    const field = studentRecords[studentRecords.length - 1];
    if (!Object.keys(studentsGroups).includes(field)) {
      studentsGroups[field] = [];
    }
    const studentEntry = studentNames
      .map((propName, idx) => [propName, studentValues[idx]]);
    studentsGroups[field].push(Object.fromEntries(studentEntry));
  }

  const totalStudents = Object
    .values(studentsGroups)
    .reduce((pre, cur) => pre + cur.length, 0); // Fixed totalStudents calculation
  console.log(`Number of students: ${totalStudents}`);
  for (const field in studentsGroups) {
    if (Object.prototype.hasOwnProperty.call(studentsGroups, field)) {
      const group = studentsGroups[field];
      const studentNamesList = group.map((student) => student.firstname).join(', ');
      console.log(`Number of students in ${field}: ${group.length}. List: ${studentNamesList}`);
    }
  }
};

module.exports = countStudents;
