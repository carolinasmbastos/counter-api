## Notes
Author: Carolina de Souza Magalhaes Bastos
carolinasmbastos@gmail.com

### Date
Feb 27th, 2020

### Location of deployed application
This API is deployed in heroku:
1. For user registration and authorization:
Submit a POST request to https://counter-api-dev.herokuapp.com/auth/register
Provide a valid email and password to get a valid authorization Token. The toke is set to expire in 1 hour.

2. To retrieve the next available integer:
Submit a GET request to https://counter-api-dev.herokuapp.com/api/next
The next autoincremented integer will be retrieved. 

3. To retrieve the current integer:
Submit a GET request to https://counter-api-dev.herokuapp.com/api/current
The current integer will be retrieved. 

4. To Reset the counter to a non-negative integer:
Submit a PUT request to https://counter-api-dev.herokuapp.com/api/current
The updated counter value will be retrieved as a result from resetting the value.

Endpoints 2, 3 and 4 are secured by the API token generated from endpoint 1.

The Client UI application to help test this API is deployed at:
https://counter-ui.herokuapp.com/

The repository for the UI is: 
https://github.com/carolinasmbastos/counter-app.git


*** Please note that both UI and API are hosted in a free account in Heroku, and first time loading can be a bit slow. ***

### Time spent
I spent 5:20 hours building both the API and a simple React UI to help testing the API.

### Assumptions made
I assumed there was no need to persist the counter value, so every time the application is restarted the counter value will restart from 0.

### Shortcuts/Compromises made
Yes, I could have created a better-styled UI for testing. I did a very basic html just for testing.

### Stretch goals attempted
I attempted to complete two stretch goals: Create a UI for testing and deploying the API and UI.
I could have done the OAuth part on Facebook but I was running out of time.

### Instructions to run assignment locally
1. Clone the repository.
2. Run a npm install to install dependencies.
3. Create a .env file to define the value for the following configurations:
```
SECRET_PHRASE= <any phrase to be used as part of the token generation>
TOKEN_EXPIRATION= <define the value in hours or days like: 1h or 1d>
```
4. run a npm start

### What did you not include in your solution that you want us to know about?
If I had additional time I could have completed one more stretch goal (Sign  in using OAuth).

### Other information about your submission that you feel it's important that we know if applicable.


### Your feedback on this technical challenge
Challange was interesting and covered the basics aspects of building a Rest API, I had fun doing it and had no issues understanding the requirements.
