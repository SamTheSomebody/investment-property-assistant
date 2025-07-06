# Investment Property Assistant

## Project Overview

Investment Property Assistant is a full-stack web application designed to help users analyze and manage property investments. It features a modern React frontend (with Vite and Tailwind CSS) and a Python FastAPI backend with a PostgreSQL database. The app allows users to view, add, update, and delete property listings, and provides detailed financial analysis for each property.

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/samthesombody/investment-property-assistant.git
cd investment-property-assistant
```

### 2. Backend Setup (Python + FastAPI)

#### a. Create and activate a virtual environment
```sh
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### b. Install dependencies
```sh
pip install -r requirements.txt
```

#### c. Set up environment variables
- Copy `.env.example` to `.env` and update the values as needed:
```sh
cp .env.example .env
```
- Ensure your `.env` contains a valid `DATABASE_URL` for your PostgreSQL instance.

#### d. Run database migrations
```sh
alembic upgrade head
```

#### e. Start the backend server
```sh
uvicorn app.main:app --reload
```
- The API will be available at [http://localhost:8000](http://localhost:8000)
- Interactive docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 3. Frontend Setup (React + Vite + Tailwind)

```sh
cd frontend
npm install
npm run dev
```
- The frontend will be available at [http://localhost:3000](http://localhost:3000)

---

## How to Run Tests

### Backend Tests
From the project root:
```sh
pytest
```

### Frontend Tests
(If you add frontend tests, e.g., with Jest or React Testing Library)
```sh
cd frontend
npm test
```

---

## How to Seed the Database

A script is provided to insert sample property data for development/demo purposes.

```sh
python scripts/seed_properties.py
```
- Ensure your backend virtual environment is activated and your `.env` is configured.
- The script will insert sample properties and print them to the console.

---

## Additional Notes
- Make sure PostgreSQL is running and accessible at the address specified in your `.env`.
- For more details on project structure, contributing, or troubleshooting, see the code comments and future documentation updates.

## Contributing
- Todo
