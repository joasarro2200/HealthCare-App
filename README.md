## Set up and run

Build the images: docker-compose build
Run app: docker-compose up

Be sure to apply django migrations: python manage.py migrate (in backend container)

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

Check lint and format: ./verify (in backend folder)

## Frontend linting

- Eslint

Check lint: npm run lint
