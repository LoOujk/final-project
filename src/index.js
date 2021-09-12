let i= 1
let apikey = " https://api.themoviedb.org/3/discover/movie?api_key=2f861e523c5bb41914419b2f5acf3e0c&page=" + i
let genres = "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=2f861e523c5bb41914419b2f5acf3e0c"
let film_poster = document.querySelector(".film_poster")
let pagination = document.querySelector(".pagination")
let massVote=[]
let massGenres=''
let displayPoster = ""
let options = document.querySelector(".filter").options
let filter = document.querySelector(".filter")
let ApiForFilm= []
let sessionStor = sessionStorage.setItem('ApiKey', JSON.stringify(ApiForFilm))
let sessionUser= sessionStorage.getItem('checkUser')
let editArr = localStorage.getItem("editFilm")
let logOutButton = document.querySelector(".LogOut")

logOutButton.addEventListener("click",function LogOut(event){
        sessionStorage.clear();
})


function IdtoText(){
    let massGenId = [];
    ApiForFilm.genre_ids.forEach(genresEl =>{
        massGenres.genres.forEach(e =>{
            e.id== genresEl ? massGenId.push(e.name) : e
        })
    })
    return massGenId
}




filter.addEventListener('input',function (event) {
    getDataFromServer()
})

async function getDataFromServer(){
    try {
        let response =  await fetch(apikey)
        let answer =   await response.json()
        massVote = answer
        

        let respGenre = await fetch(genres)
        let ansGenre = await respGenre.json()
        massGenres = ansGenre

        let filmObjInfo = localStorage.getItem('addLocalFilm')
        let checkPage = " https://api.themoviedb.org/3/discover/movie?api_key=2f861e523c5bb41914419b2f5acf3e0c&page=1"
         
        
    
      


        // Get added films on main page
        if  (filmObjInfo  && checkPage == apikey){
            filmObjInfo= JSON.parse(filmObjInfo).reverse()
             
                for(let s = 0;filmObjInfo.length>s;s++){
                        massVote.results[s]=filmObjInfo[s]
                        // massVote.results[s].vote_average = Number (massVote.results[s].vote_average)
                       
                }
        }
        // editFilmDisplay
        function displayEditFilm(){
            let editArrJS = JSON.parse(editArr)
            if(editArr){
                for(let q=0;massVote.results.length>q;q++){
                    for( let w=0;editArrJS.length>w;w++){
                        if(massVote.results[q].id==editArrJS[w].id){
                            editArrJS[w].vote_average=Number(editArrJS[w].vote_average) 
                            massVote.results[q]=editArrJS[w]
                            
                        }
                    }
                }
            }
           }
           displayEditFilm()
        
         
        function  arraySort(massiveSort){
                let keySort = ""
               
                if(filter.selectedIndex == 3||filter.selectedIndex==4){
                    keySort = "release_date"
                    console.log("DATA")
                    for(let z =0; massiveSort.results.length>z;z++){
                        if(massiveSort.results[z][keySort]==undefined){
                            massiveSort.results[z][keySort]="1000-01-01"
                        }
                        let temp=0;
                            for(let i = massiveSort.results.length-1;i>0;i--){           
                                for(let x=0;x<i;x++){
                                     if(Date.parse(massiveSort.results[x][keySort])>Date.parse(massiveSort.results[x+1][keySort])){
                                        temp=massiveSort.results[x];
                                        massiveSort.results[x]=massiveSort.results[x+1];
                                        massiveSort.results[x+1]=temp;   
                                       
                                    }
                                }
                            }
                     }
                }
                if(filter.selectedIndex==1||filter.selectedIndex==2){
                     keySort = "vote_average"
                     console.log("VOTE AVERAGE")
                     let temp=0;
                     for(let i = massiveSort.results.length-1;i>0;i--){           
                        for(let x=0;x<i;x++){
                             if(massiveSort.results[x][keySort]>massiveSort.results[x+1][keySort]){
                                temp=massiveSort.results[x];
                                massiveSort.results[x]=massiveSort.results[x+1];
                                massiveSort.results[x+1]=temp;   
                               
                            }
                        }
                    }
                 }

                return massiveSort
         }
            if(filter.selectedIndex == 0){
                displayPoster = ""
               
            }
            if(filter.selectedIndex == 1){
                displayPoster = ""
                arraySort(massVote)
                massVote.results = massVote.results.reverse()
            }

            if(filter.selectedIndex == 2){
                displayPoster = ""
                arraySort(massVote) 
            }
            if(filter.selectedIndex == 3){
                displayPoster = ""
                arraySort(massVote)
                massVote.results = massVote.results.reverse()
            }
            if(filter.selectedIndex == 4){
                displayPoster = ""
                arraySort(massVote)
            }
           
            
       
           
            
           let   deleteMassive =localStorage.getItem('deleteMassive')
           let duplicateDeleteMAss = []
       
         
          

         

           if (deleteMassive){
               deleteMassive=JSON.parse(deleteMassive)
            
               
               for(let x=0; massVote.results.length>x;x++){
                   let isId = "false"
                   
                   for(let i=0; deleteMassive.length>i;i++){
                       if( massVote.results[x].id==deleteMassive[i]){
                           isId = "true"            
                        
                        }
                    }
                  
                    if( isId == "false"){
                        duplicateDeleteMAss.push( massVote.results[x])
                    } 
                }
              
            }   
            let displayFilms =""
            if(deleteMassive){
                 displayFilms = duplicateDeleteMAss
                 console.log( "deleteMassive IS DISPLAYED")
            } 
            else{
                 displayFilms = massVote.results
            }
                
    displayFilms.forEach (item =>{ 
    // genres
    let massGenId= []
    item.genre_ids.forEach(genresEl =>{
        massGenres.genres.forEach(e =>{
        e.id== genresEl ? massGenId.push(" "+ e.name) : e                    
        })
    })
      

    displayPoster +=`
        <div  ${item.id} class="film"  onmouseover = "mouseoverF(this)" onmouseout = "mouseoutF(this)" >
            <img onclick = "clickPoster(this)" id=${item.id} src="https://image.tmdb.org/t/p/w500${item.backdrop_path}"   alt="None poster"> 
            <p>${item.original_title}</p>
            <div class="someInfo" >
                <p>Vote average: ${item.vote_average}</p>
                <p>Release date: ${item.release_date}</p> 
                <p>Genres: ${massGenId}</p>               
            </div>  
            <div class="delDiv"> 
                <img id=${item.id} onclick = "clickDel(this)" src="img/del.png" class="delIcon">
            </div>    
        </div>
                    
    `
                     
})
            
                
film_poster.innerHTML = displayPoster  
    } catch (error) {
        console.log(error)
    }

            // admin is online
           
            let deleteIcon = document.querySelectorAll(".delDiv")
            if (sessionUser){  
                document.querySelector(".sign_button").style.display = "none"
                document.querySelector(".LogOut").style.display = "block"

            }
            if (sessionUser === "Admin" ){  
                deleteIcon.forEach(e => e.style.visibility = "visible");
            



                // add button
                let addFilm = document.querySelector(".addFilm")
                let addFilmForm = document.querySelector(".addFilmForm")
                let formForAddFilms =""
                addFilm.style.visibility = "visible"
                // https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=2f861e523c5bb41914419b2f5acf3e0c
                addFilm.addEventListener("click", function(){
                    addFilm.style.visibility = "hidden"
                    pagination.innerHTML= ""
                    film_poster.innerHTML=""  

                    

                    formForAddFilms +=`
                    <div   class="filmForms"  >
                        <input id="inputTitle" class='filmTitle' placeholder='Title' type='text' minlength="5" >
                        <span id="spanTitle">Required field, min 3 symbols</span>

                        <input id="inputOverview" class='filmOverview' placeholder='Overview' type='text'>
                        <span id="spanOverview">Required field, min 6 symbols, max 150 symbols</span>

                        <input id="inputPoster" class='filmPoster' placeholder='Poster path' type='text'>
                        <span id="spanPoster">Required field</span>

                        <input id="inputPopularity" class='filmPopularity' placeholder='Popularity' type='number'>
                        <span id="spanPopularity">Required field</span>

                        <input id="inputRealise" class='filmRelease' placeholder='Release date'  type="date"   min="1850-01-01" max="2030-12-31">
                        <span id="spanPopularity">Required field</span>

                        <select class="genres">
                            <option label="Genres">Genres</option>
                        </select>
                        <span id="spanGenres">Required field</span>

                        <input id="inputVoteAv" class='filmVoteAv' placeholder='Vote average' type='number'>
                        <span id="spanVoteAv">Required field, min 6 symbols</span>

                        <input id="inputVoteCo" class='filmVoteCo' placeholder='Vote count' type='number'>
                        <span id="spanVoteCo">Required field, min 6 symbols</span>

                        <input  class='filmId' placeholder='Film ID' type='number'>
                        <span id="spanId">Required field</span>

                        <input id="inputNoOrigTitle" class='filmNoOrigTitle' placeholder='Title' type='text' minlength="5" >
                        <span id="spanNoOrigTitle">Required field, min 3 symbols</span>

                        <div class="addClearButtons">
                            <button class="addButtonFilm">Add</button>
                            <button class="clearForm">Clear</button>
                        </div>
                    
                   
                    </div>
                    
                    `
                    
                 

                    addFilmForm.innerHTML=formForAddFilms

                    let input_title = document.querySelector(".filmTitle")
                    let input_overview = document.querySelector(".filmOverview")
                    let input_poster = document.querySelector(".filmPoster")
                    let input_filmPopularity = document.querySelector(".filmPopularity")
                    let input_release_date = document.querySelector(".filmRelease")
                    let input_voteAv = document.querySelector(".filmVoteAv")
                    let input_voteCo = document.querySelector(".filmVoteCo")
                    let input_id = document.querySelector(".filmId")
                    let input_filmNoOrigTitle =document.querySelector(".filmNoOrigTitle") 

                    let allInputs = document.querySelectorAll("input")
                    let span = document.querySelectorAll("span")
                    let addButtonFilm = document.querySelector(".addButtonFilm")
                    let clearForm = document.querySelector(".clearForm")
                    let filmObjInfo = localStorage.getItem('addLocalFilm')
                  

                    console.log(span)

               
        
                    let input_genres =  document.querySelector(".genres")  
                    let SelOptions =  document.querySelector(".genres").options 
                   

                    function genOpt(){
                        massGenres.genres.forEach(e =>{
                            let valueSelect = document.createElement('option')  
                            valueSelect.className = "selectOpt";
                            valueSelect.innerHTML = `${e.name}`                 
                            input_genres.appendChild(valueSelect)
                        })
                    }
                    genOpt()


                 
                    
                    let massGen = []
                    input_genres.addEventListener('change',function addGen(event){
                        if(SelOptions[SelOptions.selectedIndex]==SelOptions[0]){
                            
                        }
                        else{
                            SelOptions[SelOptions.selectedIndex].style.display="none"
                            // massGen.push(SelOptions[SelOptions.selectedIndex].innerText)
                            massGenres.genres.forEach(e=>{
                                if(e.name==SelOptions[SelOptions.selectedIndex].innerText){
                                    massGen.push(e.id)
                                }
                            })       
                            console.log(massGen)
                        }
                    })
                
                    
                    clearForm.addEventListener('click',function clearInputsForm(event){
                        allInputs.forEach(e=>e.value="")
                        document.querySelectorAll(".selectOpt").forEach(e=>{
                            e.style.display="block"
                        })
                    })
                    // document.addEventListener('click',e => console.log(e.target))
                
                    addButtonFilm.addEventListener('click', function addFilmFunction(event){    
                        event.preventDefault();     
                        
                        let filmInfo = {
                                original_title: input_title.value,
                                overview:input_overview.value,
                                backdrop_path: input_poster.value,
                                popularity: input_filmPopularity.value,
                                genre_ids:massGen,
                                release_date: input_release_date.value,
                                vote_average: input_voteAv.value,
                                vote_count: input_voteCo.value,
                                id: input_id.value,
                                title: input_filmNoOrigTitle.value
                              
                    
                        }
                      
                        function lengthValid(){
                            allInputs.forEach( (e,index)=>{
                                if(e.value.length<1){
                                    span[index].style.visibility = "visible";
                                    
                                    
                                }
                                else{
                                            span[index].style.visibility = "hidden";
                                          
                                }
                            })   
                        }
                        lengthValid()
                        function step2Valid(){
                            if(input_title.value.length<3){
                                span[0].style.visibility = "visible";               
                               
                            }
                            else{
                                span[0].style.visibility = "hidden";
                              
                            }
    
                            if(input_overview.value.length<6 || input_overview.value.length>150){
                                span[1].style.visibility = "visible";
                               
                            }
                            else{
                                span[1].style.visibility = "hidden";
                               
                            }
                            if(massGen.length>0){
                                span[5].style.visibility = "hidden";
                            }
                            else{
                                span[5].style.visibility = "visible";
                            }
    
                            if(input_voteAv.value.length>0){
                                span[6].style.visibility = "hidden";
                            }
                            else{
                                span[6].style.visibility = "visible";
                            }
    
                            if(input_voteCo.value.length>0){
                                span[7].style.visibility = "hidden";
                            }
                            else{
                                span[7].style.visibility = "visible";
                            }
                            if(input_id.value.length>0){
                                span[8].style.visibility = "hidden";
                            }
                            else{
                                span[8].style.visibility = "visible";
                            }
                            if(input_filmNoOrigTitle.value.length>2){
                                span[9].style.visibility = "hidden";
                            }
                            else{
                                span[9].style.visibility = "visible";
                            }
    
                        }
                        step2Valid()
                        let spanArray= Array.from(span)
                     
     
                        if (!spanArray.find(e =>e.style.visibility == "visible")){
                            // строка ниже ?
                             filmObjInfo=localStorage.getItem("addLocalFilm")
                            if (filmObjInfo){
                                filmObjInfo=JSON.parse(filmObjInfo)
                                filmObjInfo.push(filmInfo)
                                massGen = []
                                //вопросы, html collection vs nodeList что есть что,как с ними работать?
                                   // SelOptions.forEach(e=>{
                                //     e.remove()
                                // })
                               
                                localStorage.setItem("addLocalFilm" ,JSON.stringify( filmObjInfo))
                            
                            }
                            else{ 
                                filmObjInfo = []
                                filmObjInfo.push(filmInfo)
                                massGen = []
                                localStorage.setItem("addLocalFilm" ,JSON.stringify( filmObjInfo))
                            }
                        }
                        else{
                           console.log("Field")
                        }
   
                    })
                 
                });

            }     
}
    getDataFromServer()
    

    function clickDel(e){
       
      
        const   deleteMassive = localStorage.getItem('deleteMassive')
        console.log(e)
            // if( deleteMassive && massVote.results.find(result => result.id == e.id)){
            //     let parseDelMass =  JSON.parse(deleteMassive)
            //     parseDelMass.push(e.id)
            //     localStorage.setItem("deleteMassive" ,JSON.stringify(parseDelMass))
            //     console.log(" if work")
    
            // }
            // else if(massVote.results.find(result => result.id == e.id)){
            //     localStorage.setItem("deleteMassive" ,JSON.stringify([e.id]) )
            //     console.log(" if  2 work")
            // }

            if( deleteMassive ){
                let parseDelMass =  JSON.parse(deleteMassive)
                parseDelMass.push(e.id)
                localStorage.setItem("deleteMassive" ,JSON.stringify(parseDelMass))
               
    
            }
            else {
                localStorage.setItem("deleteMassive" ,JSON.stringify([e.id]) )
               
            }
            getDataFromServer()
    }




    let genSplice = []

    function deleteSpan(e){
        e.style.display = "none"
        // let newelem ={

        // }
        
        function TextToId(){
            let newelem ={
            }
            massGenres.genres.forEach(elem=>{         
                if(elem.name==e.innerText){
                   newelem= {
                       id: elem.id,
                       name: elem.name
                   }
                //    elem.id
                }
            })
            return newelem
        }
      
        let newelem = TextToId();
        let indexForDel = -1;
        ApiForFilm.genre_ids.find( (elem,index)=>{
            if(elem==newelem.id){
                indexForDel = index;         
            }
        })
        if(indexForDel!=-1){
            ApiForFilm.genre_ids.splice(indexForDel,1)
        } 
        let filterArray = massGenres.genres.filter(gener => !ApiForFilm.genre_ids.find(genre_id =>genre_id === gener.id))        
        let edit_genres =  document.querySelector(".editGenres")  
        edit_genres.innerHTML= ' <option label="Genres">Genres</option>'

        filterArray.forEach(elm =>{
            let valueSelect = document.createElement('option')  
            valueSelect.className = "selectOpt";
            valueSelect.innerHTML = `${elm.name}`                 
            edit_genres.appendChild(valueSelect)
        })


    }

    function editFilm(e){ 
        console.log( "ApiForFIlm",ApiForFilm)
        let arrayGenres =  massGenres.genres.slice()

        let massGenId= IdtoText()
        // console.log(massGenId)  
     
            displayPoster =""
            displayPoster +=`                
                    <div   class="editFilm"  >
                        <span class = "labelInputs" id="">Original title</span>
                        <input id="editTitle" class='filmTitle' value='${ApiForFilm.original_title}' type='text' minlength="5"></label>
                        <span id="editspanTitle" class = "infoSpan">Required field, min 3 symbols</span>

                        <span  class = "labelInputs" id="">Overview</span>
                        <textarea id="editOverview" class='filmOverview' ' type='text' >${ApiForFilm.overview}</textarea>
                        <span id="editspanOverview" class = "infoSpan">Required field, min 6 symbols, max 150 symbols</span>
                       
                        <span  class = "labelInputs"id="">Poster path</span>
                        <input id="editPoster" class='filmPoster' value='${ApiForFilm.backdrop_path}' type='text'>
                        <span id="editspanPoster" class = "infoSpan">Required field,min 3 symbols</span>

                        <span class = "labelInputs" id="">Popularity</span>
                        <input id="editPopularity" class='filmPopularity' value='${ApiForFilm.popularity}' type='number'>
                        <span id="editspanPopularity" class = "infoSpan">Required field</span>

                        <span class = "labelInputs" id="">Release date</span>
                        <input id="editRealise" class='filmRelease' value='${ApiForFilm.release_date}' type="date"   min="1850-01-01" max="2030-12-31">
                        <span id="editspanRelease" class = "infoSpan">Required field</span>
                        
                        <div class="generGen">
                        
                        </div>
                      
                        <select class="editGenres">
                            <option label="Genres">Genres</option>
                        </select>   
                        <span id="editspanGenres" class = "infoSpan">Required field</span>

                        <span class = "labelInputs" id="">Vote Average</span>
                        <input id="editVoteAv" class='filmVoteAv' value='${ApiForFilm.vote_average}'type='number' >
                        <span id="editspanVoteAv" class = "infoSpan">Required field</span>

                        <span  class = "labelInputs" id="">Vote count</span>
                        <input id="editVoteCo" class='filmVoteCo' value='${ApiForFilm.vote_count}'type='number' >
                        <span id="editspanVoteCo" class = "infoSpan">Required field</span>

                        <span class = "labelInputs" id="">Title</span>
                        <input id="editScnTitle" class='filmScnTitle' value='${ApiForFilm.title}' type='text' minlength="5"></label>
                        <span id="editspanScnTitle" class = "infoSpan">Required field, min 3 symbols</span>

                        <div class="addClearButtons">
                            <button class="SaveButtonFilm">Save</button>
                            <button class="clearFormEdit">Clear</button>
                        </div>
                        
                    </div>

            `
        
        film_poster.innerHTML = displayPoster  
        let input_title = document.querySelector(".filmTitle")
        let input_overview = document.querySelector(".filmOverview")
        let input_poster = document.querySelector(".filmPoster")
        let input_filmPopularity = document.querySelector(".filmPopularity")
        let input_release_date = document.querySelector(".filmRelease")
        let input_voteAv = document.querySelector(".filmVoteAv")
        let input_voteCo = document.querySelector(".filmVoteCo")
        let input_filmScnTitle = document.querySelector(".filmScnTitle")
        
        let infSpan = document.querySelectorAll(".infoSpan")
        let SaveButtonFilm = document.querySelector(".SaveButtonFilm")
        let clearForm = document.querySelector(".clearFormEdit")
          
        let generGen = document.querySelector(".generGen")
        let edit_genres =  document.querySelector(".editGenres")  
        let SelOptions =  document.querySelector(".editGenres").options 
       

        function generationGenres(massGenId){
            let spans = ''
            massGenId.forEach( element => {
            spans += `<span  onclick = "deleteSpan(this)" classname = "genSpan" >${element}</span>`
            });
            generGen.innerHTML = spans;
        }
        generationGenres(massGenId)
        
      
        
        

        function checkGenres(){
            console.log( massGenId)
            massGenId.forEach(e=>{
                arrayGenres.forEach( (elem,index)=>{
                    if(e==elem.name){
                        arrayGenres.splice(index,1)    
                    }
                })

            })
            genSplice = arrayGenres
        }
        checkGenres()
       
        function genOpt(){
            console.log( arrayGenres)
            arrayGenres.forEach(e =>{
                let valueSelect = document.createElement('option')  
                valueSelect.className = "selectOpt";
                valueSelect.innerHTML = `${e.name}`                 
                edit_genres.appendChild(valueSelect)
            })
        }
        genOpt()

      
        // let massGen = []
        
        edit_genres.addEventListener('change',function addGen(event){
            if(SelOptions[SelOptions.selectedIndex]==SelOptions[0]){
                
            }
            else{
                SelOptions[SelOptions.selectedIndex].style.display="none"    
                
                arrayGenres.forEach(e=>{
                    if(e.name==SelOptions[SelOptions.selectedIndex].innerText){
                        // massGen.push(e.id)
                            ApiForFilm.genre_ids.push(e.id)
                            massGenId= []
                            let massiveSpans  = IdtoText()
                            generationGenres(massiveSpans)
                            
                        }
                    })       
                }
                SelOptions[SelOptions.selectedIndex].remove()
            })

        SaveButtonFilm.addEventListener('click', function SaveFilmFunction(event){    
            event.preventDefault();     
            
            let filmInfo = {
                title:input_filmScnTitle.value, 
                original_title: input_title.value,
                overview:input_overview.value,
                backdrop_path: input_poster.value,
                popularity: input_filmPopularity.value,
                genre_ids: ApiForFilm.genre_ids,
                release_date: input_release_date.value,
                vote_average: input_voteAv.value,
                vote_count: input_voteCo.value,
                id: ApiForFilm.id
            }
            
            function lengthValid(){
                if(input_title.value.length>=3){
                    infSpan[0].style.visibility = "hidden"  
                }
                else{
                    infSpan[0].style.visibility = "visible";    
                }
                if(input_overview.value.length>=6){
                    infSpan[1].style.visibility = "hidden"                  
                }
                else{
                    infSpan[1].style.visibility = "visible";     
                }
                if(input_poster.value.length>=3){
                    infSpan[2].style.visibility = "hidden"      
                }
                else{
                    infSpan[2].style.visibility = "visible";     
                }
                if(input_filmPopularity.value.length>1){
                    infSpan[3].style.visibility = "hidden"                  
                }
                else{
                    infSpan[3].style.visibility = "visible";     
                }
                if(input_release_date.value.substring(0,4)<1850 || input_release_date.value.length<10){
                    infSpan[4].innerText = "Incorrect data format"
                    infSpan[4].style.visibility = "visible";    
                }
                else{
                    infSpan[4].style.visibility = "hidden";     
                }
               
                if(ApiForFilm.genre_ids.length>0){
                    infSpan[5].style.visibility = "hidden";
                }
                else{ 
                    infSpan[5].style.visibility = "visible";
                }
                if(input_voteAv.value.length>=1){
                    infSpan[6].style.visibility = "hidden"  
                }
                else{
                    infSpan[6].style.visibility = "visible";    
                }
                if(input_voteCo.value.length>=1){
                    infSpan[7].style.visibility = "hidden"  
                }
                else{
                    infSpan[7].style.visibility = "visible";    
                }
                if(input_filmScnTitle.value.length>=3){
                    infSpan[8].style.visibility = "hidden"  
                }
                else{
                    infSpan[8].style.visibility = "visible";    
                }


            }
            lengthValid()
            clearForm.addEventListener('click',function clearInputsForm(event){
                allInputs.forEach(e=>e.value="")
                document.querySelectorAll(".selectOpt").forEach(e=>{
                    e.style.display="block"
                })
            })

            let InfspanArray= Array.from(infSpan)
            if (!InfspanArray.find(e =>e.style.visibility == "visible")){
                    editArr = localStorage.getItem("editFilm")
                    if(editArr){
                        editArr = JSON.parse(editArr)
                        editArr.push(filmInfo)
                        localStorage.setItem("editFilm" ,JSON.stringify( editArr ))
                        
                    }
                    else{
                        editArr = []
                        editArr.push(filmInfo)
                        localStorage.setItem("editFilm" ,JSON.stringify( editArr ))
                       
                    }
            }


        })
        
    }

   
    // отображение одного фильма
    function clickPoster(e){
       

        let sesDiv =""
        for(let z=0;20>z;z++){
            if(massVote.results[z].id==e.id){               
                ApiForFilm=massVote.results[z]
                sessionStor = sessionStorage.setItem('ApiKey', JSON.stringify(ApiForFilm));
            }
        }
        
        displayPoster = ""
        film_poster.innerHTML = displayPoster  

        document.querySelector(".filter").style.display = "none"
        document.querySelector(".pagination").style.display = "none"

        ApiForFilm = JSON.parse(sessionStorage.getItem('ApiKey'))
        
      
        let massGenId= []
        ApiForFilm.genre_ids.forEach(genresEl =>{
            massGenres.genres.forEach(e =>{
                e.id== genresEl ? massGenId.push(" "+ e.name) : e
            })
        })

        

        function displayFilm(){

            displayPoster +=`
                <div class="one_film" >
                    <div class="imgOne">
                        <img class="soloPoster" onclick  id=${ApiForFilm.id} src="https://image.tmdb.org/t/p/w500${ApiForFilm.backdrop_path}"   alt="None poster" >
                        <div class="tools"> 
                            <img id=${ApiForFilm.id} onclick = "clickDel(this)" src="img/del.png" class="DelelteIcon toolsIcon">
                            <img id=${ApiForFilm.id} onclick = "editFilm(this)" src="img/Change.png" class="ChangeIcon toolsIcon">
                            <p>Id: ${ApiForFilm.id}</p> 
                        </div> 
                    </div>
                    <div class="information" >
                        <p>Title: ${ApiForFilm.title}</p>   
                        <p>Original title:${ApiForFilm.original_title}</p>
                        <p>Overview: ${ApiForFilm.overview}</p>
                        <p class = "genresDsplayFilm">Genres : ${massGenId}</p>    
                        <p>Popularity: ${ApiForFilm.popularity}</p>
                        <p>Release date: ${ApiForFilm.release_date}</p>                     
                        <p class = "voteAverForUser">Vote average: ${ApiForFilm.vote_average}</p>
                        <p>Vote count: ${ApiForFilm.vote_count}</p>  
                    </div>               
                </div>
            `
            
            film_poster.innerHTML = displayPoster  
            if (!sessionUser){  
                document.querySelector(".tools").style.display = "none"

            }

            else if(sessionUser=== "Admin"){
                document.querySelector(".tools").style.display = "block"
            }
            else if (sessionUser === "NoAdmin"){
                document.querySelector(".tools").style.display = "none"
                let voteUser = document.querySelector(".voteAverForUser")
                voteUser.innerHTML =  `<p>Vote average:</p>
                                        <input class = "voteAverForUserInput" value='${ApiForFilm.vote_average}' type = "number"> 
                                        <button class="SaveButVote">Save</button>`
                let SaveBut = document.querySelector(".SaveButVote")
                let inputVoteUSer = document.querySelector(".voteAverForUserInput")
                let massId = []
               massGenres.genres.forEach(e=>{
                   massGenId.forEach(elem=>{
                       if(e.name == elem.trim()){
                           massId.push(e.id)   
                       }
                   })
               })
                SaveBut.addEventListener('click',function clearInputsForm(event){
                    if(inputVoteUSer.value.length>=1){
                        let filmInfo = {
                            title:ApiForFilm.title, 
                            original_title:ApiForFilm.original_title,
                            overview:ApiForFilm.overview,
                            backdrop_path: ApiForFilm.backdrop_path,
                            popularity: ApiForFilm.popularity,
                            genre_ids: massId,
                            release_date: ApiForFilm.release_date,
                            vote_average: inputVoteUSer.value,
                            vote_count: ApiForFilm.vote_count,
                            id: ApiForFilm.id
                        }
                       
                        editArr = localStorage.getItem("editFilm")
                        if(editArr){
                            editArr = JSON.parse(editArr)
                            editArr.push(filmInfo)
                            localStorage.setItem("editFilm" ,JSON.stringify( editArr ))
                            
                        }
                        else{
                            editArr = []
                            editArr.push(filmInfo)
                            localStorage.setItem("editFilm" ,JSON.stringify( editArr ))
                           
                        }
                    }

                })
               
            }

        }
        displayFilm()

    }

