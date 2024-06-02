import { existsSync, statSync, readFileSync } from 'fs';


const countStudents = (data) => {
  if (!existsSync(data)) {
    throw new Error('Cannot load the database');
  }
  if (!statSync(data).isFile()) {
    throw new Error('Cannot load the database');
  }
  const filesLines = readFileSync(data, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const studentsGroups = {};
  const dbNames = filesLines[0].split(',');
  const studentNames = dbNames.slice(0, dbNames.length - 1);

  for (const lines of filesLines.slice(1)) {
    const studentsRecords = lines.split(',');
    const studentValues = studentsRecords.slice(0, studentsRecords.length - 1);
    const field = studentsRecords[studentsRecords.length - 1];
    if (!Object.keys(studentsGroups).includes(field)) {
      studentsGroups[field] = [];
    }
    const studentEntry = studentNames
      .map((propName, idx) => [propName, studentValues[idx]]);
    studentsGroups[field].push(Object.fromEntries(studentEntry));
  }

  const totalStudents = Object
    .values(studentsGroups)
    .reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${totalStudents}`);
  for (const [field, group] of Object.entries(studentsGroups)) {
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }
};

export default countStudents;
