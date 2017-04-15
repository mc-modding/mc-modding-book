global.is_local = process.argv.includes('-local');

const rimraf = require('rimraf');

/* Cleaning 'compiled' directory */
if(global.is_local)
    rimraf.sync(`compiled`);