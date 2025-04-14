/** moment 1.2
 * Programmeing i TypeScript DT208G
 * Av Ramona Reinholdz, rare2400*/

window.onload = () => {
    renderCourses();
};

// Definiera TypeScript-interface för kursinformation
interface CourseInfo {
    code: string;
    name: string;
    progression: 'A' | 'B' | 'C';
    syllabus: string;
}

//Hämtar kurser från localStorage
function getCourses(): CourseInfo[] {
    const courses = localStorage.getItem('courses');
    return courses ? JSON.parse(courses) : [];
}

//Eventlyssnare för att lägga till kurser
const courseForm = document.getElementById('addCourseForm') as HTMLFormElement;
if (courseForm) {
    courseForm.addEventListener('submit', event => {
        event.preventDefault();

        const codeInput = document.getElementById('code') as HTMLInputElement;
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const progressionInput = document.getElementById('progression') as HTMLSelectElement;
        const syllabusInput = document.getElementById('syllabus') as HTMLInputElement;

        const newCourse: CourseInfo = {
            code: codeInput.value.trim(),
            name: nameInput.value.trim(),
            progression: progressionInput.value as 'A' | 'B' | 'C',
            syllabus: syllabusInput.value.trim()
        };

        if (!newCourse.code || !newCourse.name || !newCourse.progression || !newCourse.syllabus) {
            alert('Alla fält måste vara ifyllda!');
            return;
        };

        courseForm.reset();
    });
}

//Skriver ut kurser i tabellen
function renderCourses(): void {
    const courseTable = document.getElementById('courseTable') as HTMLTableElement;
    if (!courseTable) {
        console.error("courseTable hittades inte!");
        return;
    }

    const courses = getCourses();

    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.progression}</td>
            <td><a href="${course.syllabus}" target="_blank">Kursplan</a></td>
        `;
        courseTable.appendChild(row);
    });
}