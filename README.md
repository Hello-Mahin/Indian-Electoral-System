# Election Assistant (Indian Context)

An interactive, educational web application designed to help citizens understand the Indian Electoral System.

## Features
- **Interactive Guide:** Step-by-step voting process.
- **Timeline:** Key phases of a general election.
- **Learn Mode:** Flashcards and Quizzes on topics like EVM, VVPAT, and the Model Code of Conduct.
- **Interactive Chatbot:** A simulated chat interface to answer common questions.

## Development Setup
1. Ensure Node.js is installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

## Deployment (Google Cloud Run)
1. Build the Docker image: `docker build -t gcr.io/PROJECT_ID/election-assistant .`
2. Push the image: `docker push gcr.io/PROJECT_ID/election-assistant`
3. Deploy to Cloud Run: `gcloud run deploy election-assistant --image gcr.io/PROJECT_ID/election-assistant --platform managed`
