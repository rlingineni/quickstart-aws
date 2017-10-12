var AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const success = function(msg) {
    
    if(typeof msg !== "string" ){
       msg = JSON.stringify(msg);  
    }

  var resp = {
    statusCode: 200,
    headers:{
      "Access-Control-Allow-Origin":"*"
    },
    body: msg
  };
  return [null, resp];
};

const failure = function(why) {

    if(typeof why !== "string" ){
        why = JSON.stringify(why);  
    }

  var resp = {
    statusCode: 400,
    headers:{
      "Access-Control-Allow-Origin":"*"
    },
    body: why
  };
  return [null, resp];
};

const tableName = "{0}"
const tableKey = "{1}"

exports.myHandler = function(event, context, callback) {
  
switch(event.httpMethod) {
  case 'GET':
    handleRead(event.queryStringParameters);
    break;
  case 'POST':
  case 'PUT':
    handleCreate(event.queryStringParameters, event.body);
    break;
  case 'DELETE':
    handleDelete(event.queryStringParameters);
    break;
  case 'UPDATE':
    handleUpdate(event.queryStringParameters, event.body);
    break;
  default:
    callback(new Error('Invalid HTTP request method: ' + event.httpMethod));
  }
  
/// add the object described by the request body to the database
function handleCreate(params, body) {

  console.log("Creating a New Item with ", body)
  try {
    let item = JSON.parse(body);
    let dynamoParams = {
      TableName: tableName,
      Item: item
    };

    docClient
      .put(
        dynamoParams,
        function(error, data) {
          let response;
          if (error) {
            response = failure(error);
            callback(...response);
          } else {
            response = success(data);
            callback(...response);
          }
          
        });
  } catch(error) {
     console.log(error);
    callback(new Error('Error parsing POST parameters: ' + error));
  }
  
}

/// fetch an object based on its key
function handleRead(params) {
    let dynamoParams = {
        TableName: tableName,
        };

        var key = {};
        key[tableKey] = params[tableKey];
        dynamoParams.Key = key;

    docClient
      .get(
        dynamoParams,
        function(error, data) {
          let response;
          if (error) {
            response = failure(error);
            callback(...response);
          } else {
            response = success(data);
            console.log(response);
            callback(...response);
          }
          
        });
}

/// update or create an object
function handleUpdate(params, body) {
  try {
    let item = JSON.parse(body);
    /// successfully parsed the request body
    let dynamoParams = {
      TableName: tableName,
      Item: body
    };
    promise =
      docClient
        .update(
          dynamoParams,
          function(error, data) {
            let response;
            if (error) {
              response = failure(error);
              callback(...response);
            } else {
              response = success({msg:"Updated Information"});
              callback(...response);
            }
            
          });
  } catch(err) {
    callback(new Error('Error parsing POST parameters: '))
    return;
  }
}

/// delete an object
function handleDelete(params) {
  
    let dynamoParams = {
        TableName: tableName,
        };

        var key = {};
        key[tableKey] = params[tableKey];
        dynamoParams.Key = key;

        docClient
            .delete(
            dynamoParams,
            function(error, data) {
                let response;
                if (error) {
                console.log(error);
                response = failure(error);
                callback(...response);
                } else {
                response = success({msg:"Deleted!"});
                callback(...response);
                }
            });
}


}






