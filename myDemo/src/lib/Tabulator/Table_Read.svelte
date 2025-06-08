<script lang="ts">
  import { TabulatorFull as Tabulator } from 'tabulator-tables';
  import { onMount } from 'svelte';

  export let data: any[] = [];
  export let columns: any[] = [];
  export let layout: any = 'fitData';
  
  let darkMode: boolean = false;
  let tableComponent: HTMLDivElement;
  let table: Tabulator;

  // 다크 모드 여부 체크
  if (typeof window !== 'undefined') {
    darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      darkMode = e.matches;
    });
  }
  
  // 스타일시트 경로를 반응형으로 결정
  $: tabulatorCss = darkMode
    ? [
        'node_modules/tabulator-tables/dist/css/tabulator_midnight.css'
      ]
    : [
        'node_modules/tabulator-tables/dist/css/tabulator_simple.css'
      ];

  onMount(() => {
    table = new Tabulator(tableComponent, {
      data: data,
      reactiveData: true,
      columns: columns,
      layout: layout,
      height: '100%',
      placeholder: "No Data Set",
      headerFilterPlaceholder: "Search...",
      headerFilterLiveFilterFunc: "like",
      headerFilterLiveFilterDelay: 600,
      rowHeader: {
        formatter: "rownum",
        headerSort: false,
        hozAlign: "center",
        resizable: false,
        frozen: true,
        width: 40,
        minWidth: 40,
        maxWidth: 100
      }
    });
  });

  export function setData(newData) {
    if (table) table.replaceData(newData);
  }
</script>

<div bind:this={tableComponent}></div>

<svelte:head>
  {#each tabulatorCss as cssPath}
    <link rel="stylesheet" href={cssPath} />
  {/each}

  <!-- <link href="node_modules\tabulator-tables\dist\css\tabulator_site_dark.css" rel="stylesheet"> -->
  <!-- <link href="node_modules\tabulator-tables\dist\css\tabulator_modern.css" rel="stylesheet"> -->
  <!-- <link href="node_modules\tabulator-tables\dist\css\tabulator.min.css" rel="stylesheet"> -->
  <!-- <link href="node_modules\tabulator-tables\dist\css\tabulator_midnight.css" rel="stylesheet"> -->
  <!-- <link href="node_modules\tabulator-tables\dist\css\tabulator_simple.css" rel="stylesheet"> -->   
</svelte:head>
