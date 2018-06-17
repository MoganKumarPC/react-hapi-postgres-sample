import Hapi from 'hapi';

const server = new Hapi.Server();
let databaseName = "testdb";
process.env.DATABASE_URL=`postgres://postgres:samsung@135@localhost:5432/${databaseName}`;
process.env.DATABASE_SSL=`postgres://postgres:samsung@135@localhost:5432/${databaseName}`;

server.connection( {

    port: 8080,
    routes: { cors: true }

} );

server.register({ // register all your plugins
    register: require('hapi-plugin-pg'),
    options: { 
        connectionString: process.env.DATABASE_URL   
    }
  }, function (err) {
    if (err) {
      // handle plugin startup error
    }
  });

server.route( {

    method: 'GET',
    path: '/hello',
    handler: ( request, reply ) => {

        reply( 'Hello World!' );

    }

} );

server.route( {

    method: 'GET',
    path: '/users',
    handler: ( request, reply ) => {

        let tableName = "testdbschema.users";
        let select = `SELECT * FROM ${tableName}`; 
        request.pg.client.query(select, function(err, result) {
            if (err) { 
                console.log(err);
                // return reply(err).code(500); 
                return reply(err); 
              } 
              if (!result ||  !result.rows || result.rows.length === 0) { 
                return reply({
                  body: "Not Found"
                }).code(404); 
              } 
              return reply(result.rows); 
          })

    }

} );



server.start( err => {

    if( err ) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

} );
