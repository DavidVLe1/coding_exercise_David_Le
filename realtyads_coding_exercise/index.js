import users from './data/users.json' assert {type:"json"};
import properties from './data/properties.json' assert {type:"json"};

let listOfinactiveIDs=[];
let listOfinactiveUsers=[];

for(var i=0; i<getLengthOfObjects(properties);i++){
    if (properties[i].status=="deactivated"){
        listOfinactiveIDs.push(properties[i].account_id);
    }
}

for(var i=0;i<getLengthOfObjects(users);i++){ 
    for (var j=0;j<users[i].associated_accounts.length;j++){
        if (listOfinactiveIDs.includes(users[i].associated_accounts[j].toString())){
            listOfinactiveUsers.push(users[i]);
        }
    }
}

removeFields('associated_accounts','id',listOfinactiveUsers);
console.log(listOfinactiveUsers);

var reqData=JSON.stringify(listOfinactiveUsers);
var url= 'https://api.hubapi.com/contacts/v1/contact/batch/';
var requestType='POST';

let newHubSpot = new HubSpot();
responseData=newHubSpot.api_call(url, requestType, reqData);
contactID=responseData.vid; //vid is 202210

const response=await fetch("https://api.hubapi.com/contacts/v1/lists/226468/add?hapikey=demo",{
    method: requestType,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
        "vids": [
            contactID
        ]
      }
});
    
response.json().then(data => {
    console.log(data);
});


function getLengthOfObjects(file){
    var keyCount = Object.keys(file).length;
    return keyCount;
}

function removeFields(field, anotherfield, aList){
    aList.forEach(object=>{
        delete object[field];
        delete object[anotherfield];
    });
}