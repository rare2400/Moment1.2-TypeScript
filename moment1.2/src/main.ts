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

        addCourse(newCourse);
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

    //Tömmer tabellen
    courseTable.innerHTML = '';

    //Tabellens rubriker
    const theadRow = document.createElement('tr');
    const headerNames = ['Kurskod', 'Kursnamn', 'Progression', 'Kursplan'];

    headerNames.forEach(header => {
        const thead = document.createElement('th');
        thead.textContent = header;
        theadRow.appendChild(thead);
    });

    //Lägger till kurser i tabellen
    const courses = getCourses();

    courses.forEach(course => {
        const row = document.createElement('tr');

        //Skapar celler för varje kursdel i raden
        const codeCell = document.createElement('td');
        codeCell.textContent = course.code;

        const nameCell = document.createElement('td');
        nameCell.textContent = course.name;

        const progrCell = document.createElement('td');
        progrCell.textContent = course.progression;

        const linkCell = document.createElement('td');
        const link = document.createElement('a');
        link.href = course.syllabus;
        link.target = '_blank';
        link.textContent = 'Kursplan';
        linkCell.appendChild(link);

        //lägger till celler i raden
        row.appendChild(codeCell);
        row.appendChild(nameCell);
        row.appendChild(progrCell);
        row.appendChild(linkCell);

        //Raden läggs till i tabellen
        courseTable.appendChild(row);
    })

}

//Lägger till tillagda kurser i localStorage
function addCourse(course: CourseInfo): void {
    const courses = getCourses();

    //Kontrollerar om kurskoden är unik
    if (courses.some(c => c.code === course.code)) {
        alert('Kurskoden måste vara unik!');
        return;
    }

    courses.push(course);
    saveCourses(courses);
    renderCourses();
}

//Sparar kurser till localStorage
function saveCourses(courses: CourseInfo[]): void {
    localStorage.setItem('courses', JSON.stringify(courses));
}