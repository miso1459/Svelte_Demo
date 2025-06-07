<script lang="ts">
  import { TabulatorFull as Tabulator } from 'tabulator-tables';
  import { onMount } from 'svelte';

  export let data: any[] = [];
  export let columns: any[] = [];

  let tableComponent: HTMLDivElement;

  onMount(() => {
    new Tabulator(tableComponent, {
      data: data, // link data to table
      reactiveData: true, // enable data reactivity
      columns: columns, // define table columns
      layout: 'fitData',
      responsiveLayout: 'hide', // hide columns on smaller screens
      height: '100%', // set table height

      headerFilterLiveFilterDelay:600, // delay for live filtering

      // rowFormatter: (row) => {
      //   // custom row formatting
      //   const element = row.getElement();
      //   element.style.backgroundColor = row.getData().age > 20 ? '#f8d7da' : '#d4edda'; // color rows based on age
      // },
    });
  });
</script>

<div bind:this={tableComponent}></div>

<svelte:head>
  <!-- <link href="node_modules\tabulator-tables\dist\css\tabulator_site_dark.css" rel="stylesheet"> -->
  <link href="node_modules\tabulator-tables\dist\css\tabulator_modern.css" rel="stylesheet">
  
</svelte:head>
