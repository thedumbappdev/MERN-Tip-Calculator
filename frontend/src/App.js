import React, { useState } from 'react';
import './App.css';
import { DollarSign, Percent, Edit } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // setting the states in order to store the form values
  const [amount, setAmount] = useState("");
  const [percent, setPercent] = useState("");
  const [tip, setTip] = useState("");

  // function to calculate the amount to be paid after the Calculate button is clicked
  const calculateTip = (e) => {
    e.preventDefault();

    // to checks the textfield is blank or not
    if (!amount || !percent) {
      // to stop the function execution immediately
      return toast.error("Fields can't be blank!");
    }

    // display success notification
    toast.success("Request has been sent for processing!");

    // prepare the data to be sent in a object
    const data = {
      amount,
      tip: percent,
    };

    // initialize the HTTP request to the express server
    fetch("http://localhost:3000/api/v1/calculateTip", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data), // stringify converts the data object into JSON string, to be parsed on backend
    }).then((res) => {
        return res.json(); // informs the fetch api about the response received is of type json and parses it and stored as object
      }).then((data) => setTip(data.toBePaid)); // set the tip in order to re-render and display the response
  };

  return (
    <div className="App bg-gradient-to-br from-indigo-300 to-purple-700">
      <div className="flex flex-wrap flex-row h-screen justify-center items-center">
          <div className="grid grid-column w-1/3 bg-white rounded shadow-lg p-8">
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                  Bill Amount
                </label>
              </div>
              <div className="md:w-2/3">
                <div className="flex flex-wrap items-stretch w-full relative">
                  <div className="flex -mr-px">
                    <span className="flex items-center leading-normal bg-gray-200 text-gray-500 rounded rounded-r-none px-3 whitespace-no-wrap text-sm"><DollarSign /></span>
                  </div>
                  <input type="text" className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 h-10 rounded rounded-l-none relative appearance-none bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                  Tip Percent
                </label>
              </div>
              <div className="md:w-2/3">
                <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                <div className="flex -mr-px">
                    <span className="flex items-center leading-normal bg-gray-200 text-gray-500 rounded rounded-r-none px-3 whitespace-no-wrap text-sm"><Percent /></span>
                  </div>
                  <input type="text" className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 h-10 rounded rounded-l-none relative appearance-none bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" placeholder="Percent" value={percent} onChange={(e) => setPercent(e.target.value)} />
                </div>
              </div>
          </div>
          <div className="flex justify-center mb-3">
              <button type="button" class="flex transition duration-500 ease-in-out bg-blue-600 hover:bg-blue-500 hover:shadow-inner focus:outline-none text-white font-semibold px-4 py-2 rounded" onClick={calculateTip}><span className="pr-2"><Edit /></span> Calculate</button>
              <h3>{tip}</h3>
          </div>
          <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
      </div>
    </div>
  );
}

export default App;
