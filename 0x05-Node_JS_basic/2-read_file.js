const fs = require('fs');

const countStudents = (data) => {
  if (!fs.existsSync(data)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(data).isFile()) {
    throw new Error('Cannot load the database');
  }

  fs.readFileSync(data, 'utf-8').trim().replace(/\r\n/g, '\n').split('\n');
  const studentData = {};

  // Rest of the code remains unchanged

  for (const [field, students] of Object.entries(studentData)) {
    const studentNames = students.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${students.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
