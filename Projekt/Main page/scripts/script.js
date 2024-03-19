let selectedUserId = null;
let selectedDate = null; // Variable to store the selected date

// Reach the elements only after the document is loaded
document.addEventListener("DOMContentLoaded", async function() {
  //Load all users
  users = await renderAllUsers();

  // Fetches all user data from the API
  async function renderAllUsers() {
    try {
      // Fetch the data
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
  
      // Select the select element
      const select = document.getElementById('select-employee');
  
      // Loop over the data
      if (data?.length){

        for (let item of data) {
            // Create a new option element
            const option = document.createElement('option');
    
            // Set the value and innerText of the option
            option.value = item.id; 
            option.innerText = "Employee" + " " + item.id; 
    
            // Append the option to the select
            select.appendChild(option);
        }
    }  
    return data; 
}  
      catch (error) {
        console.error('Error:', error);
      }
  }

    // Add event listener to the select element
    const select = document.getElementById('select-employee');
    select.addEventListener('change', function handleSelectButton(){

        // Clear the preloaded user-data-container
        const container = document.getElementById('user-data-container');
        container.innerHTML = '';
        
        // Find the selected user
        const selectedUser = users.find(user => user.id === parseInt(this.value));

        // Update the selectedUserId
        selectedUserId = parseInt(this.value);

        // Display the selected user info

        if(selectedUser){
            showUserDataContainer(selectedUser);
        }
    })

    // Function to add PTO form
    try{

      const addPTOForm = document.getElementById("add-pto-form");

      addPTOForm.addEventListener("submit", handleaddPtoFormSubmit);

    } catch (e) {
      console.error(e);
    }

});


async function showUserDataContainer(user) {
  try {
    // Select the user-data-container
    const container = document.getElementById('user-data-container');
    container.classList.add('valid');


    // Create a new div element
    const div = document.createElement('div');

    // Set the id of the div
    div.setAttribute('id', 'user-info-container');

    // Create the Username label and set its text to the user's username
    const usernameLabel = document.createElement('label');
    usernameLabel.setAttribute('for', 'username');
    usernameLabel.innerText = 'Username: ' + user.username;
    
    div.appendChild(usernameLabel);
    
    // Create the ID label and set its text to the user's id

    const idLabel = document.createElement('label');
    idLabel.setAttribute('for', 'id');
    idLabel.innerText = 'Id: ' + user.id;

    div.appendChild(idLabel);

    // Create the Name label and set its text to the user's name

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.innerText = 'Name: ' + user.name;

    div.appendChild(nameLabel);

    // Create the Email label and set its text to the user's email

    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.innerText = 'Email: ' + user.email;

    div.appendChild(emailLabel);

    //Create the phone label to the container etc

    const phoneLabel = document.createElement('label'); 
    phoneLabel.setAttribute('for', 'phone');
    phoneLabel.innerText = 'Phone: ' + user.phone;

    div.appendChild(phoneLabel);

    // Create the website label etc

    const websiteLabel = document.createElement('label');
    websiteLabel.setAttribute('for', 'website');
    websiteLabel.innerText = 'Website: ' + user.website;

    div.appendChild(websiteLabel);

    // Append the user-info div to the container
    container.appendChild(div);

    // Get the stored PTO data
    const storedPTOData = localStorage.getItem("ptoData");
    if (storedPTOData) {
      const storedPTOList = JSON.parse(storedPTOData);

      // Filter the stored PTO data to only include the PTOs for the selected user
      let userPTOs = storedPTOList.filter(pto => pto.userId === user.id);

      const today = new Date();
      
      // Sort the userPTOs array
      // Logika slaganja radi samo kad se stranica refresha, korištena pomoć YouTubea i kolege kod izrade koda (151 - 165 linije)
      
      userPTOs.sort((a, b) => {
        const aStartDate = new Date(a.startDate);
        const aEndDate = new Date(a.endDate);
        const bStartDate = new Date(b.startDate);
        const bEndDate = new Date(b.endDate);
      
        // Past PTO
        if (aEndDate < today && bEndDate >= today) {
          return -1;
        } else if (bEndDate < today && aEndDate >= today) {
          return 1;
        }        
        // Current PTO
        if (aStartDate <= today && aEndDate >= today && (bEndDate < today || bStartDate > today)) {
          return -1;
      } else if (bStartDate <= today && bEndDate >= today && (aEndDate < today || aStartDate > today)) {
        return 1;
      }

      // Upcoming PTOs
      if (aStartDate > today && bStartDate <= today) {
        return 1;
    } else if (bStartDate > today && aStartDate <= today) {
        return -1;
    }

    return 0;
  });

    // Display the user's PTOs
    userPTOs.forEach(pto => {
      const ptoElement = createPTOElement(new Date(pto.startDate), new Date(pto.endDate));
      container.appendChild(ptoElement);
      });
    }
  
  } catch (error) {
    console.error('Error:', error);
  }
  }
