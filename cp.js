AWSCognito.config.region = 'us-east-1';
AWS.config.region = 'us-east-1';
var poolData = {
    UserPoolId: 'us-east-1_i0cqc5l3m',
    ClientId: '6k7hmqrjnb350n1ctvh6h0kj2o'
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function(){
  var loginButton = $("#bk-submit");
  loginButton.on('click',function(){
    var f = document.getElementsByTagName('form')[0];
    if(!f.checkValidity()) {
      return;
    }

    loginButton.val("Logging in...")
    loginButton.attr('disabled','disabled');
    var tpassword = $(".tpassword").val();
    var newpassword = $(".newpassword").val();
    console.log("Logging in...",tpassword,newpassword);
    var username = getParameterByName('u');
    var authenticationData = {
        Username : username,
        Password : tpassword//'Hhf639#jdj',
    };
    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.info(result);
          window.location.href = '//'+document.location.hostname+'/d/dash.html';
          // loginButton.removeAttr('disabled');
        },
        onFailure: function(err) {
          loginButton.removeAttr('disabled');
          loginButton.val('Login');
          console.error(err);
        },
        newPasswordRequired: function(userAttributes, requiredAttributes) {
          console.log(userAttributes,requiredAttributes);
          cognitoUser.completeNewPasswordChallenge(newpassword, {}, this);
        }
    });
  });
});

localStorage.removeItem('_idToken');
var authuser = userPool.getCurrentUser();
console.log(authuser);
if(authuser != null) {
  var userData = {
      Username : authuser.username,
      Pool : userPool
  };
  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.signOut();
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
     IdentityPoolId: 'us-east-1:84d06c4a-353c-4167-afc4-a87bd27bb83a'
  });
  AWS.config.credentials.clearCachedId();
}
