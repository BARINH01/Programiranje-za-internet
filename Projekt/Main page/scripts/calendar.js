// Za izradu kalendara koristio sam se YouToube tutorijalom: https://www.youtube.com/watch?v=6LXqYf_3YfE&t=1s
const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date"); 
const prevNextIcon = document.querySelectorAll(".icons-start span");

// getting new date, current year and month
let date = new Date();
let currYear = date.getFullYear(); 
let currMonth = date.getMonth();

// storing full name of all months in array
const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July",
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
];

const renderCalendar1 = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 0).getDay(); // getting first day of month
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting last day of month
    lastDateofPreviousMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofPreviousMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" data-date="${i}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;

    daysTag.querySelectorAll('li').forEach(day => {
        day.addEventListener('click', function() {
          // Store the selected date in the start-date-input field
          document.querySelector('#start-date-input').value = new Date(currYear, currMonth, parseInt(this.dataset.date));
          if (this.getAttribute('id') === 'selected-start-date') {
            // If the id is already 'selected-start-date', remove it
            this.removeAttribute('id');
          } else {
            // Otherwise, set the id to 'selected-start-date'
            this.setAttribute('id', 'selected-start-date');
          }
        });
      });
}
renderCalendar1();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar1(); // calling renderCalendar function
    });
});

//hide generic browser calendar
const startDateInput = document.querySelector('#start-date-input');
startDateInput.addEventListener('click', () => {
    document.querySelector('.calendar-container-start').style.display = 'block';
    startDateInput.setAttribute('type', 'hidden');
});


// End date calendar, the same thing but for 2nd calendar
let dateEnd = new Date();
let currYearEnd = dateEnd.getFullYear();
let currMonthEnd = dateEnd.getMonth();

const daysTagEnd = document.querySelector(".days-end");
const currentDateEnd = document.querySelector(".current-date-end");
const prevNextIconEnd = document.querySelectorAll(".icons-end span");

const renderCalendarEnd = () => {
    let firstDayofMonth = new Date(currYearEnd, currMonthEnd, 0).getDay();
    let lastDateofMonth = new Date(currYearEnd, currMonthEnd + 1, 0).getDate();
    let lastDayofMonth = new Date(currYearEnd, currMonthEnd, lastDateofMonth).getDay();
    let lastDateofPreviousMonth = new Date(currYearEnd, currMonthEnd, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofPreviousMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === dateEnd.getDate() && currMonthEnd === new Date().getMonth() 
                     && currYearEnd === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" data-date="${i}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDateEnd.innerText = `${months[currMonthEnd]} ${currYearEnd}`;
    daysTagEnd.innerHTML = liTag;

    // Add a click event listener to each day
    daysTagEnd.querySelectorAll('li').forEach(day => {
    day.addEventListener('click', function() {
      // Store the selected end date in the end-date-input field
      document.querySelector('#end-date-input').value = new Date(currYearEnd, currMonthEnd, parseInt(this.dataset.date));
      if (this.getAttribute('id') === 'selected-end-date') {
        // If the id is already 'selected-start-date', remove it
        this.removeAttribute('id');
      } else {
        // Otherwise, set the id to 'selected-start-date'
        this.setAttribute('id', 'selected-end-date');
      }
    });
  });
}
renderCalendarEnd();

prevNextIconEnd.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonthEnd = icon.id === "prev" ? currMonthEnd - 1 : currMonthEnd + 1;

        if(currMonthEnd < 0 || currMonthEnd > 11) {
            dateEnd = new Date(currYearEnd, currMonthEnd, new Date().getDate());
            currYearEnd = dateEnd.getFullYear();
            currMonthEnd = dateEnd.getMonth();
        } else {
            dateEnd = new Date();
        }
        renderCalendarEnd();
    });
});

// hide generic browser calendar
const endDateInput = document.querySelector('#end-date-input');
endDateInput.addEventListener('click', () => {
    document.querySelector('.calendar-container-end').style.display = 'block';
    endDateInput.setAttribute('type', 'hidden');
});