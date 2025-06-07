<script lang="ts">
  import { Datepicker, P } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let from: Date | undefined = undefined;
  export let to: Date | undefined = undefined;

  const dispatch = createEventDispatcher();

  function handleChange() {
    dispatch("change", { from, to });
  }
</script>

<div class="mb-64 md:w-1/2">
  <Datepicker
    range
    bind:rangeFrom={from}
    bind:rangeTo={to}
    
    color="blue"
    placeholder="Select date range"
  
    on:change={handleChange}
  />
  <!-- <P class="mt-4">
    Selected range:
    {from ? from.toLocaleDateString() : "None"} -
    {to ? to.toLocaleDateString() : "None"}
  </P> -->
</div>