# Jarong Media

## Overview
Jarong Media is a multi-page full-stack web application designed to deliver a seamless hotel booking experience. It features a secure authentication system with OAuth 2.0 and Google login support, ensuring user privacy and security. The application integrates Stripe for reliable payment processing.

Additionally, it includes a custom-built **admin console** for efficient management of hotels, rooms, bookings, and user requests, making it a comprehensive solution for modern hotel booking needs.

## Installation
### Prerequisites
- Java 11 or higher
- Maven
- Docker runtime
- Node.js

## Getting Started

### Setup (Backend)

1. Clone the repository:

  ```bash
  git clone https://github.com/dheerajkrishna141/Jarong-Media.git
  ```
2. Navigate to the backend directory
   
  ```bash
  cd jarongmedia-backend
  ```

3. Run `docker-compose up` in the terminal, to run the PostgreSQL and MongoDB docker images.
 
4. Then configure the database connection along with the environment variables in

     ```src/main/resources/application.properties:```

5. Build the project:
```bash
 mvn clean install
```
6. Run the project:
```bash
mvn spring-boot:run
```


### Setup (frontend)

1. Clone the repository:

  ```bash
  git clone https://github.com/dheerajkrishna141/Jarong-Media.git
  ```
2. Navigate to the frontend directory
   
  ```bash
  cd jarongmedia-frontend
  ```
3. Run `npm install` to install required dependencies

4. Run `npm run dev` to start the web server (make sure to start the [jarongmedia-backend](#setup-backend) service before running this command).


 
