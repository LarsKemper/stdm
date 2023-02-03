## Folder structure

`/controllers`: Controlls our api routes

`/jobs`: Not important. Just cron jobs

`/models`: Database models

`/routes`: Define the api routes

`/services`: Serve all extra functionalities of our api

`/shared`: Other stuff. Types, Enums, Exceptions, ...

## API Reference

#### Register new user

```http
  POST /api/{version}/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required** |
| `lastName` | `string` | **Required** |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Login user

```http
  POST /api/{version}/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required** |
| `password`      | `string` | **Required** |

## Enviroment Variables

| Name | Optional     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `NODE_ENV`      | true | Default: `development` |
| `PORT`      | true | Default: `8080`- Server port |
| `API_VERSION`      | false | Available: `v1` |
| `JWT_SECRET_KEY`      | true | Default: `secret` |
| `DB_PORT`      | false | Database port |
| `DB_HOST`      | false | Database host |
| `DB_USER`      | false | Database user |
| `DB_PWD`      | false | Database password |
| `DB_NAME`      | false | Database name |

