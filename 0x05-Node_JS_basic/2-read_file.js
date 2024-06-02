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
    .filter((line) => line.length > 0); // filter out empty lines

  const students = files.slice(1); // remove header line
  const fields = {};

  students.forEach((student) => {
    const field = student.split(',')[3]; // assuming field is the 4th column
    if (!fields[field]) {
      fields[field] = [];
    }
    fields[field].push(student.split(',')[0]); // assuming name is the 1st column
  });

  console.log(`Number of students: ${students.length}`);
  for (const field in fields) {
    console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
  }
};

<<<<<<< HEAD
module.exports = countStudents;
export default countStudents;
=======
module.exports = countStudents;
>>>>>>> e4f953c1b826c91dec4e82d3fe89f133f8f8abb8
