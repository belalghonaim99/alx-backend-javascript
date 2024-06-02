const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (dp) => new Promise((resolve, reject) => {
    if (!dp) {
        reject(new Error('Cannot load the database'));
    }
    if (dp) {
        fs.readFile(dp, (error, data) => {
            if (error) {
                reject(new Error('Cannot load the database'));
            }
            if (data) {
                const rp = [];
                const flines = data.toString('utf-8').trim().split('\n');
                const sg = {};
                const dbNames = flines[0].split(',');
                const studentNames = dbNames.slice(0, dbNames.length - 1);

                for (const line of flines.slice(1)) {
                    const studentsRecord = line.split(',');
                    const studentValues = studentsRecord.slice(0, studentsRecord.length - 1);
                    const studentField = studentsRecord[studentsRecord.length - 1];
                    if (!Object.keys(sg).includes(studentField)) {
                        sg[studentField] = [];
                    }
                    const studentEntries = studentNames.map((propName, idx) => [
                        propName,
                        studentValues[idx],
                    ]);
                    sg[studentField].push(Object.fromEntries(studentEntries));
                }

                const totalOfStudents = Object.values(sg).reduce((pre, cur) => (pre || []).length + cur.length);
                rp.push(`Number of students: ${totalOfStudents}`);
                for (const [field, group] of Object.entries(sg)) {
                    const studentList = group.map((student) => student.firstname).join(', ');
                    rp.push(`Number of students in ${field}: ${group.length}. List: ${studentList}`);
                }
                resolve(rp.join('\n'));
            }
        });
    }
});

const SERVER_ROUTE_HANDLERS = [
    {
        route: '/',
        handler(_, res) {
            const responseText = 'Hello Holberton School!';

            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Content-Length', responseText.length);
            res.statusCode = 200;
            res.write(Buffer.from(responseText));
            res.end();
        },
    },
    {
        route: '/students',
        handler(_, response) {
            const responseParts = ['This is the list of our students'];

            countStudents(DB_FILE)
                .then((report) => {
                    responseParts.push(report);
                    const responseText = responseParts.join('\n');
                    response.setHeader('Content-Type', 'text/plain');
                    response.setHeader('Content-Length', responseText.length);
                    response.statusCode = 200;
                    response.write(Buffer.from(responseText));
                    response.end();
                })
                .catch((err) => {
                    responseParts.push(err instanceof Error ? err.message : err.toString());
                    const responseText = responseParts.join('\n');
                    response.setHeader('Content-Type', 'text/plain');
                    response.setHeader('Content-Length', responseText.length);
                    response.statusCode = 200;
                    response.write(Buffer.from(responseText));
                    response.end();
                });
        },
    },
];

app.on('request', (req, res) => {
    for (const routeHandler of SERVER_ROUTE_HANDLERS) {
        if (routeHandler.route === req.url) {
            routeHandler.handler(req, res);
            break;
        }
    }
});

app.listen(PORT, HOST, () => {
    process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
