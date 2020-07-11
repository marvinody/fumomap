<script>
  import FumoMapMarker from "../components/FumoMapMarker.svelte";
  import VisitedMapMarker from "../components/VisitedMapMarker.svelte";
  export let markers;
</script>

{#each markers as { type, latlng: { lat, lng }, label }}
  {#if type === 'fumo'}
    <FumoMapMarker {lat} {lng} {label} />
  {:else if type === 'visit'}
    <VisitedMapMarker {lat} {lng} {label} />
  {/if}
{/each}
