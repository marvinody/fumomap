<script>
  import { onMount, setContext } from "svelte";
  import map from "../map";
  let L;
  export let lat;
  export let lon;
  export let label;

  const addMarker = () => {
    const redIcon = new L.Icon.Default({
      iconUrl: "red-icon.png",
      imagePath: "/marker-icons/"
    });
    console.log({ fumo: redIcon });
    const marker = new L.marker([lat, lon], {
      icon: redIcon
    })
      .addTo($map)
      .bindPopup(label)
      .openPopup();
  };
  onMount(async () => {
    L = await import("leaflet");
    addMarker();
  });
</script>
