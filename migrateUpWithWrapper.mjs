/**
 * Hacky script that wraps the 'node-pg-migrate' program
 * and make sure that logged errors do not leak some
 * sensitive information such as db password for instance..
 * */
import dotenv from 'dotenv';
import { spawn } from 'child_process';

dotenv.config();

const dbUser = process.env.PGUSER;
const dbPassword = process.env.PGPASSWORD;

const child = spawn('npm', ['run', 'migrate', 'up']);

child.stdout.on('data', (data) => {
    console.log(`${data}`);
});

let hasError = false;
child.stderr.on('data', (data) => {
    hasError = true;
    if (dbPassword && data.includes(dbPassword)) {
        const message = Buffer.from(data).toString('utf8');
        console.error(message.replaceAll(dbPassword, '*****').replaceAll(dbUser, '*****'));
    } else {
        console.error(`${data}`);
    }
});

child.on('exit', () => {
    if (hasError) {
        //Important to notify that error(s) occurred.
        return process.exit(2);
    }
});
