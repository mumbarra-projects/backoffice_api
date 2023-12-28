# Backoffice microservice
This is a backoffice microservice project developed using NestJS, Yarn and MySQL.

## Prerequisites
Make sure you have Node.js, Yarn and Docker installed on your system.

## Configuring MySQL with Docker
Run the following command to launch a MySQL container using Docker:

```
docker run -d --name backoffice-mysql -e MYSQL_ROOT_PASSWORD=your_password -p 3306:3306 mysql:latest
```
This will create a MySQL container and expose port 3306.

## Installation
1. Clone this repository:
```
git clone https://github.com/seu-usuario/seu-repositorio.git
cd your-repository
```

2. Install dependencies with Yarn:
```
yarn install
```

3. Copy the .env.example example file and rename it to .env. Then configure the necessary environment variables.
```
cp .env.example .env
```

## Project Execution
Run the following command to start the server:

```
yarn start:dev
```
The server will be available at http://localhost:3000.

## Versioning
This project follows the semantic versioning convention. The available versions are beta, rc and prod, corresponding to the development, staging and main branches, respectively. Make sure you follow the 0.0.0 version standard when creating new tags.

### Examples of tag creation:

#### Beta: 0.0.1-beta
```
git checkout development
git tag 0.0.1-beta
git push --tags
```

#### Release Candidate (RC): 0.0.1-rc
```
git checkout staging
git tag 0.0.1-rc
git push --tags
```

#### Production (Release): 0.0.1
```
git checkout main
git tag 0.0.1
git push --tags
```