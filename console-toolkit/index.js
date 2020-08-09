const stdin = process.stdin;
const stdout = process.stdout;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');


function getChar() {
    return new Promise(resolve => {
        stdin.once('data', key => {
            resolve(key)
        })
    })
}

void async function () {
    stdout.write('Which framework would you like to use?\n');
    let answer = await select(['vue', 'react', 'angular']);
    stdout.write('You selected ' + answer + '\n');
    process.exit();
}();

function up(n = 1) {
    stdout.write('\033[' + n + 'A');
}

function down(n = 1) {
    stdout.write('\033[' + n + 'B');
}

function right(n = 1) {
    stdout.write('\033[' + n + 'C');
}

function left(n = 1) {
    stdout.write('\033[' + n + 'D');
}

async function select(choices) {
    let selected = 0;
    for (let i = 0; i < choices.length; i++) {
        if (i === selected) {
            stdout.write('[X]' + choices[i] + '\n');
        } else {
            stdout.write('[ ]' + choices[i] + '\n');
        }
    }
    up(choices.length);
    right();
    while (true) {
        let char = await getChar();
        if (char === '\u0003') {
            process.exit();
            break;
        }
        if (char === 'w' && selected > 0) {
            stdout.write(' ');
            left();
            selected--;
            up();
            stdout.write('X');
            left();
        }
        if (char === 's' && selected < choices.length - 1) {
            stdout.write(' ');
            left();
            selected++;
            down();
            stdout.write('X');
            left();
        }
        if (char === '\r') {
            down(choices.length - selected);
            left();
            return choices[selected];
        }
        // console.log(char.split('').map(c => c.charCodeAt(0)));
    }
}
