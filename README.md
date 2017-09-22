# Quickstart-AWS

Contains Methods and Templates to quickly create an AWS Serverless Backend with DynamoDB or S3

## Using the Above Templates
Make an AWS Lambda function and copy paste the above template to interface with DynamoDB or S3 as an API. Make sure to pair with API Gateway.

### Getting Started With DynamoDB
1. Login to [AWS](console.aws.amazon.com)
2. Find the DynamoDB Service
3. Select `Create Table`
4. Give it a Primary Key like `UserID`, this value should be unique when inserting. Or else, any existing data will be overriden


### Getting Started With AWS Lambda
1. Login to [AWS](console.aws.amazon.com)
2. Find the AWS Lambda Service
3. Select `Author from Scratch`
4. Select a Runtime of your choice: `node.js` if you want to use the above templates 
5. Create the function and run it! It should say `Hello World`


### Getting Started With AWS API Gateway
1. Login to [AWS](console.aws.amazon.com)
2. Find the AWS API Gateway Service
3. Select `New API` and give it a name and some description

4. There will be a pane on the right with your new API.
  - `Create Resource` will make a route for you `\abc`
  - `Create Method` will make allow you to set methods such as `GET` , `POST` for you. When you configure this method, you    will then use the dropdown to find your AWS Lambda function to handle this. Tick `Handle AWS Proxy` to get a pre-parsed body.
  
5. Click on `Deploy API` and give it a stage like `alpha`, or `production`. Get your URL and invoke your API. Your lambda function is called. Use the above templates to interface.

### Getting Started with AWS S3
1. Login to [AWS](console.aws.amazon.com)
2. Create a Bucket for yourself, buckets store things such as images, documents or any other data Blob



