import React, {DateRangePicker,useState  } from "react";
import Sidebar from "./sidebar";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../index.css";
import "./Sidebar.css";  
function setupSelectButton() {
  const selectButton = document.getElementById("selectButton");
  const message = document.getElementById("message");

  selectButton.addEventListener("click", () => {
    message.classList.add("show-message");

    // Remove the "show-message" class after a delay (e.g., 2 seconds)
    setTimeout(() => {
      message.classList.remove("show-message");
    }, 4000);
  });
}

 
const Team = () => {
    const [selectedDate, setSelectedDate] = useState(""); 


    const handleSelectButton = () => {
        setSelectedDate(document.getElementById("date").value);
      setupSelectButton()
    };

  return (
      <>
    <Sidebar></Sidebar>
      
      <div class="datepicker-container">
<h2 class="datepicker">Pick up a Date</h2>
<input type="date" id="date" min="2023-07-16" max="2027-07-16"></input>

<input type="button" value="Select" id="selectButton" onClick={handleSelectButton }></input>
{/* <p class="message" id="message">Selected */}
{selectedDate && <p className="message" id="message">Selected: {selectedDate}
<p> Your date has been generated. </p>

</p>}
</div>

      </>

);
};

export default Team;