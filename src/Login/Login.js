import React,{useState, useEffect} from 'react'
import Countdown from 'react-countdown';
import "./Login.css"
import Logo from '../img/logo.png'

function Login() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("setNumber")) {
      const randomSetNo = Math.floor(Math.random() * 2);
      localStorage.setItem("setNumber", randomSetNo);
    }

    if(localStorage.getItem('fullName') || localStorage.getItem('mobile')){
      window.location = "/quiz"
    }
  }, [])

  function saveDetails(){
    localStorage.setItem('fullName', fullName)
    localStorage.setItem('mobile', mobile)
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return(<form onSubmit={saveDetails}>
        <div className="form-group mt-3">
          <label htmlFor="fullName">Name</label>
          <input type="text" className="form-control" id="fullName" placeholder="Enter your Full Name"
          value={fullName}
          onChange={(e)=>setFullName(e.target.value)}
          required/>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="Mobile">Mobile</label>
          <input type="text" className="form-control" id="mobile" placeholder="Enter your Mobile"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
          required/>
        </div>

        <button type="submit" className="next-button">Next</button>
      </form>)
    } else {
      // Render a countdown
      return (<p className='waiting-time'>Wait for {hours} hours, {minutes} minutes and {seconds} seconds ⏰</p>);
    }
  };

  return (
    <div className='container'>

      <img src={Logo} className="img-logo" alt="logo" />
      <Countdown
        date={"2023-03-21T18:00:00"}
        renderer={renderer}
      />
    </div>
  )
}

export default Login
