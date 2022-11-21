import app from './app.js'
import {PORT} from './config.js';

app.listen(PORT);

console.log('SERVER running on port ', PORT);
