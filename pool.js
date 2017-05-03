AWSCognito.config.region = 'us-east-1';
AWS.config.region = 'us-east-1';
var poolData = {
    UserPoolId: 'us-east-1_i0cqc5l3m',
    ClientId: '6k7hmqrjnb350n1ctvh6h0kj2o'
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

$(function(){
  var loginButton = $("#bk-submit");
  loginButton.on('click',function(){
    var f = document.getElementsByTagName('form')[0];
    if(!f.checkValidity()) {
      return;
    }

    loginButton.val("Logging in...")
    loginButton.attr('disabled','disabled');
    var username = $(".username").val();
    var password = $(".password").val();
    console.log("Logging in...",$(".username").val(),$(".password").val());
    var authenticationData = {
        Username : username,
        Password : password//'Hhf639#jdj',
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
          // the api doesn't accept this field back
          delete userAttributes.email_verified;
          console.log(userAttributes,requiredAttributes);
          cognitoUser.completeNewPasswordChallenge('abCD12!@', {}, this);
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
