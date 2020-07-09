import Sequelize from "sequelize";
import db from "./db";

export const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  discriminator: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  discordId: {
    type: Sequelize.STRING,
    unique: true,
  },
});

export const Marker = db.define("marker", {
  type: {
    type: Sequelize.ENUM(["fumo", "visit"]),
    allowNull: false,
    default: "fumo",
  },
  latlng: {
    type: Sequelize.DataTypes.GEOMETRY("POINT"),
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

User.hasMany(Marker);
Marker.belongsTo(User);
