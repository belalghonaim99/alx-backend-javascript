function updateStudentGradeByCity(students, city, newGrades) {
    return students
        .filter(student => student.location === city)
        .map(student => {
            const matchingGrade = newGrades.reduce((acc, curr) => {
                return curr.studentId === student.id ? curr.grade : acc;
            }, 'N/A');
            return {
                id: student.id,
                firstName: student.firstName,
                location: student.location,
                grade: matchingGrade
            };
        });
}
export default updateStudentGradeByCity;
