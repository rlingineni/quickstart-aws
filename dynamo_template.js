var AWS = require('aws-sdk');

exports.myHandler = function(event, context, callback) {
  switch(event.httpMethod) {
  case 'GET':
    return handleRead(event.queryStringParameters, callback);
  case 'POST':
  case 'PUT':
    return handleCreate(event.queryStringParameters, event.body, callback);
  case 'DELETE':
    return handleDelete(event.queryStringParameters, callback);
  case 'UPDATE':
    return handleUpdate(event.queryStringParameters, event.body, callback);
  default:
    callback(new Error('Invalid HTTP request method: ' + event.httpMethod));
  }
};

const docClient = new AWS.DynamoDB.DocumentClient();

const success = function(msg) {
  let resp = {
    statusCode: 200,
    body: msg
  };
  return [null, resp];
};

const failure = function(why) {
  let err = new Error(why);
  let resp = {
    statusCode: 400,
    body: err;
  };
  return [err, resp];
};

/// add the object described by the request body to the database
function handleCreate(params, body, callback) {
  try {
    let item = JSON.parse(body);
    let dynamoParams = {
      TableName: '{{tableName}}',
      Item: item
    };
    docClient
      .put(
        dynamoParams,
        function(error, data) {
          let response;
          if (error) {
            response = failure(error);
          } else {
            response = success(data);
          }
          callback(...response);
        });
  } catch(error) {
    callback(new Error('Error parsing POST parameters: ' + error));
  }
}

/// fetch an object based on its key
function handleRead(params, callback) {
  let dynamoParams = {
    TableName: '{{tableName}}',
    Key: {{KeyObject}}
  };
  promise =
    docClient
      .get(
        dynamoParams,
        function(error, data) {
          let response;
          if (error) {
            response = failure(error);
          } else {
            response = success(data);
          }
          callback(...response);
        });
}

/// update or create an object
function handleUpdate(params, body, callback) {
  try {
    let item = JSON.parse(body);
    /// successfully parsed the request body
    let dynamoParams = {
      TableName: '{{tableName}}',
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
            } else {
              response = success(data);
            }
            callback(...response);
          });
  } catch(err) {
    callback(new Error('Error parsing POST parameters: '))
    return;
  }
}

/// delete an object
function handleDelete(params, callback) {
  let dynamoParams = {
    TableName: '{{tableName}}',
    Key: {{keyObject}}
  };
  promise =
    docClient
      .delete(
        dynamoParams,
        function(error, data) {
          let response;
          if (error) {
            response = failure(error);
          } else {
            response = success(data);
          }
          callback(...response);
        });
}
