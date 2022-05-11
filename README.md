
# How to start the project

## Starting the Server

In the project directory,
In the src folder go to the server directory then type

### `npm install` 

to install all the dependencies

Then start the server by typing:

### `node server.js`

## Starting the Front end 
In the project directory,

first install dependencies by typing:

### `npm install`

Then start the frontend of the project by typing:

### `npm start`

## Additional note

If TensorFlow Universal Sentence Encoder is not working on Chrome browser, and console window is showing the following error:

### `net::ERR_QUIC_PROTOCOL_ERROR 200`

This error is due to experimental browser feature. To fix this issue go yo the address below:

chrome://flags/#enable-quic

And disable the Experimental QUIC Protocol.
