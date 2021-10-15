const AWS = require('aws-sdk');

module.exports = {
  S3: new AWS.S3({apiVersion: '2006-03-01'})
}