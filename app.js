const express = require('express');
const app = express();
const port = 8080;

function getMessage(){
    return 'Hello World!';
}

app.get('/', (req, res) => {
    res.send(getMessage());
});

// Start the server only if this file is run directly
if (require.main === module){
    app.listen(port);
    console.log(`App running on http://localhost:${port}`);
}

module.exports = {app, getMessage};