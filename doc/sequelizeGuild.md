Sequelize
---
[Sequelize /-CLI With Migrations
](https://izzno.medium.com/sequelize-99d947726cb5)

```angular2html
// sequelize init
$ npx sequelize init 

// generate model
$ npx sequelize model:generate --name Task --attributes taskName:string

$ npx sequelize model:generate --name User --attributes name:string

// apply migration
$ npx sequelize db:migrate

// setup seed
$ npx sequelize seed:generate --name task

// apply seed
$ npx sequelize db:seed:all




```
