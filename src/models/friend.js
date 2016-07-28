'use strict';
//透過 sequelize 設置 friend model: name, facebookId, email (model define)
module.exports = (sequelize, DataTypes) => {
  var friend = sequelize.define('friend', {
    name: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGAR,
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return friend;
};