function createPTOElement(startDate, endDate){

  const ptoElement = document.createElement("div");
  ptoElement.classList.add("pto");

  const localesOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
  }

  // Define season

  let season = null;
  const year = startDate.getFullYear();

  const springStart = new Date(year, 2, 21); // 21st March
  const summerStart = new Date(year, 5, 21); // 21st June
  const autumnStart = new Date(year, 8, 23); // 23rd September
  const winterStart = new Date(year, 11, 21); // 21st December

  if (startDate >= springStart && startDate < summerStart) {
    season = "spring";
  }
  else if (startDate >= summerStart && startDate < autumnStart) {
    season = "summer";
  }
  else if (startDate >= autumnStart && startDate < winterStart) {
    season = "autumn";
  }
  // htio sam ubaciti neku generic sliku za neodređena godišnja doba (datumi koji se protežu u dva godišnja doba), ali nisam uspio
  else {
    season = "winter";
  }
  ptoElement.classList.add(season);

  // PTO section
  const today = new Date();

  let title = "PTO Request";

  if (startDate < today && endDate > today) {
    title = "Current PTO";
  }
  else if (endDate < today){
    title = "Past PTO";
  }
  else if (startDate > today){
    title = "Upcoming PTO";
  }

  ptoElement.innerHTML = `
  <h3>${title}</h3>
  <div class = "pto-request-info">
  <i class="fa fa-times x-icon"></i>
      <div class="pto-info">
      <label>Start date: </label>
      <label class ="content">${startDate.toLocaleDateString("hr-HR", localesOptions)}</label>
      </div>
      <div class="pto-info">
      <label>End date: </label>
      <label class ="content">${endDate.toLocaleDateString("hr-HR", localesOptions)}</label>
      </div>
    </div>`

// Adding addeventlistener to xicon
const xIcon = ptoElement.querySelector('.x-icon');
xIcon.addEventListener('click', function() {
  // Remove the PTO element
  ptoElement.remove();

  // Remove the PTO from the local storage   // Youtube i kolega pomogli ovu manju funkciju napraviti
  const ptoData = JSON.parse(localStorage.getItem('ptoData'));
  const updatedPtoData = ptoData.filter(pto => {
      // Convert dates to strings for comparison because === comparison for Date objects in JavaScript compares the references, not the actual dates
      const ptoStartDate = new Date(pto.startDate).toISOString();
      const ptoEndDate = new Date(pto.endDate).toISOString();
      const elementStartDate = new Date(startDate).toISOString();
      const elementEndDate = new Date(endDate).toISOString();
      const userId = selectedUserId;

      // This return only users that are not the same as the one we want to remove
      return !(pto.userId === userId && ptoStartDate === elementStartDate && ptoEndDate === elementEndDate);

  });
  // Update the local storage
  localStorage.setItem('ptoData', JSON.stringify(updatedPtoData));
});

    return ptoElement;
}

function handleaddPtoFormSubmit(event){

  // prevents default behaviour of the event
  event.preventDefault();


  const startDateInput = event.target.elements["start-date-input"].value;
  const endDateInput = event.target.elements["end-date-input"].value;

  if (!startDateInput || !endDateInput) {
    alert("Missing start or end date");
    return;
  }

  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

if(startDate > endDate){
    alert("Start date must be before end date");
    return;
}

const pto = createPTOElement(startDate, endDate);

if(!pto){
    return;
  }
  const localeStoragePTOData = localStorage.getItem("ptoData");

  const localStoragePTOList = localeStoragePTOData ? JSON.parse(localeStoragePTOData) : [];

 
  const newPTOData = {
    userId: selectedUserId,
    startDate: startDate.toDateString(),
    endDate: endDate.toISOString()
  }

  localStoragePTOList.push(newPTOData);

  const updatedLocalStorageData= JSON.stringify(localStoragePTOList);

  localStorage.setItem("ptoData",updatedLocalStorageData);

  const ptoListContainer = document.getElementById("user-data-container");
	// Create a new div element
  const div = document.createElement('div');
  
  // Set the id of the div
  div.setAttribute('id', 'user-info-container');

  ptoListContainer.appendChild(pto);;


  event.target.reset();
}
// Sign out button, clearing cookies
document.getElementById('sign-out').addEventListener("click", function(e){

  // Prevent the default action of the link
  e.preventDefault();

  // Clear all cookies
  document.cookie.split(";").forEach(function(c) {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });

  // Redirect to the login page // ovo je dodano naknadno, nakom što sam završio pisanje većine koda, misleći da će mi Sign out biti link, na kraju nije trebao biti, ali sam ga ostavio
  window.location.href = "../Log-in/index.html";
});