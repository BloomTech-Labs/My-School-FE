# MySchool
![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
![Maintainability](https://api.codeclimate.com/v1/badges/6f9a7f7c33c8b6f27b3e/maintainability)(https://codeclimate.com/github/Lambda-School-Labs/My-School-FE/maintainability)
You can find the deployed project [here](https://master.d1t4t6k77hfkhl.amplifyapp.com/).

## Contributors


|                                       [Elysia Gabe](https://github.com/elysiagabe)                                        |                                       [Dylan Collins](https://github.com/dylan17th)                                        |                                       [Sara Reidy](https://github.com/reidysj)                                        |                                       [Marc Dandoy](https://github.com/MD412)                                        |                                       [Katrina Hernandez](https://github.com/abqkatrina)                                        |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://ca.slack-edge.com/ESZCHB482-W0123RSB89M-5652347e0f72-512" width = "200" />](https://github.com/elysiagabe)                       |                      [<img src="https://ca.slack-edge.com/ESZCHB482-W012BRRS6B0-9da44ed2172e-512" width = "200" />](https://github.com/dylan17th)                       |                      [<img src="https://ca.slack-edge.com/ESZCHB482-W012H6RR32R-59d396a2c11b-512" width = "200" />](https://github.com/reidysj)                       |                      [<img src="https://ca.slack-edge.com/ESZCHB482-W012X6SE2CR-e180dcd347e7-512" width = "200" />](https://github.com/MD412)                       |                      [<img src="https://ca.slack-edge.com/ESZCHB482-W0123RRCX0F-117b2e41f058-512" width = "200" />](https://github.com/abqkatrina)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/elysiagabe)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/dylan17th)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/reidysj)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/MD412)           |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/abqkatrina)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/abqkatrina) |

<br>
<br>

## Project Overview

[Trello Board](https://trello.com/b/WYUdZyhy/labs24-myschool)

[Product Canvas](https://www.notion.so/MySchool-6aef93cf287145198bba482c3fd59dbd)

[UX Design files](https://www.figma.com/file/Sgu1fXMYuWxf7leP5I0NAg/My-School-Marc?node-id=122%3A2) 

MySchool is a portfolio-building app for parents and students participating in homeschooling activities. We make it quick and easy to add schoolwork examples or activity information to a printable PDF. Based on the Maryland state requirements for homeschoolers, MySchool keeps materials organized for a successful submission to educational authorities. 


### Key Features

-    A searchable record of portfolio articles -- one portfolio per student, organized by subject and date
-    Administrative access for parents or teachers for all student portfolios associated with a family or group
-    Optional account for students in a family or group -- limited to read or add abilities to prevent accidental deletion
-    Export function to instantly download, share, or print an entire portfolio or time range in PDF form
-    Activity monitoring graphic to quickly note progress on portfolio creation
-    Notifications to users to keep portfolio maintenance on track

## Tech Stack

### Front end built using:
-   React
-   Chakra UI

-    React was chosen for its ease of developer onboarding and large external library availability.
-   Chakra UI was chosen for its focus on accessibility friendly components.
    -   Accessibility is always an important consideration, even more so when it comes to applications in the realm of education.


#### Front end deployed to AWS Amplify

#### [Back end](https://my-school-v1.herokuapp.com/) built using:

### Framework : Express
-    Allows for rapid implementation
-    No onboarding time concerns, all members were familiar with Express
-    Excellent documentation and other sources available
-    Stable, has been around for a while

<!-- # APIs

## 2️⃣ Authentication API here

🚫Replace text below with a description of the API

Water's like me. It's laaazy ... Boy, it always looks for the easiest way to do things A little happy sunlight shining through there. Let all these little things happen. Don't fight them. Learn to use them. Even the worst thing we can do here is good. -->

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

    *  PORT - set to any valid local port number for running server locally
    *  DB_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  CLOUDINARY_NAME - this is your Cloudinary username
    *  CLOUDINARY_API_KEY - this is generated in your Cloudinary account
    *  CLOUDINARY_API_SECRET - this is generated in your Cloudinary account
   

<!-- # 4️⃣ Testing

🚫Document what you used for testing and why -->

# 4️⃣ Installation Instructions

1. Run npm install or yarn install to install all dependencies.

## Other Scripts

build - creates a build of the application
start - starts the production server after a build is created
test - runs tests in **tests** directory \* eject - copy the configuration files and dependencies into the project so you have full control over them

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request
   
 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/Lambda-School-Labs/My-School-BE-/edit/master/README.md) for details on the backend of our project.
