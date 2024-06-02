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
    .split('\n')
    .filter((line) => line.length > 0);

  const students = files.slice(1);
  const fields = {};

  students.forEach((student) => {
    const field = student.split(',')[3];
    if (!fields[field]) {
      fields[field] = [];
    }
    fields[field].push(student.split(',')[0]);
  });

  console.log(`Number of students: ${students.length}`);
  for (const field in fields) {
    console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
  }
};

module.exports = countStudents;

