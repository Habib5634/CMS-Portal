import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
const StudentHome = () => {
    const [courses, setCourses] = useState([]);
  
  

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const coursesCollection = collection(db, 'courses');
            const querySnapshot = await getDocs(coursesCollection);
    
            const coursesData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            setCourses(coursesData);
            console.log('Courses:', coursesData);
          } catch (error) {
            console.error('Error fetching courses:', error.message);
          }
        };
    
        fetchCourses();
      }, []);
  return (
    <div>
    <h2>Course List</h2>
    <ul>
      {courses.map((course) => (
        <li key={course.id}>
          {/* <p>{`Course ID: ${course.id}`}</p> */}
          <Link to={`courses/${course.id}`}>
          <p>{`Course Name: ${course.courseName}`}</p>
          </Link>
          {/* <p>{`Duration: ${course.courseDuration} months`}</p> */}
          {/* <p>{`Fee: Rs.${course.feeInRupees}`}</p> */}
          {/* <p>{`No of Quizzes: ${course.noOfQuiz}`}</p> */}
          {/* Add additional fields as needed */}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default StudentHome