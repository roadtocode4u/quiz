import {useEffect, useState} from 'react';
import axios from 'axios';

import './Quiz.css';

function Quiz() {

  const quizData = [
    {
      setName: "Set-A",
      questions: [
      "Write a program Check Number is Divisible by 3 and 5 using 'and' operator.",
      "Write a program to print Grocery Items using keys and values.",
      "Write a program to take input for marks of 5 subject and display the grade.",
      "Write a program to Find the Largerst Number Among Three Numbers by using Nested-if statement.",
      "Write a program to reversed the Present Number." 
      ],
      ta: {
        name: "Pinki Ma'am",
        imgUrl: "https://github.com/Vaibhavihole31.png",
        whatsapp: "7821011979",
      }
    },
    {
      setName: "Set-B",
      questions: [
        "Write a program Check Number is Divisible by 5 and 20 using 'and' operator.",
        "Write a program to print courses using keys and values.",
        "Write a program to take input for marks of 5 subject and display the grade.",
        "Write a program to Find the smallest Number Among Three Numbers by using Nested-if statement.",
        "Write a program to Print the Fibonacci sequence."
      ],
      ta: {
        name: "Sakshi Ma'am",
        imgUrl: "https://github.com/sakshi-rah.png",
        whatsapp: "9356580327",
      }
    }
  ];

  const setNames = ["Set-A", "Set-B"];

  const [quizNumber, setQuizNumber] = useState(null);

  useEffect(() => {
    if(!localStorage.getItem("setNumber") || !localStorage.getItem('fullName'))
    {
      localStorage.clear();
      alert('Enter Name and Mobile First');
      window.location.href = "/";
    }
    if (localStorage.getItem("setNumber")) {
      setQuizNumber(localStorage.getItem("setNumber"));
    }
    if(!localStorage.getItem("slackNotified"))
    {
      console.log("Sending Data to Slack");
      sendDataToSlack(localStorage.getItem('fullName'), setNames[localStorage.getItem('setNumber')]);
    }
  }, []);

  async function sendDataToSlack(studentName, setNumber){
    const response = await axios.post(
      "/chat.postMessage",
      {
        channel: "C044SA8T69H",
        text: `C Programming Test  => Student Name: *${studentName}*, Set Number: *${setNumber}*`
      },
      {
        headers: {
           authorization: `Bearer ${process.env.REACT_APP_SLACK_TOKEN}`,
        }
      }
    );
    console.log(response);
    if(response?.data?.ok===true)
    {
      localStorage.setItem('slackNotified', "true");
    }
  }

  return (
    <div  className='container'>
      <h1 className='text-center header'>Python Programming Test-1</h1>
      <h2 className='text-center'>{quizData[quizNumber]?.setName}</h2>
      {
        quizData[quizNumber]?.questions?.map((question, index)=>{
          return <div className='question-panel card' key={index}>{index+1}) {question}</div>
        })
      }
      <div className='p-3'>
        <h2>All The Best 👍</h2>
      </div>
      <div className='ta-container'>
        <p className='instructions'>Kindly send answers to teaching assistant given below:</p>
        <div className='ta-card'>
          <div className=''>
            <img src={quizData[quizNumber]?.ta?.imgUrl} alt="ta-img" className='ta-img'/>
          </div>
          <div className='p-2'>
            <h5>{quizData[quizNumber]?.ta?.name}</h5>
            <h6>Whatsapp: {quizData[quizNumber]?.ta?.whatsapp}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
