const http = require('node:http');
const fs = require('fs');
const importFile = async ({ host, port, file, params, type, user, pass }) => {
    return new Promise((resolve, reject) => {
        let r = ''
        let s = ''
        if (params) {
            s = '?'
            for (var k in params) {
                s += `${k}=${params[k]}&`
            }
        }

        const auth = 'Basic ' + Buffer.from(user + ':' + pass).toString('base64');
        const options = {
            hostname: host,
            port: port,
            path: `${file}.${type}${s}`,
            method: 'GET',
            agent: false,
            headers: {
                "Authorization": auth
            }
        };
        const req = http.request(options, (res) => {
            fs.writeFileSync(`./${file}.${type}`, '', err => {
                if (err) {
                    console.error(err);
                }
            });
            res.on('data', async (d) => {
                console.log((new Date()), d)
                r += Buffer.from(d)
                fs.appendFileSync(`./${file}.${type}`, Buffer.from(d), err => {
                    if (err) {
                        console.error(err);
                        return reject(e);
                    }
                });
            });
        });
        req.on('error', (e) => {
            return reject(e);
        });
        req.on('close', () => {
            const obj = fs.createReadStream(`./${file}.${type}`)
            return resolve(obj);
        });
        req.end();
    })
}

const streamFile = async ({ host, port, file, params, type, user, pass }, response) => {
    // let ct = type == 'xls' ? 'vnd.ms-excel' : type
    response.contentType(`application/${type}`);
    response.setHeader('Transfer-Encoding', 'chunked');
    return new Promise((resolve, reject) => {
        let s = ''
        if (params) {
            s = '?'
            for (var k in params) {
                s += `${k}=${params[k]}&`
            }
        }

        const auth = 'Basic ' + Buffer.from(user + ':' + pass).toString('base64');
        const options = {
            hostname: host,
            port: port,
            path: `${file}.${type}${s}`,
            method: 'GET',
            agent: false,
            headers: {
                "Authorization": auth
            }
        };
        const req = http.request(options, (res) => {
            res.on('data', async (d) => {
                response.write(d)
            });
        });
        req.on('error', (e) => {
            return reject(e);
        });
        req.on('close', () => {
            response.end()
            return resolve(true);
        });
        req.end();
    })
}

exports.jasperFile = async (file, type, params) => {
    if (file == undefined || file == "") return Promise.reject('file is undefined');
    if (type == undefined || type == "") return Promise.reject('type is undefined');
    if (params == undefined || params == "") return Promise.reject('params is undefined');
    return await importFile(
        {
            host: '', port: 8080,
            file: file, params: params, type: type,
            user: '', pass: ''
        }
    );
}

exports.jasperStream = async (host, user, pass, file, type, params, res) => {
    return await streamFile(
        {
            host: host, port: 8080,
            file: file, params: params, type: type,
            user: user, pass: pass
        },
        res
    );
}