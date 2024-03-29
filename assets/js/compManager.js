const firebaseConfig = {
  apiKey: "AIzaSyCBMFsTwKFAu_hS6qPtIn-kspzlegCTK98",
  authDomain: "cq-noughts-and-crosses.firebaseapp.com",
  databaseURL: "https://cq-noughts-and-crosses.firebaseio.com",
  projectId: "cq-noughts-and-crosses",
  storageBucket: "cq-noughts-and-crosses.appspot.com",
  messagingSenderId: "894776809536",
  appId: "1:894776809536:web:97ce08e818f698a9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: "https://qbsuo.csb.app/finishSignUp",
  // This must be true.
  handleCodeInApp: true
};

// Confirm the link is a sign-in with email link.
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  var email = window.localStorage.getItem("emailForSignIn");
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt("Please provide your email for confirmation");
  }
  // The client SDK will parse the code from the link for you.
  firebase
    .auth()
    .signInWithEmailLink(email, window.location.href)
    .then(function(result) {
      // Clear email from storage.
      window.localStorage.removeItem("emailForSignIn");
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
      console.log("result", result);
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
      console.log(error);
    });
} else {
  document.getElementById("RyanJEC").addEventListener("click", function() {
    const email = document.getElementById("mrssnowymn").value;
    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function() {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
      });
  });
}
