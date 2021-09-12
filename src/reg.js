import users from './dummy_data/users.json'
let inputForm = document.querySelector(".inputForm")
console.log()
let nodeListInputs = inputForm.querySelectorAll("input")
let inputName =  document.getElementById("inputName")
let inputSurName =  document.getElementById("inputSurName")
let inputPassword =  document.getElementById("inputPassword")
let inputConfPassword =  document.getElementById("inputConfPassword")
let inputEmail =  document.getElementById("inputEmail")
let span = document.querySelectorAll("span")
let signUp = document.querySelector(".signUp")


// console.log (users)



let userData = users
console.log(userData)


window.onload = function(){
    if(localStorage.getItem('usersJson')) {
        userData = JSON.parse(localStorage.getItem('usersJson'))
       
    }
    else{
        localStorage.setItem('usersJson',JSON.stringify(users))  
    }
 }

signUp.addEventListener('click', function registration(event){
    event.preventDefault();     
    // почему event,а не sign.up,ведь обращаюсь к кнопке
    let userInfo = {
            user:"NoAdmin",
            login: inputName.value,
            surname:inputSurName.value,
            password: inputPassword.value,
            email: inputEmail.value

    }


    function passValid(){
        if(inputPassword.value!=inputConfPassword.value){
            inputPassword.className="userDataInvalid"
            inputConfPassword.className="userDataInvalid"
            span[2].innerText="Passwords mismatch"
            span[3].innerText="Passwords mismatch"
            span[2].style.visibility = "visible";
            span[3].style.visibility = "visible";
        }
        else if(inputPassword.value==inputConfPassword.value&&inputPassword.value.length>6&&inputConfPassword.value.length>6){
            inputPassword.className="userData"
            inputConfPassword.className="userData"
            span[2].innerText="Required field, min 6 symbols"
            span[3].innerText="Required field, min 6 symbols"
            span[2].style.visibility = "hidden";
            span[3].style.visibility = "hidden";
        }
    }
// console.log(userData)

function lengthValid(){
    nodeListInputs.forEach( (e,index)=>{
        if(e.value.length<6){
            span[index].style.visibility = "visible";
            e.className= "userDataInvalid"
        }
        else{
                    span[index].style.visibility = "hidden";
                    e.className="userData"
        }
    })   
}
    function emailValid(){
        let reg =  /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/;
        if(inputEmail.value.length<6){
            span[4].innerText="Required field, min 6 symbols"
            span[4].style.visibility = "visible";
        }
        else if(reg.test(inputEmail.value)== false){
            span[4].innerText="This is not a mail format"
            span[4].style.visibility = "visible";
            inputEmail.className="userDataInvalid"
        }
        else if(inputEmail.value.length>6&&reg.test(inputEmail.value)== true){
            userData.forEach(e=>{
                if(inputEmail.value==e.email){
                    span[4].innerText="This mail is already use"
                    span[4].style.visibility = "visible";
                    inputEmail.className="userDataInvalid"
                }
            })
        }
        else{
            inputEmail.className="userData"
            span[4].innerText="Required field, min 6 symbols"
            span[4].style.visibility = "hidden";
          
        }
    }
    lengthValid()
    passValid()
    emailValid()

    if(span[0].style.visibility == "hidden"&&span[1].style.visibility == "hidden"&&span[2].style.visibility == "hidden"&&span[3].style.visibility == "hidden"&&span[4].style.visibility == "hidden"){
        userData.push(userInfo)
        
        localStorage.setItem('usersJson',JSON.stringify(userData))  
        sessionStorage.setItem('checkUser', (userInfo.user))
       
        location.href = "index.html";
    }

       
    
    
})



    
