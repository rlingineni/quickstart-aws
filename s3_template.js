var AWS = require('aws-sdk');

const S3 = new AWS.S3();

const BucketName = "{0}"

exports.myHandler = function(event, context, callback) {
  switch(event.httpMethod) {
  case 'GET':
    return handleRead(event.queryStringParameters, callback);
  case 'POST':
  case 'PUT':
  case 'UPDATE':
    return handleWrite(event.queryStringParameters, event.headers, event.body, callback);
  case 'DELETE':
    return handleDelete(event.queryStringParameters, callback);
  default:
    callback(new Error('Invalid HTTP request method: ' + event.httpMethod));
  }
};

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
    body: err
  };
  return [err, resp];
};

/// retrieve an object from S3
function handleRead(params, callback) {
  let s3Params = {
    Bucket: BucketName,
    Key: params.key
  };
  S3.getObject(
      s3Params,
      function(error, data) {
        let response;
        if (error) {
          response = failure(error);
        } else {
          response = success(data);
        }
        callback(...response);
      }
    );
}

/// create or update an S3 object
function handleWrite(params, headers, body, callback) {
  let s3Params = {
    Bucket: BucketName,
    Key: params.key,
    ContentType: headers['Content-Type'],
    Body: body
  };
  S3.upload(
      s3Params,
      function(error, data) {
        let response;
        if (error) {
          response = failure(error);
        } else {
          response = success(data);
        }
        callback(...response);
      }
    );
}

/// delete an S3 object
function handleDelete(params, callback) {
  let s3Params = {
    Bucket: BucketName,
    Key: params.key
  };
  S3.deleteObject(
      s3Params,
      function(error, data) {
        let response;
        if (error) {
          response = failure(error);
        } else {
          response = success(data);
        }
        callback(...response);
      }
    );
}
