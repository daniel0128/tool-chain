const stdin = process.stdin;
const stdout = process.stdout;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');


function getChar() {
    return new Promise(resolve => {
        stdin.on('data', key => {
            resolve(key)
        })
    })
}

void async function() {
    await select(['vue', 'react', 'angular']);
    while(true) {
        let char = await getChar();
        if (char === '\u0003') {
            process.exit();
            break;
        }
        console.log(char.split('').map(c => c.charCodeAt(0)));
    }
}();

function up (n = 1) {
    stdout.write('\033['+ n +'A');
}

function down (n = 1) {
    stdout.write('\033['+ n +'A');
}

function left (n = 1) {
    stdout.write('\033['+ n +'A');
}

function right (n = 1) {
    stdout.write('\033['+ n +'A');
}

async function select(choices) {
    let selected = 0;
    for (let i in choices) {
        if (i === selected) {
            stdout.write('[X]' + choices[i] + '\n');
        } else {
            stdout.write('[ ]' + choices[i] + '\n');
        }
    }
    up(choices.length);
    right();
}
