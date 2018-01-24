const app = http.createServer((request, response) => {
  logger.log('info','Processing Request');
  logger.log('info',`Method: ${request.method}`);
  logger.log('info',`URL: ${request.url}`);
  
requestParser.parse(request)
    .then(request => {
      if (request.method === 'GET' && request.url.pathname === '/'){
        response.writeHead(200,{ 'Content-Type' : 'text/html' });
        response.write(`<!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>
            </head>
            <body>
             <header>
               <nav>
                 <ul>
                   <li><a href="/cowsay">cowsay</a></li>
                 </ul>
               </nav>
             <header>
             <main>
               <p>Click the link to see what the cow 'say'!</p>
             </main>
            </body>
          </html>`);
        logger.log('info','Responding  with a 200 status code');
        response.end();
        return;
      } if (request.method === 'GET' && request.url.pathname === '/cowsay'){
        response.writeHead(200,{ 'Content-Type' : 'text/html' });
        let message = cowsay.say({text: 'I need something good to say!'});
        if (request.url.query.text) message = cowsay.say(request.url.query);
        response.write(`<!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>
            </head>
            <body>
              <h1> cowsay </h1>
              <pre>${message}</pre>
            </body>
          </html>`);
        logger.log('info','Responding  with a 200 status code');
        response.end();
        return;
      } if (request.method === 'POST' && request.url.pathname === '/api/cowsay'){
        if (request.body.text === undefined){
          response.writeHead(400,{ 'Content-Type' : 'application/json' });
          response.write('{"error" : "invalid request: text required"}');
          response.end();
          return;
        }
        response.writeHead(200,{ 'Content-Type' : 'application/json' });
        response.write(`{"content": "${request.body.text}"}`);
        response.body = cowsay.say({text: `${request.body.text}`});
        response.end();
        return;
      }
      response.writeHead(404,{ 'Content-Type' : 'text/plain' });
      response.write('Not Found');
      logger.log('info','Responding with a 404 status code');
      response.end();
      return;
    }).catch(error => {
      logger.log('info','Answering with a 400 status code');
      logger.log('info', error);
      let message = '{"error": invalid request: text query required}';
      if (request.method === 'POST' && request.body === undefined){
        message = '{"error" : "invalid request: body required"}';
      }
      response.writeHead(400,{ 'Content-Type' : 'text/plain' });
      response.write(`${message}`);
      response.end();
      return;
    });
});
