
// --------NAVBAR-------


let humburger = document.getElementById("humburger");

let buttonsDiv = document.querySelector(".buttons")
buttonsDiv && buttonsDiv.classList.add("menuShow")


humburger && humburger.addEventListener("click",()=>{
    buttonsDiv && buttonsDiv.classList.toggle("menuShow")
})

// --------FireBase Initilization-------


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
  import {getFirestore, collection, query, onSnapshot  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBG6dpOuudCACT3D5sNKXFkji11V5s5vXE",
    authDomain: "askblog.firebaseapp.com",
    projectId: "askblog",
    storageBucket: "askblog.appspot.com",
    messagingSenderId: "675391511869",
    appId: "1:675391511869:web:0eb4743628be837adab954",
    measurementId: "G-E9FE0DGGEX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);


// --------GET ELEMENTS-------

  let writeBtn = document.getElementById("writeBtn");
  let loginBtn = document.getElementById("loginBtn");
  let currentPage = window.location.pathname.split('/').pop();


const checkLogin =(e)=>{
  e.preventDefault();
  onAuthStateChanged(auth, (user) => {
    if (user) {
     
      const uid = user.uid;
      if(currentPage !== "createpost.html"){
        window.location.href="createpost.html"
      }
      
      
      // ...
    } else {
      // User is signed out
      // ...
      window.location.href="login.html";
      console.log("failed")
    }

    
  });
}

writeBtn && writeBtn.addEventListener("click",checkLogin)


// let user ;

const checkLogin2 =()=>{

  onAuthStateChanged(auth, (user) => {
    if (user) {
     
      const uid = user.uid;
   
    //  user = auth.currentUser;
    console.log(auth.currentUser)
      // ...
    } else {
      // User is signed out
      // ...
    
    }

    
  });
}

checkLogin2()












const blogHead = document.getElementById("postHead");

let months = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Nov","Dec"]
let maxLengh =100;
const truncateText =(text, maxLengh)=>{
  if (text.length <= 100) {
    return text;
}
return text.slice(0, 100) + "...";
}



const loadBlog =()=>{
  const q = query(collection(db, "Blogs"), );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const Blogs = querySnapshot.docs.map( (docs)=>{
    let blogEl = docs.data()
    
    let date= new Date(blogEl.date);
   
    let day = date.getDate();
   
    let month = months[date.getMonth()];
  
    let years = date.getFullYear();
    
    const formattedTime = `${day}-${month}-${years}`;
   

    const truncatedDescription = truncateText(blogEl.description, 100)

   

return  `
<div class="post">
            <div class="right">
                <h1>${blogEl.title}</h1>
             
                <p id="description-${docs.id}">${truncatedDescription}</p>
                 <button  class="read-more onclick="expandText('${docs.id}')">Read More</button>
                    <div class="detail">
                        <p>${blogEl.userName}</p>
                        <p>${formattedTime}</p>
                    </div>
            </div> 
            <div class="left" style= "background-image: url(${blogEl.imageUrl}) "><a href=${blogEl.imageUrl}></a></div>
        </div>`

  } ).join("");

 blogHead.innerHTML = Blogs;

  
  });
}
loadBlog()









