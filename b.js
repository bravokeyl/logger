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
          localStorage.setItem('_idToken',session.getIdToken().getJwtToken());
          console.log(session.getIdToken().getJwtToken());
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
             IdentityPoolId: 'us-east-1:84d06c4a-353c-4167-afc4-a87bd27bb83a',
             Logins: {
                 'cognito-idp.us-east-1.amazonaws.com/us-east-1_i0cqc5l3m':
                  session.getIdToken().getJwtToken()
             }
          });

          AWS.config.credentials.get(function(err){
             if (err) {
                 console.log(err);
             }
          });
          // cognitoUser.getUserAttributes(function(err, attributes) {
          //     if (err) {
          //         // Handle error
          //     } else {
          //       attributes.forEach(function(e,i){
          //         console.log(e);
          //       });
          //       // var attributeList = [];
          //       // var attribute = {
          //       //     Name :  'designation',
          //       //     Value : 'Product Engineer'
          //       // };
          //       // var attribute = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute);
          //       // console.log(attribute);
          //       // // attributeList.push(attribute);
          //       // cognitoUser.updateAttributes(attributeList, function(err, result) {
          //       //     if (err) {
          //       //         alert(err);
          //       //         return;
          //       //     }
          //       //     console.log('call result: ' + result);
          //       // });
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
const apiurl = 'https://api.bravokeyl.com/v1/';
const options = {
  baseURL: apiurl,
  headers: {
    'Authorization': localStorage.getItem('_idToken'),
    'X-Api-Key': 'NcOMTc1wjo3xtXI9nRPuM7mGwNObPuWM7bxaCW9C'
  },
  // params: {
  //   ID: 12345
  // },
};
axios.get('/c',options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
