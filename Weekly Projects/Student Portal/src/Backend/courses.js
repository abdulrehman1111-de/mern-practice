function getCourses(){

    let coursesArr;
    const courses = localStorage.getItem("courses")

    if(!courses){
        return []
    }

    coursesArr = JSON.parse(courses)
    return coursesArr
}

function saveCourses(courses){

    let stringCourses = JSON.stringify(courses)
    localStorage.setItem("courses", stringCourses)
}













