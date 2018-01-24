const http = require('http');
const bodyParser = require('./body-parse');
const cowsay = require('cowsay');
const queryString = require('querystring');

// function getTestPage(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write(cowsay.say({
//     text: <querystring text>
//   }));
//   res.end();
// }

const app = http.createServer((req, res) => {
  console.log('req.url ', req.url);
  switch (req.method) {
  case 'GET':
    if(req.url === '/') {

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title></title>
        </head>
        <body>
          <header>
            <nav>
              <p>Click <a href = "/cows">here</a> to hear a cow's story</p>
            </nav>
          </header>
          <main>
          </main>
        </body>
      </html>`);
      res.end();

    } else if (req.url === '/cows') {

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({
        text: 'I have crippling depression',
        e : 'oo',
        T : 'U',

      }));
      res.end();
    } else {

      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('404: Resource Not Found: return home');
      res.end();

    }
    break;
  case 'POST':
    break;
  default:
    res.writeHead(405, 'Method not supported', {'Content-Type': 'text/plain'});
    res.write('Method not supported');
    res.end();
    break;
  }
});

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (callback) => app.close(callback);
