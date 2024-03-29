## Set up and run

-Add an `.env` file. There is an `.env.example` with the values used for this demo. Use those. 

-Build the images: `docker-compose build` (maybe you need sudo)

-Run app: `docker-compose up` (maybe you need sudo)


Be sure to apply django migrations: `python manage.py migrate` (in backend container)

## Links

Backend: <http://localhost:8000/>

Frontend: <http://localhost:3000/>

## Structure

- Backend: Django Rest Framework App
- Frontend: React App + Typescript
- MySQL: Database
- Maildev: Mail server
- Celery + RabbitMq: Async tasks (and scheduled tasks)

## Backend linting and formatter

- Flake8
- Black

Check lint, format and run tests: `./verify_backend`

## Frontend linting

- Eslint

Check lint: `./verify_frontend`

## Backend tests

`python manage.py test` (in backend folder)

## TO DO

-Use go in order to set up and run the project.
