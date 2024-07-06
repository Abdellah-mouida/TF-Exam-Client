import React from "react";

function About() {
  return (
    <div className="about">
      <h1 className="g-title">
        About <span>TF Exam</span>
      </h1>

      <p className="welcome">Welcome to TF Exam!</p>

      <div className="about-content">
        <p>
          TF Exam is an innovative web application designed to simplify the
          process of creating, administering, and taking true and false exams.
          Whether you are an educator looking to streamline your assessment
          process, a student preparing for exams, or an organization seeking an
          efficient way to evaluate knowledge, TF Exam offers a user-friendly
          and effective solution.
        </p>
        <h3>Key Features:</h3>
        <ul>
          <li>
            <strong>Easy Exam Creation:</strong> Quickly create true and false
            exams with an intuitive interface.
          </li>
          <li>
            <strong>Secure Administration:</strong> Ensure the integrity of your
            exams with robust security features.
          </li>
          <li>
            <strong>Instant Grading:</strong> Receive immediate results and
            feedback to help identify areas of improvement.
          </li>
          <li>
            <strong>User Management:</strong> Efficiently manage users and track
            performance over time.
          </li>
          <li>
            <strong>Customizable Settings:</strong> Tailor the app to fit your
            specific needs and preferences.
          </li>
        </ul>
        <h3>Roles and Permissions:</h3>
        <ul>
          <li>
            <strong>Teachers:</strong> Teachers can create and manage exams,
            monitor student performance, and access detailed analytics to
            enhance their teaching strategies.
          </li>
          <li>
            <strong>Students:</strong> Students can take exams, review their
            results, and track their progress over time, helping them to
            identify strengths and areas for improvement.
          </li>
        </ul>
        <h3>Scoring System:</h3>
        <p>
          TF Exam features a comprehensive scoring system for students. After
          completing an exam, students receive immediate feedback with detailed
          scores, allowing them to understand their performance. This system
          helps students track their progress and motivates them to improve by
          providing clear insights into their strengths and areas needing
          improvement.
        </p>
        <h3>Contact Information:</h3>
        <ul>
          <li>
            <strong>Email:</strong> support@tfexam.com
          </li>
          <li>
            <strong>Phone:</strong> +212 612559620
          </li>
          <li>
            <strong>Address:</strong> Ait Iazza , Taroudant , Morocco
          </li>
        </ul>
        <p>
          Join the TF Exam community today and experience a new standard in exam
          management and assessment.
        </p>
      </div>
    </div>
  );
}

export default About;
