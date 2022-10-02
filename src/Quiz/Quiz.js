import {useEffect, useState} from 'react';
import axios from 'axios';

import './Quiz.css';

function Quiz() {

  const quizData = [
    {
      setName: "Set-A",
      questions: [
        "Write a c program to check whether user is eligible for voting or not. ",
        "Write a c program to take input 5 subject from user and print sum and percentage .",
        "Write a c program take input from user and find area of rectangle.",
        "Write a c program to check  character is vowel or not.",
      ]
    },
    {
      setName: "Set-B",
      questions: [
        "Write a c program to check whether year is leap year or not.",
        "Write a c program to take input from user and print sum and percentage.",
        "Write a c program take  input from user and find area of circle.",
        "Write a c program to find sum of first 10 natural number.",
      ]
    },
    {
      setName: "Set-C",
      questions: [
        "Write a c program to check number is negative or positive.",
        "Write a c program to take input from user and print sum and percentage .",
        "Write a c program to calculate perimeter and area of a circle when radius is given. (radius=5)",
        "Write a program to convert km to m and cm.",
      ]
    },
    {
      setName: "Set-D",
      questions: [
        "Write a c program to check given number is prime or not .",
        "Write a c program to take input from user and print sum and percentage .",
        "Write a c program to calculate perimeter and area of a rectangle when length and breadth is given. (length = 10 breadth = 20)",
        " Write a c program to to calculate bill when rate and quantity is given.(rate=5, quantity=10)",
      ]
    }
  ];

  const setNames = ["Set-A", "Set-B", "Set-C", "Set-D"];

  const [quizNumber, setQuizNumber] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("setNumber")) {
      setQuizNumber(localStorage.getItem("setNumber"));
    }
    if(!localStorage.getItem("slackNotified"))
    {
      sendDataToSlack(localStorage.getItem('fullName'), setNames[localStorage.getItem('setNumber')]);
    }
  }, []);

  async function sendDataToSlack(studentName, setNumber){
    const response = await axios.post(
      "/chat.postMessage",
      {
        channel: "C044SA8T69H",
        text: `C Programming Quiz  => Student Name: *${studentName}*, Set Number: *${setNumber}*`
      },
      {
        headers: {
           authorization: `Bearer xoxb-1925858523235-3898160116240-H6xwntp6TZTcl2pSI2nfEYHc`,
        }
      }
    );
    if(response?.data?.ok===true)
    {
      localStorage.setItem('slackNotified', "true");
    }
  }

  return (
    <div  className='container'>
      <h1 className='text-center header'>C Programming Test-1</h1>
      <h2 className='text-center'>{quizData[quizNumber]?.setName}</h2>
      {
        quizData[quizNumber]?.questions?.map((question, index)=>{
          return <div className='question-panel card' key={index}>{index+1}) {question}</div>
        })
      }
    </div>
  );
}

export default Quiz;
