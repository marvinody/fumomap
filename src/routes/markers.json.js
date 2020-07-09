import { Marker, User } from "../db";
export async function get(req, res, next) {
  try {
    const markers = await Marker.findAll({ include: User });

    const simpleMarkers = markers.map((marker) => ({
      latlng: {
        lat: marker.latlng.coordinates[0],
        lng: marker.latlng.coordinates[1],
      },
      username: `${marker.user.username}#${marker.user.discriminator}`,
      desc: marker.desc,
      user_avatar: `${marker.user.avatar}`,
      type: marker.type,
    }));
    res.json(simpleMarkers);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error!",
    });
  }
}
