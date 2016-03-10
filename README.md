![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

# File upload with express and AWS S3

## Instructions

[Install](https://github.com/ga-wdi-boston/js-template#installation)
 `js-template` into your training directory. In step 2 rename `js-template` to
 `express-multer-client`.

[Install](https://github.com/ga-wdi-boston/express-template#installation)
 `express-template` into your training directory.  In step 2 rename
 `express-template` to `express-multer-api`.

## Objectives

By the end of this lesson, students should be able to:

-   Upload files to AWS S3 from a node application.
-   Create path names with a low chance of duplication
-   Store information about uploaded files in MongoDB via Mongoose
-   Upload files from a browser to express and store them in AWS S3.

## Prerequisites

-   [aws-s3-setup-guide](https://github.com/ga-wdi-boston/aws-s3-setup-guide)
-   [express-api](https://github.com/ga-wdi-boston/express-api)

## Discussion

What are the parts of file upload?  What are the issues to guard against?

## Uploading files to AWS from node

We'll build a command line script in `express-multer-api` to upload a file to
 AWS.

Why build a command line uploader?

### Code along

We'll use [AWS.S3](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html),
 specifically the [upload](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property)
 method, to send files to AWS S3.

We'll use the following node modules.

-   `aws-sdk`
-   `crypto`
-   `dotenv`
-   `file-type`
-   `fs`
-   `mongoose`

We'll run the script using `npm run bin/upload-aws <file> [comment]`.

### Lab

Refactoring is a skill to cultivate.

Let's separate out the parts that aren't about a command line script so we can
 reuse them.

## Uploading files to an echo server from an html form

### Code along

We'll build a form in `express-multer-client` to handle file uploads.

We'll use the form attribute `enctype="multipart/form-data"` to allow uploading
 of one or more files.

We'll use `FormData` and `$.ajax` to POST data to an echo server,
 `http://httpbin.org`.
Later we'll use this client to POST data to `express-multer-api`.

## Uploading files to AWS via multer and express

### Code along

We'll need to use the following express modules in addition to the modules from
 the command line code along:

-   `express`
-   `body-parser`
-   `multer`

### Lab

Can we improve our solution by refactoring?

## [License](LICENSE)

Source code distributed under the MIT license. Text and other assets copyright
General Assembly, Inc., all rights reserved.
