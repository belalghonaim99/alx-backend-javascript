export default function createIteratorObject(report) {
  const employees = Object.values(report.allEmployees);
  let index = 0;

  return {
    next() {
      if (index < employees.length) {
        const departmentEmployees = employees[index];
        const employee = departmentEmployees.shift();
        if (!departmentEmployees.length) {
          index++;
        }
        return { value: employee, done: false };
      }
      return { done: true };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}
