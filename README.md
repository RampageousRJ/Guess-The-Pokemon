# Guess The Pokémon

A web-based interactive game designed to test Pokémon knowledge through visual hints and detailed character information.

## Features

- **Interactive Gameplay**: Engaging user interface designed for a seamless guessing experience.
- **Visual Hints**: High-quality Pokémon images provided as identifiers.
- **Modern UI**: Responsive design optimized for various screen resolutions.
- **Dynamic Feedback**: Real-time validation of user inputs.
- **Technical Implementation**: Built using React, TypeScript, and Node.js.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), CSS, Nginx.
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/).
- **Containerization**: [Docker](https://www.docker.com/) / [Podman](https://podman.io/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) or [Podman](https://podman.io/)

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/Guess-The-Pokemon.git
    cd Guess-The-Pokemon
    ```

2.  **Setup the Backend**:
    ```bash
    cd backend
    npm install
    npm start
    ```

3.  **Setup the Frontend**:
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

### Running with Docker

The application can be deployed using Docker to ensure environment consistency.

**Backend Service**:
The backend requires a `PORT` build argument to define the internal listening port.
```bash
# Build the backend image
docker build -t pokemon-backend ./backend/ --build-arg PORT=3030

# Run the backend container
docker run -p 3030:3030 pokemon-backend
```

**Frontend Service**:
The frontend requires the `REACT_APP_API_URL` build argument to connect to the backend service.
```bash
# Build the frontend image
docker build -t pokemon-frontend ./frontend/ --build-arg REACT_APP_API_URL=http://localhost:3030

# Run the frontend container (maps host port 3000 to Nginx port 80)
docker run -p 3000:80 pokemon-frontend
```

## Project Structure

- `frontend/`: Contains the React application and TypeScript source files.
- `backend/`: Contains the Node.js/Express server logic.
- `Dockerfile`: Configuration files for service containerization located in each service directory.

## Contributing

Contributions are welcome. To contribute, please follow the standard fork-and-pull-request workflow.

1. Fork the Project
2. Create a Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit Changes (`git commit -m 'Add NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.