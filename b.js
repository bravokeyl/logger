function crackRedirect() {
  window.location.href = '//'+document.location.hostname+'/d/';
}
AWS.config.region = 'us-east-1';
var poolData = {
    UserPoolId: 'us-east-1_i0cqc5l3m',
    ClientId: '6k7hmqrjnb350n1ctvh6h0kj2o'
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var authuser = userPool.getCurrentUser();
console.log(authuser);
if(authuser != null && authuser.username) {
  var userData = {
      Username : authuser.username,
      Pool : userPool
  };
  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  if (cognitoUser != null) {
    console.log(cognitoUser);
    try{
      cognitoUser.getSession(function(err, session) {
          console.log(session);
          if (err) {
              crackRedirect();
             console.error(err);
             return;
          }
          // cognitoUser.getUserAttributes(function(err, attributes) {
          //     if (err) {
          //         // Handle error
          //     } else {
          //         console.log(attributes);
          //     }
          // });
      });
    } catch(e){
      console.info("Catch",e);
      crackRedirect();
    }

  }
} else {
  crackRedirect();
}
