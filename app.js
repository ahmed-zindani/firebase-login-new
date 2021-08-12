// console.log(firebase)

let register =()=>{
    let email =document.getElementById('email');
    let password = document.getElementById('pass');
    let fname = document.getElementById('name');
    let phoneNum = document.getElementById('phoneNum');

    let data = {
      Name : fname.value,
      number : phoneNum.value,
      email : email.value,
      password : password.value
    }




    // let id = firease.database().ref(`users`).push().key;
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      firebase.database().ref(`users/${res.user.uid}`).set(data)
      // let sucessAlert =document.getElementById('success-alert');
      // sucessAlert.innerHTML = "YOU SUBSCRIBE SUCCESFULLY"
      // sucessAlert.style.display = "block"
      // email.value = "";
      // password.value = "";
      // number.value="";
      // name.value = "";


      // errorAlert.style.display="none"
.then(()=>{
  setTimeout(() => {
    window.location.href = "login.html"
      
 },1000);

//  })
//     setTimeout(() => {
//       window.location.href = "login.html"
        
//    },1000);
    })
    .catch((error) => {
       let errorAlert =document.getElementById("error");
       errorAlert.innerHTML = "ERROR" + error.message
       errorAlert.style.display="block"
      
      var errorCode = error.code;
      var errorMessage = error.message;
     console.log('error=>',errorMessage)
    });
})
};

let login =()=>{
  let email =document.getElementById('email');
  let password = document.getElementById('password');
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    localStorage.setItem(`uid`,userCredential.user.uid)
    var user = userCredential.user.uid;
     firebase.database().ref(`users/${user.uid}`)
     .once('value',(data)=>{
     console.log(data.val())
      setTimeout(() => {
        window.location = "index.html"
          
      },500);
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message)
  });

}


// firebase.database().ref(`users/${user.uid}`)
// .once('value',(data)=>{
//   console.log(data.val())
// //   setTimeout(() => {
// //     window.location = "index.html"
      
// //  },500);
// })



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    
  
    var uid = user.uid;
    
firebase.database().ref(`users/${uid}`)
.once('value',(data)=>{
  console.log(data.val())
  
 let profileEmail = document.getElementById('profileEmail')
 profileEmail.innerHTML=(data.val().email)

})
    // ...
  } else {
    // User is signed out
    // ...
    console.log("not found")
  }
});

