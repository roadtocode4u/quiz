import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

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

  const [quizNumber, setQuizNumber] = useState(0);

  // generate random number from 0 to 3
  const randomSetNo = Math.floor(Math.random() * 4);
  if(!localStorage.getItem('setNumber'))
  {
    localStorage.setItem('setNumber', randomSetNo);
    setQuizNumber(randomSetNo)
  }

  useEffect(()=>{
    if(localStorage.getItem('setNumber'))
    {
      setQuizNumber(localStorage.getItem('setNumber'))
      const studentName = prompt("Enter your Full Name:");
      localStorage.setItem('studentName', studentName);
      const arr = ['A', 'B', 'C', 'D']
      sendDataToSlack(studentName, arr[localStorage.getItem('setNumber')]);
    }
  },[])

  async function sendDataToSlack(studentName, setNumber){
    // send tracking info to slack
    // await axios.post("/send", {
    //   studentName: studentName,
    //   setNumber: setNumber
    // })
    // api request with client side cors check disabled

    const response = await axios.post(
      "/chat.postMessage",
      {
        channel: "C03N225P5FX",
        text: 'C Programming Quiz  => '+studentName+', Set Number: '+setNumber
      },
      {
        headers: {
           authorization: `Bearer xoxb-1925858523235-3898160116240-H6xwntp6TZTcl2pSI2nfEYHc`,
        }
      }
    );
  }

  return (
    <div  className='container'>
      <h1 className='text-center'>C Programming Test-1</h1>
      <h2>{quizData[quizNumber].setName}</h2>
      {
        quizData[quizNumber].questions.map((question, index)=>{
          return <p key={index}>{index+1}) {question}</p>
        })
      }
    </div>
  );
}

export default App;
