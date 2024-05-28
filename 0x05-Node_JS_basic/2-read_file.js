const fs = require('fs');

const countStudents = (data) => {
  if (!fs.existsSync(data)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(data).isFile()) {
    throw new Error('Cannot load the database');
  }

  const fileContent = fs.readFileSync(data, 'utf-8').trim().split('\n');
  const studentData = {};
  const headers = fileContent[0].split(',');
  const fieldNames = headers.slice(0, headers.length - 1);

  for (const line of fileContent.slice(1)) {
    const studentInfo = line.split(',');
    const studentFields = studentInfo.slice(0, studentInfo.length - 1);
    const studentField = studentInfo[studentInfo.length - 1];
    
    if (!Object.keys(studentData).includes(studentField)) {
      studentData[studentField] = [];
    }

    const studentEntry = fieldNames.map((name, index) => [name, studentFields[index]]);
    studentData[studentField].push(Object.fromEntries(studentEntry));
  }

  const totalStudents = Object.values(studentData).reduce((acc, cur) => acc + cur.length, 0);
  console.log(`Number of students: ${totalStudents}`);

  for (const [field, students] of Object.entries(studentData)) {
    const studentNames = students.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${students.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
