## This project is a full stack application using React and Flask that lets users sign in and create and manage tasks!

## Project Start Up

- This project is hosted on AWS Amplify - https://main.d2ui8ix1itvoud.amplifyapp.com/
- Since the db is using a local sqlite, you will need to spin up the backend locally to save and manage your tasks as well as user login
- create and set up a virtual environment if so desire
- run pip install -r requirements.txt
- run flask run
- go to hosted site at https://main.d2ui8ix1itvoud.amplifyapp.com/

## Project Decisions and Discussion

- Frontend:
    I used React Bootstrap vs just Bootstrap because I find that the structure and integrated classes is a bit easier to read and write with
    The application allows a user to do CRUD on tasks, but does require a user to be logged in to create new tasks.
- Backend:
    This was my first attempt using Flask, my typical python framework is Django, but I had a lot of fun learning about Flask and seeing the difference between the two frameworks!
    I have two models:
      - 1. Tasks
      - 2. Users
    - Tasks has a foreign key to Users to connect a users tasks to them.
    - Inside of the controllers directory, I implemented routes using Flask's Blueprint to help with modularization and possible future scalability.
    - Something option I added but was helpful to me (and maybe this is simply because I am so used to Django) was Flask-Migrate to help me manage my Model changes and updated to the db structure.
- Authentication:
  -  The application authentication uses Flask-JWT-Extended to manage setting a authentication for endpoints. Most endpoint include @jwt_required() which make them only accessible my users with the correct   
    header Token.
  - on the front end of the site, we are setting the token in the user's local storage and passing to each endpoint to verify authorization.
  - For password hashing and management, I am using Werkzeug and am saving the hashed password on the user.
 
- Hosting:
  - I ended up using AWS Amplify for hosting the front end of the site, we could also use EC2 and we could even connect DynamoDB for our db.
  - right now I have continuous deployments set up for whenever I push to my "staging" branch just due to the projects size.
 
  Thanks for taking a look and please feel free to reach me at my email: kayleemburch@gmail.com if you have any questions or comments! Feedback is much appreciated!
  
  
  
  
