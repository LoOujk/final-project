
let signIn = document.querySelector(".signIn")
let inputEmail =  document.getElementById("inputEmail")
let inputPassword =  document.getElementById("inputPassword")
let span = document.querySelectorAll("span")
let LStor = JSON.parse(localStorage.getItem('usersJson'))

signIn.addEventListener('click',function authent(event){
    event.preventDefault();  
    
    
    function signValid(){
        if(inputEmail.value.length<=0||inputPassword.value.length<=0){
           

            if(inputEmail.value.length<=0){
                span[0].innerText="Fill the form"
                span[0].style.visibility = "visible";
                inputEmail.className="userDataInvalid"
               
            }
             if(inputPassword.value.length<=0){
                span[1].innerText="Fill the form"
                span[1].style.visibility = "visible";
                inputPassword.className="userDataInvalid"
            }
           
        }
        if(inputEmail.value.length>0||inputPassword.value.length>0){
            if(inputEmail.value.length>0){
                span[0].style.visibility = "hidden";
                inputEmail.className="userData"
                
            }
             if(inputPassword.value.length>0){
                span[1].style.visibility = "hidden";
                inputPassword.className="userData"
            }
        }
      
    } 
    signValid()


    function checkInfo(){
        let x = 0;
        if(!LStor){
            span[0].style.visibility = "visible";
            span[0].innerText="User is not registered"

        }
        else{
            LStor.forEach( (element,index) => {

                if(element.email === inputEmail.value){
                    console.log(index ,element.email )
                    span[0].style.visibility = "hidden";
                    inputEmail.className="userData"
                    x =element[index]
                    if(element.password!==inputPassword.value){
        
                        span[1].innerText="Password is incorrect"
                        span[1].style.visibility = "visible";
                        inputPassword.className="userDataInvalid"
                       
                    }
                    else{
                        
                        console.log(index ,element.password )
                        span[1].style.visibility = "hidden";
                        inputPassword.className="userData"
                        if(element.user==="Admin"){
                          let userInfo="Admin"
                            sessionStorage.setItem('checkUser',(userInfo))
                            location.href = "index.html";
                        }
                        if(element.user==="NoAdmin"){
                            let userInfo=element.user
                            sessionStorage.setItem('checkUser', (userInfo))
                            location.href = "index.html";
                        }
                    }
                    
                }
                
    
                 if(inputEmail.value.length>0 && x!==element[index]){
                    span[0].innerText="This email is not registered"
                    span[0].style.visibility = "visible";
                    inputEmail.className="userDataInvalid"
                }
            
            });
    
        }
        

    }
    checkInfo()

})
