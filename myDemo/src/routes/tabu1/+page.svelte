<script lang="ts">
    import { TabulatorFull as Tabulator } from 'tabulator-tables';    
    
    let tableEl: HTMLDivElement | null = null;

    let tableData = [
        { id: 1, name: "John", age: 29, gender: "male" },
        { id: 2, name: "Jane", age: 32, gender: "female" },
        { id: 3, name: "Steve", age: 41, gender: "male" },
    ];

    let columnsConfig = [
        { title: "ID", field: "id", width: 100, headerFilter: true },
        { title: "Name", field: "name" },
        { title: "Age", field: "age", width: 80 },
        { title: "Gender", field: "gender" }
    ];

    var table = new Tabulator("#example-table", {
            data: tableData,
            columns: [  { title: "ID", field: "id", width: 100, headerFilter: true },
                        { title: "Name", field: "name" },
                        { title: "Age", field: "age", width: 80 },
                        { title: "Gender", field: "gender" }
                    ],
            layout: "fitColumns",
            responsiveLayout: "hide",
            height: "100%",
            reactiveData: true,
    });    

</script>

<style>

    .tabulator-container {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

</style>

<div class="TopArea" style="height: var(--header-height, 80px);">
    <h1>Tabulator Example</h1>
    <p>This is a simple example of using Tabulator with Svelte.</p>
</div>
<div class="tabulator-container" style="height: calc(100vh - var(--header-height, 80px)); width: 100vw;">
    <!-- <div class="tabulator-table-el" bind:this={tableEl}></div> -->
    <div id="example-table"></div>
</div>

