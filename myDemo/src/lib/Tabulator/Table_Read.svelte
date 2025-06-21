<script lang="ts">
  import { TabulatorFull as Tabulator } from 'tabulator-tables';
  import { onMount } from 'svelte';

  interface Props {
    data?: any[];
    columns?: any[];
    layout?: any;
  }

  let { data = [], columns = [], layout = 'fitData' }: Props = $props();
  
  let darkMode: boolean = $state(false);
  let tableComponent: HTMLDivElement | undefined = $state();
  let table: Tabulator;
 
  // 스타일시트 경로를 반응형으로 결정
  let tabulatorCss = $derived(darkMode
    ? [
        '/tabulator_midnight.css'
      ]
    : [
        '/tabulator_simple.css'
      ]);

  onMount(() => {
    // 다크 모드 여부 체크
    if (typeof window !== 'undefined') {
      darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        darkMode = e.matches;
      });
    }

    if (tableComponent) {
      table = new Tabulator(tableComponent, {
        data: data,
        //reactiveData: true,
        columns: columns,
        layout: layout,
        height: '100%',
        placeholder: "No Data Set",
        headerFilterLiveFilterDelay: 600,
        rowHeader: {
          formatter: "rownum",
          headerSort: false,
          hozAlign: "center",
          resizable: false,
          frozen: true,
          width: 40,
          minWidth: 40
        }
      });
    }
  });

  let isTableReady = false;

  export function setData(newData) {
    // tableBuilt 이벤트는 테이블 생성 시 1회만 등록
    if (!isTableReady) {
        table.on("tableBuilt", function () {
            isTableReady = true;
            table.replaceData(newData.slice());
        });
        return;
    }

    // 테이블이 이미 준비된 경우 바로 데이터 교체
    table.replaceData(newData.slice());
  }

  export function addRow(rowData) {
    if (table) table.addRow(rowData, true);
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
