# Clothify

Clothify is a Full Stack MERN (MongoDB, Express, React, Node.js) web application that allows users to virtually try on clothing. By leveraging AI technology, users can upload their photos and visualize how different clothing items would look on them.

## Getting Started

Follow the steps below to run Clothify on your local machine.

### Prerequisites

Before you begin, make sure you have the following software installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/)

### Setting up Cloudinary

1. Visit the [Cloudinary website](https://cloudinary.com/) to sign up for an account.
2. After signing up, you will receive your Cloudinary Cloud Name, Public API Key, and Private API Key.
3. Populate the corresponding fields in the `.env` file with the credentials you received from Cloudinary.

### Installation

1. Clone the repository:

   ```
   git clone git@github.com:ShlokBharadwaj/Clothify.git
   ```
   
2. Navigate to the server directory and install server dependencies:

    ```
    cd server
    npm install
    ```
3. Start the server:

    ```
    npm start
    ```
4. Navigate to the client directory and install client dependencies:

    ```
    cd ../client
    npm install
    ```
5. Start the client:

    ```
    npm run dev
    ```

## Usage

1. Navigate to http://localhost:5173/ in your browser.
2. Upload your photo and explore various clothing items virtually.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

- `BEARER_TOKEN` - Your TNL (The Next Leg) API Token.
- `MONGODB_URL` - Your MongoDB database URL.
- `PORT` - Port number for your Node.js server.
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary Cloud Name.
- `CLOUDINARY_API_KEY` - Your Cloudinary Public API Key.
- `CLOUDINARY_API_SECRET` - Your Cloudinary Private API Key.

Before running the project, make sure to rename the provided `.env.sample` file to `.env` and fill in the necessary values for each variable.


## Contributing


Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the BSD 3-Clause License. See [LICENSE](LICENSE) for more information.
