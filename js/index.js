// index.js

$(document).ready(function() {
  // Fetch authentiation object
  var auth = initCognitoSDK();

  // Add event handlers
  document.getElementById("navbarSignInLink").addEventListener("click", function() {
    navbarSignInLink_OnClick(auth);
  });

  // Fetch cached authentication token if present and sign user in
  var curUrl = window.location.href;
  auth.parseCognitoWebResponse(curUrl);
  if (auth.signInUserSession.accessToken.jwtToken !== "" && auth.signInUserSession.accessToken.jwtToken !== "") {
    auth.getSession();
  }
});

function initCognitoSDK() {
  // Instantiate CognitoAuth object with required data
  var authData = {
    ClientId : '793q7fgp2h388klg49gbkq52d6',
    AppWebDomain : 'auth.travismscott.com',
    TokenScopesArray : ['email'],
    RedirectUriSignIn : 'https://travismscott.com',
    RedirectUriSignOut : 'https://travismscott.com'
  };
  var auth = new AmazonCognitoIdentity.CognitoAuth(authData);

  // Provide callbacks to handle success/failure and return object
  auth.userhandler = {
    onSuccess: function(result) {
      userAuthenitcated(result);
    },
    onFailure: function(err) {
      alert("Error - " + err);
    }
  };
  return auth;
}

function navbarSignInLink_OnClick(auth) {
  // If link text is 'Sign Out', call signOut method on CognitoAuth object and change text to 'Sign In'
  // Otherwise call getSession method on CognitoAuth object to initiate authentication flow
  var state = document.getElementById("navbarSignInLink").innerHTML;
  if (state === "Sign Out") {
    document.getElementById("navbarSignInLink").innerHTML = "Sign In";
    auth.signOut();
  } else {
    auth.getSession();
  }
}

function userAuthenitcated(session) {
  // Update page for authenitcated users
  document.getElementById("navbarSignInLink").innerHTML = "Sign Out";
}