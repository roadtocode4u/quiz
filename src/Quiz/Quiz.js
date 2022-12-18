import {useEffect, useState} from 'react';
import axios from 'axios';

import './Quiz.css';

function Quiz() {

  const quizData = [
    {
      setName: "Set-A",
      questions: [
        "WAP to check whether user is eligible for voting or not. 💡 HINT: use ternary operator.",
        "WAP to take input 3 subject from user and print sum and percentage.",
        "WAP take input from user and find 'area' of 'rectangle' by taking value of length and breadth from user.",
        "WAP to check if two numbers are equal or not using ternary operator.",
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
        "WAP to check whether year is leap year or not. 💡 HINT: use ternary operator and year which is divisible by 4 is leap year.",
        "WAP to temperature in Celsius and convert it into Fahrenheit. 🌡 HINT: use formula °F = (°C × 9/5) + 32 ",
        "Write a c program take  input from user and find 'area' of 'circle' by taking value of radius from user.",
        "WAP to find largest number among two numbers using ternary operator.",
      ],
      ta: {
        name: "Vaishnavi Ma'am",
        imgUrl: "https://github.com/vaishnavihole.png",
        whatsapp: "9588603013",
      }
    },
    {
      setName: "Set-C",
      questions: [
        "WAP to check number is negative or positive. 💡 HINT: use ternary operator.",
        "WAP to calculate simple interest by taking values of Principle, Rate and Time from user. 💰 HINT: use formula SI = (p * r * t) / 100",
        "Write a c program to calculate 'perimeter' of 'circle' by taking value of radius from user.",
        "WAP to check if given number is divisible by 5 and 3 or not using ternary operator",
      ],
      ta: {
        name: "Prajakta Ma'am",
        imgUrl: "https://github.com/prajaktadharpure28.png",
        whatsapp: " 9552864752",
      }
    },
    {
      setName: "Set-D",
      questions: [
        "WAP to check given number is odd or even using ternary operator. 💡 HINT: use ternary operator.",
        "WAP to calculate distance covered by car by taking speed and time from user. 🚗 HINT: use formula distance = speed * time",
        "Write a c program to calculate 'perimeter' of a 'rectangle' by taking value of length and breadth from user.",
        "WAP to calculate bill by taking Rate and Quantity from user. 💰 HINT: use formula bill = rate * quantity",
      ],
      ta: {
        name: "Anand Sir",
        imgUrl: "https://github.com/AnandShirbhaiyye.png",
        whatsapp: "7020407429",
      }
    },
    {
      setName: "Set-E",
      questions: [
        "WAP to check given number is odd or even using ternary operator. 💡 HINT: use ternary operator.",
        "WAP to calculate distance covered by car by taking speed and time from user. 🚗 HINT: use formula distance = speed * time",
        "Write a c program to calculate 'perimeter' of a 'rectangle' by taking value of length and breadth from user.",
        "WAP to calculate bill by taking Rate and Quantity from user. 💰 HINT: use formula bill = rate * quantity",
      ],
      ta: {
        name: "Yash Sir",
        imgUrl: "https://github.com/yashnaravade.png",
        whatsapp: "9860847191",
      }
    }
  ];

  const setNames = ["Set-A", "Set-B", "Set-C", "Set-D", "Set-E"];

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
      sendDataToSlack(localStorage.getItem('fullName'), setNames[localStorage.getItem('setNumber')]);
    }
  }, []);

  async function sendDataToSlack(studentName, setNumber){
    const response = await axios.post(
      "/chat.postMessage",
      {
        channel: "C044SA8T69H",
        text: `C++ Programming Test  => Student Name: *${studentName}*, Set Number: *${setNumber}*`
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
      <h1 className='text-center header'>C++ Programming Test-1</h1>
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
