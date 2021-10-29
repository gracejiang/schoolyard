const fs = require('fs');
fs.createReadStream('pre-commit').pipe(fs.createWriteStream('../.git/hooks/pre-commit'));