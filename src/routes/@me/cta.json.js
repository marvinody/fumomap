import { Marker, User } from "../../db";

const CTAStates = {
  UNAUTHED: "UNAUTHED",
  NO_LOCATION_SET: "NO_LOCATION_SET",
  LOCATION_SET: "LOCATION_SET",
};

// return some status message that tells the user the next steps to do
// possible values for state:
// UNAUTHED
// NO_LOCATION_SET
// LOCATION_SET
export async function get(req, res, next) {
  try {
    if (!req.session.userId) {
      return res.json({
        state: CTAStates.UNAUTHED,
      });
    }

    const marker = await User.getFumoPinForId(req.session.userId);
    if (!marker) {
      return res.json({
        state: CTAStates.NO_LOCATION_SET,
        message: "You haven't set a location",
      });
    }

    return res.json({
      state: CTAStates.LOCATION_SET,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      error: "true",
      message:
        "It seems like something went wrong fetching your call-to-action",
    });
  }
}
