const swaggerDocumentation = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager',
    version: '0.0.1',
    description: 'This is demo',
  },

  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Server',
    },
    {
      url: 'http://production',
      description: 'Production Server',
    },
  ],

  tags: [
    {
      name: 'User',
      description: 'User Route',
    },
  ],
  paths: {
    '/api/users/register': {
      get: {
        tags: ['User'],
        summary: 'User SignUp',
        description: 'This is for route signup page',
        responses: {
          400: {
            description: 'Invalid Credentials',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                  example: {
                    name: 'Jhon Doe',
                    email: 'jhon@example.com',
                    password: '1234',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerDocumentation;
