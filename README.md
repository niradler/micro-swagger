# micro-swagger

Import swagger files from aws api gateway, and create a swagger ui for them.

## Usage

```
npm i -g micro-swagger
```

```
Usage: micro-swagger [options] [command]

Options:
  -V, --version    output the version number
  --region         aws region
  --profile        aws profile
  -h, --help       output usage information

Commands:
  start [options]  Start micro-swagger server.
```

```
micro-swagger start -p 3055
```

- visit http://localhost:3055

### AWS credentials

if you have aws cli configure on your machine you dont need to worry about that,
if not you can setup the credentials using one of this two options:

- Loaded from the shared credentials file (~/.aws/credentials)
- Loaded from environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
