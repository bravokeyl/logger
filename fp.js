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

    loginButton.val("Logging in...");
    loginButton.attr('disabled','disabled');
    var username = $(".username").val();
    console.log("Logging in...",username);

    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.forgotPassword({
        onSuccess: function (res) {
            console.log('Success',res);
            loginButton.removeAttr('disabled');
            window.location.href = '//'+document.location.hostname+'/d/vp.html?u='+username;
        },
        onFailure: function(err) {
            console.error(err);
            loginButton.removeAttr('disabled');
            loginButton.val("Login");
        },
        // //Optional automatic callback
        // inputVerificationCode: function(data) {
        //     console.log('Code sent to: ' + data);
        //     var verificationCode = prompt('Please input verification code ' ,'');
        //     var newPassword = prompt('Enter new password ' ,'');
        //     cognitoUser.confirmPassword(verificationCode, newPassword, this);
        // }
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
