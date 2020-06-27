import axios from "axios";
import { stores } from "@sapper/app";
import { notifier } from "sveltoaste";

export default async function () {
  const { session } = stores();
  await axios.post("/auth/logout");
  session.update((s) => {
    delete s.username;
    delete s.discord_token;
    return s;
  });

  notifier.success("You have been logged out!");
}