//   мини доп инфо о фильме
function mouseoverF(event){
           let someInfo =   event.querySelector(".someInfo") 
           someInfo.style.visibility = 'visible'   
}
function mouseoutF(event){   
    let someInfo =   event.querySelector(".someInfo") 
    someInfo.style.visibility = 'hidden'
}


function clickPagitanion(button){
    let NodePagination= document.querySelectorAll(".page-btn")   
    displayPoster = ""
    apikey = " https://api.themoviedb.org/3/discover/movie?api_key=2f861e523c5bb41914419b2f5acf3e0c&page=" + button.innerText
    if(button.id==4 ||button.id==5){
        
        for(let n=0;5>n;n++){
                NodePagination[n].innerText = Number(NodePagination[n].innerText) + 1
            }
    }
   
    if(button.id==1 ||button.id==2){
       
        for(let n=0;5>n;n++){
            if(NodePagination[4].innerText==5){
            }
            else{
                NodePagination[n].innerText = Number(NodePagination[n].innerText) - 1
                
            }   
        }

    } 

    getDataFromServer()
}

// next&prev
function clickNext(nextP){
   let NodePagination= document.querySelectorAll(".page-btn")
 
       for(let n=0;5>n;n++){
               NodePagination[n].innerText = Number(NodePagination[n].innerText) + 5
           }
}
function PreviousP(prevP){
    let NodePagination= document.querySelectorAll(".page-btn")
    
    if(NodePagination[0].innerText <=6 ){
        let i =0;
        for(let n=1;6>n;n++){
            NodePagination[i].innerText = n
            i++
        }
    }
    else {
        for(let n=0;5>n;n++){
            NodePagination[n].innerText = Number(NodePagination[n].innerText) - 5
        }
    }
}


// PAGINATION
let displayPagintionButtons = ""
async function pagination_buttons(){
    
    
    displayPagintionButtons +=`
    <button type="button" class="PrevP" onclick = "PreviousP(this)" ><</button>
    `
    for(i ; 6>i;i++){
       
        displayPagintionButtons +=`
        <button type="button"  id = ${i} onclick = "clickPagitanion(this)" class="page-btn">${i}</button>
        `
    } 
    displayPagintionButtons +=`
    <button type="button" class="NextP" onclick = "clickNext(this)" >></button>
    `
    pagination.innerHTML= displayPagintionButtons
}
 pagination_buttons()

