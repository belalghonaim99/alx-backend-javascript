const fs = require('fs');


const countStudents = (data) => {
  if (!fs.existsSync(data)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(data).isFile()) {
    throw new Error('Cannot load the database');
  }
  const files = fs
    .readFileSync(data, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const student = {};
  const dbNames = files[0].split(',');
  const studentNames = dbNames.slice(0, dbNames.length - 1);

  for (const line of files.slice(1)) {
    const addStudent = line.split(',');
    const Values = addStudent.slice(0, addStudent.length - 1);
    const studentField = addStudent[addStudent.length - 1];
    if (!Object.keys(student).includes(studentField)) {
      student[studentField] = [];
    }
    const studentEntry = studentNames
      .map((name, std) => [name, Values[std]]);
    student[studentField].push(Object.fromEntries(studentEntry));
  }

  const allStudents = Object
    .values(student)
    .reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${allStudents}`);
  for (const [fields, groups] of Object.entries(student)) {
    const studentNames = groups.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${fields}: ${groups.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
