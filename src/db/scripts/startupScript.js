db.createCollection("users");

db.users.insert({name:'marvin', userName:'matt', password:'1234', isAdmin:true, roles: []});

db.createCollection("tokens");

db.createCollection("roles");

db.roles.insert({roleName:'admin'});
db.roles.insert({roleName:'user'});
db.roles.insert({roleName:'operator'});
db.roles.insert({roleName:'reader'});
