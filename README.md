# Stock Monitoring Platform

## Introduction
This project is a stock monitoring platform where users can create and manage their own watchlists of stock symbols. The platform provides a dashboard displaying the latest stock values of the symbols on the user's watchlist. It also allows handling multiple users concurrently, each having different watchlists.

## Technologies Used
- Python (Django) for backend development
- React with TypeScript for frontend
- Material UI for styling and components
- PostgreSQL for the database
- Django REST Framework for API development
- JWT (JSON Web Token) authentication

## Setup Instructions
1. **Clone the Repository:**
    ```
    git clone https://github.com/som-123/stock-monitoring-platform.git
    cd stock-monitoring-platform
    ```

2. **Backend Setup:**
- Create and activate a virtual environment (optional but recommended):
  ```
  python -m venv venv
  source venv/bin/activate
  ```
- Install dependencies:
  ```
  pip install -r requirements.txt
  ```
- Apply migrations:
  ```
  python manage.py migrate
  ```
- Run the development server:
  ```
  python manage.py runserver
  ```

3. **Frontend Setup:**
- Navigate to the `frontend` directory:
  ```
  cd frontend
  ```
- Install dependencies:
  ```
  npm install
  ```
- Start the development server:
  ```
  npm start
  ```

4. **Accessing the Application:**
- Open your web browser and go to http://localhost:3000 to access the frontend.
- The backend API endpoints will be available at http://localhost:8000/api/.