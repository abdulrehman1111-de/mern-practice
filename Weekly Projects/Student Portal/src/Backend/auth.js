import { getRegisteredUsers, saveUsers, setCurrentUser } from "./users";

// Seed data (hardcoded)
const studentRecords = {

    "123": {
        name: "Abdul Rehman",
        grades: {
            DiscreteMathematics: {
                score: "90%",
                grade: "A",
            },
            DataStructures: {
                score: "90%",
                grade: "B",
            },
            DatabaseSystems: {
                score: "79%",
                grade: "B+",
            },
            WebEngineering: {
                score: "91%",
                grade: "A",
            }
        },
        courseProgress: {
            DataStructures: 72,
            DatabaseSystems: 58,
            WebEngineering: 85,
            DiscreteMathematics: 40
        }
    },

    "456": {
        name: "Ali Ahmad",
        grades: {
            DataStructures: {
                score: "80%",
                grade: "B",
            },
            DiscreteMathematics: {
                score: "60%",
                grade: "A",
            },
            DatabaseSystems: {
                score: "71%",
                grade: "B-",
            },
            WebEngineering: {
                score: "82%",
                grade: "A-",
            }
        },
        courseProgress: {
            DataStructures: 40,
            DatabaseSystems: 85,
            WebEngineering: 58,
            DiscreteMathematics: 72
        }

    }
}

export function getStudentRecords() {
    return studentRecords;
}

export function updateStudentGrade(studentId, course, score, grade) {

    let records = getStudentRecords();
    records[studentId].grades[course].score = score;
    records[studentId].grades[course].grade = grade;

}

export function updateCourseProgress(studentId, course, progress) {
    let records = getStudentRecords();
    records[studentId].courseProgress[course] = progress;
}

export function updateUserPreferences(userId, newPreferences){

    const users = getRegisteredUsers()
    const currentUser = users.find((user)=>{
        return String(user.id) === String(userId)
    })
    currentUser.preferences = newPreferences
    saveUsers(users)
    setCurrentUser(currentUser)
}













