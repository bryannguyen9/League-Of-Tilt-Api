# League-Of-Tilt-Api

## Description

League-Of-Tilt-Api is a RESTful API that provides endpoints for managing champions and their associated thoughts and reactions. The API allows users to perform CRUD operations on champions, create thoughts related to champions, and add reactions to thoughts. It serves as the backend for the League of Tilt web application.

[Walkthrough Video](https://drive.google.com/file/d/1sRWAuofxkfsm9ZywEVc9qsNqKnAhyiRe/view)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Models](#models)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository or download the source code files.
2. Make sure you have Node.js and npm installed on your machine.
3. Navigate to the project directory in your terminal.
4. Install the required dependencies by running the following command:

   ```bash
   npm install
   ```

5. Set up your database by running the SQL scripts provided in the `database` folder.

6. Seed data by running the following command:

   ```bash
   npm run seed
   ```

7. Start the server by running the following command:

   ```bash
   npm start
   ```

8. The API should now be running on `http://localhost:3001`.

## Usage

League-Of-Tilt-Api provides several endpoints for managing champions, thoughts, and reactions. You can interact with the API using tools like Insomnia or Postman. Here are the available endpoints:

### Champions

- `GET /api/champions`: Get all champions.
- `GET /api/champions/{championId}`: Get a specific champion by ID.
- `POST /api/champions`: Create a new champion.
- `PUT /api/champions/{championId}`: Update a champion.
- `DELETE /api/champions/{championId}`: Delete a champion.
- `POST /api/champions/{championId}/friends`: Add a friend to a champion.
- `DELETE /api/champions/{championId}/friends/{friendId}`: Remove a friend from a champion.

### Thoughts

- `GET /api/thoughts`: Get all thoughts.
- `GET /api/thoughts/{thoughtId}`: Get a specific thought by ID.
- `POST /api/champions/{championId}/thoughts`: Create a new thought for a champion.
- `PUT /api/thoughts/{thoughtId}`: Update a thought.
- `DELETE /api/champions/{championId}/thoughts/{thoughtId}`: Delete a thought.

### Reactions

- `POST /api/thoughts/{thoughtId}/reactions`: Create a new reaction for a thought.
- `DELETE /api/thoughts/{thoughtId}/reactions/{reactionId}`: Delete a reaction.

Make sure to replace `{championId}`, `{friendId}`, `{thoughtId}`, and `{reactionId}` with the appropriate IDs in the URL.

## Endpoints

### Champions

#### GET /api/champions

Returns all champions in the database.

#### GET /api/champions/{championId}

Returns a specific champion by ID.

#### POST /api/champions

Creates a new champion.

Example Request Body:

```json
{
  "championName": "Test Champion Name",
  "email": "testchampion@example.com"
}
```

#### PUT /api/champions/{championId}

Updates a champion.

Example Request Body:

```json
{
  "championName": "New Updated Champion Name"
}
```

#### DELETE /api/champions/{championId}

Deletes a champion.

### Thoughts

#### GET /api/thoughts

Returns all thoughts in the database.

#### GET /api/thoughts/{thoughtId}

Returns a specific thought by ID.

#### POST /api/thoughts/{thoughtId}

Creates a new thought.

Example Request Body:

```json
{
  "championName": "Fizz",
  "thoughtText": "New Thought text goes here"
}
```

#### PUT /api/thoughts/{thoughtId}

Updates a thought.

Example Request Body:

```json
{
  "thoughtText": "Update thought text"
}
```

#### DELETE /api/champions/{championId}/thoughts/{thoughtId}

Deletes a thought.

### Reactions

#### POST /api/thoughts/{thoughtId}/reactions

Creates a new reaction for a thought.

Example Request Body:

```json
{
  "username": "Yasuo",
  "reactionBody": "This is a reaction to the thought"
}
```

#### DELETE /api/thoughts/{thoughtId}/reactions/{reactionId}

Deletes a reaction.

## Models

The API uses the following models:

- Champion: Represents a champion in the game.
- Thought: Represents a thought or comment about a champion.
- Reaction: Represents a reaction to a thought.

## Technologies Used

The following technologies and packages were used in the development of this API:

- Node.js
- Express.js
- Sequelize (ORM for interacting with the database)
- MongoDB (Database)
- Dotenv (Environment variable management)

## My links

### \* [Portfolio](https://bryannguyen9.github.io/Bryan-Nguyen-Portfolio/)

### \* [LinkedIn](https://linkedin.com/in/bryannguyen9)

### \* [Github](https://github.com/bryannguyen9)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. For more information, please see the [LICENSE](./LICENSE) file.
