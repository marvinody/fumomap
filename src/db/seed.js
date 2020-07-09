console.log("seeding");
import { Marker, User, db } from "./index";

(async function () {
  await db.sync({ force: true });
  await db.query("CREATE EXTENSION IF NOT EXISTS postgis;");
  const user = await User.create({
    discordId: "84736430886096896",
    username: "Manny",
    discriminator: "2038",
    avatar: "6ef74b9471ae128658ef7369426e6585",
  });

  await Marker.create({
    userId: user.id,
    type: "fumo",
    description: "manny's fumos",
    latlng: {
      type: "Point",
      coordinates: [35.8225, -84.04],
    },
  });

  await Marker.create({
    userId: user.id,
    type: "fumo",
    description: "manny's fumos",
    latlng: {
      type: "Point",
      coordinates: [35.8225, -84.0],
    },
  });
})();
