confirm("Data unavailable for guests users. Please sign in to see data!");
// regex validation

const inputs = document.querySelectorAll('input');


const patterns = {
    email:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    //          yourname @ domain   .  com          ( .hr )
    password:/^(?=.*[!@#$%^&*()\-_=+\\|{}[\]:;"'<>,.?\/])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    //                        one special char          one digit lcletter  uc letter  min 8 char         
};

const validate = function validate(field, regex){

    if(regex.test(field.value)){
        field.className = 'valid';        
        return true;
    }
    else{
        field.className = 'invalid';
        return false;         
    }

}

inputs.forEach((input)=>{
    input.addEventListener('keyup', (e) =>{
        validate(e.target, patterns[e.target.attributes.type.value]);
    });
}); 

/*cookie*/
if(validate){
    document.addEventListener("DOMContentLoaded", function() {
        function setCookie(name, value, exdays) {

            const d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires=" +  d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + "; path=/";
    }

// Function to handle form submission

        function handleFormSubmit(event) {

            event.preventDefault(); // Prevent the default form submission
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            setCookie("email", email, 30); // Set email cookie with a 30-day expiry
            setCookie("password", password, 30); // Set password cookie with a 30-day expiry
            if (!email || !password) {
                alert("Please enter both email and password!");
                return;
            }
            window.location.href = "../Main page/index.html"; 
            
    }

//Add event listener to the sign-in button
    document.querySelector('form').addEventListener('submit', handleFormSubmit);
});
}