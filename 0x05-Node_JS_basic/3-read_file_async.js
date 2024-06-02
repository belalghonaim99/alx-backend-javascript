const fs = require('fs');


const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const fileLines = data
        .toString('utf-8')
        .trim()
        .split('\n');
      const studentsGroups = {};
      const dbFieldN = fileLines[0].split(',');
      const studentNames = dbFieldN
        .slice(0, dbFieldN.length - 1);

      for (const lines of fileLines.slice(1)) {
        const studentRecords = lines.split(',');
        const studentValues = studentRecords
          .slice(0, studentRecords.length - 1);
        const fields = studentRecords[studentRecords.length - 1];
        if (!Object.keys(studentsGroups).includes(fields)) {
          studentsGroups[fields] = [];
        }
        const studentEntry = studentNames
          .map((propName, idx) => [propName, studentValues[idx]]);
        studentsGroups[fields].push(Object.fromEntries(studentEntry));
      }

      const totalStudents = Object
        .values(studentsGroups)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      console.log(`Number of students: ${totalStudents}`);
      for (const [fieldStudents, groups] of Object.entries(studentsGroups)) {
        const studentNames = groups.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${fieldStudents}: ${groups.length}. List: ${studentNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
