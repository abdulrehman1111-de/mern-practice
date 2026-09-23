export function getCourses() {

    const courses = localStorage.getItem("courses")

    if (!courses) {
        return []
    }

    return JSON.parse(courses)
}

function saveCourses(courses) {

    let stringCourses = JSON.stringify(courses)
    localStorage.setItem("courses", stringCourses)
}

export function createCourse(courseData, teacherId) {

    const course = {
        id: Date.now(),
        teacherId: teacherId,
        name: courseData.name,
        section: courseData.section,
        credits: courseData.credits,
        schedule: courseData.schedule,
        status: "In Progress",
        enrolledStudents: []
    }

    let existingCourses = getCourses()
    existingCourses.push(course)
    saveCourses(existingCourses)
}

export function getCoursesByTeacher(teacherId) {

    let courses = getCourses();
    let specificTeacherCourses = courses.filter((course) => {
        return course.teacherId === teacherId
    })
    return specificTeacherCourses

}

export function getCoursesByStudent(studentId) {

    let courses = getCourses()
    let specificStudentCourses = courses.filter((course) => {
        let enrolledStudents = course.enrolledStudents
        return enrolledStudents.some((student) => {
            return student.studentId === studentId
        })
    })

    return specificStudentCourses
}

export function updateStudentProgress(courseId, studentId, progress) {

    let courses = getCourses()
    let matchingCourse = courses.find((course) => {
        return String(course.id) === courseId
    })
    let studentArr = matchingCourse.enrolledStudents
    let specificStudent = studentArr.find((item) => {
        return String(item.studentId) === studentId
    })
    specificStudent.progress = progress
    saveCourses(courses)
}

export function updateStudentGrade(courseId, studentId, score, grade) {
    let courses = getCourses()
    let matchingCourse = courses.find((course) => {
        return String(course.id) === courseId
    })
    let studentArr = matchingCourse.enrolledStudents
    let specificStudent = studentArr.find((item) => {
        return String(item.studentId) === studentId
    })
    specificStudent.score = score
    specificStudent.grade = grade
    saveCourses(courses)
}

export function enrollStudent(courseId, studentId) {

    let courses = getCourses()
    let matchingCourse = courses.find((course) => {
        return course.id === courseId
    })
    let studentArr = matchingCourse.enrolledStudents
    let newStudentObj = { studentId, progress: 0, score: null, grade: null }

    let duplicateCheck = studentArr.some((student) => {
        return student.studentId === studentId
    })
    if (duplicateCheck) {
        return
    }

    studentArr.push(newStudentObj)
    saveCourses(courses)

}















