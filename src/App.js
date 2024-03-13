import logo from './logo.svg';
import {useEffect, useState} from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import {HiSwitchHorizontal} from 'react-icons/hi';
import 'react-dropdown/style.css';

import './App.css';

function App() {

  const [info,setInfo] = useState([]);
  const [input,setINput] = useState(0);
  const [from,setFrom] = useState("usd");
  const [to ,setTo] = useState("inr");
  const [options,setOptions] = useState([]);
  const [output,setOutput] = useState(0);

  useEffect(() => {
    Axios.get(
      `https://api.exchangerate-api.com/v4/latest/${from}?api_key=04ed200a5636ee9a3480c2c9`
      ).then((res) => {
      setInfo(res.data.rates);
    })
  },[from]);

 
  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  },[info]);

  
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }


  
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }
  return (
   <div className = "APP">
    <div className = "heading">
      <h1>Currency converter</h1>
    </div>
    <div className ="container">
    <div className ="left">
      <h3>Amount</h3>
      <input type ="text"
      placeholder= "Enter the amount"
      onChange={(e) => setINput(e.target.value)} />
    </div>
    <div className= "middle">
      <h3>Form</h3>
      <Dropdown options={options}
      onChange={(e) => {
        setFrom(e.value)
      }}
      value={from} placeholder="From" />  
        </div>

        <div className="switch">
          <HiSwitchHorizontal size = "30px"
          onClick={() => {flip()}} />
        </div>

        <div className="right">
          <h3>To</h3>
          <Dropdown options={options}
          onChange ={(e) => {setTo(e.value)}}
          value={to} placeholder="To" />
        </div>
        </div>
        <div className ="result">
          <button onClick={() => { convert()}}>Convert</button>
          <h2>Converted Amount:</h2>
          <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
        </div>
   </div>
  );
}

export default App;



