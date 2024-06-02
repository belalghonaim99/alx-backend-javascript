const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';


const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reports = [];
        const fileLines = data.toString('utf-8').trim().split('\n');
        const studentsGroups = {};
        const dbNames = fileLines[0].split(',');
        const studentNames = dbNames.slice(
          0,
          dbNames.length - 1,
        );

        for (const line of fileLines.slice(1)) {
          const studentsRecords = line.split(',');
          const studentValues = studentsRecords.slice(
            0,
            studentsRecords.length - 1,
          );
          const field = studentsRecords[studentsRecords.length - 1];
          if (!Object.keys(studentsGroups).includes(field)) {
            studentsGroups[field] = [];
          }
          const studentEntry = studentNames.map((propName, id) => [
            propName,
            studentValues[id],
          ]);
          studentsGroups[field].push(Object.fromEntries(studentEntry));
        }

        const totalStudents = Object.values(studentsGroups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reports.push(`Number of students: ${totalStudents}`);
        for (const [field, groups] of Object.entries(studentsGroups)) {
          reports.push([
            `Number of students in ${field}: ${groups.length}.`,
            'List:',
            groups.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reports.join('\n'));
      }
    });
  }
});

app.get('/', (_, response) => {
  response.send('Hello Holberton School!');
});

app.get('/students', (_, responses) => {
  const responseParts = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseParts.push(report);
      const responseText = responseParts.join('\n');
      responses.setHeader('Content-Type', 'text/plain');
      responses.setHeader('Content-Length', responseText.length);
      responses.statusCode = 200;
      responses.write(Buffer.from(responseText));
    })
    .catch((err) => {
      responseParts.push(err instanceof Error ? err.message : err.toString());
      const responseText = responseParts.join('\n');
      responses.setHeader('Content-Type', 'text/plain');
      responses.setHeader('Content-Length', responseText.length);
      responses.statusCode = 200;
      responses.write(Buffer.from(responseText));
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
