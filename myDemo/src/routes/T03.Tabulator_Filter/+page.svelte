<script>
    import TabulatorTable from '$lib/Tabulator/Table_Read.svelte';
    import { minMaxFilterEditor, minMaxFilterFunction } from '$lib/Tabulator/minMaxFilterEditor.js';

    const columns = [
        { title: "ID", field: "id", headerFilter:"number", headerFilterPlaceholder:"at least...", headerFilterFunc:">="},
        // { title: "Name", field: "name", headerFilter:"input"},
        { title: "Name", field: "name", headerFilter:true, headerFilterPlaceholder:"Find a Person...", headerFilterFunc:"like", headerFilterLiveFilter:true},
        { title: "Age", field: "age", headerFilter:minMaxFilterEditor, headerFilterFunc:minMaxFilterFunction, headerFilterLiveFilter:false},
        { title: "Gender", field: "gender", editor:"list", editorParams:{values:{"male":"Male", "female":"Female", clearable:true}}, headerFilter:true, headerFilterParams:{values:{"male":"Male", "female":"Female", "":""}, clearable:true}}
    ];  

    const data = [
        { id: 1, name: "Alice", age: 5, gender: "Female" },
        { id: 2, name: "Bob", age: 30, gender: "Male" },
        { id: 3, name: "Charlie", age: 28, gender: "Male" }
    ];
</script>

<style>
    .tabulator-container {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .tabulator-table-el {
        width: 100%;
        height: 100%;
    }
</style>

<div class="TopArea" style="height: var(--header-height, 80px);">
    <h1>Tabulator Example</h1>
    <p>This is a simple example of using Tabulator with Svelte.</p>
</div>
<div class="tabulator-container" style="height: calc(100vh - var(--header-height, 80px)); width: 100vw;">
    <div class="tabulator-table-el">
        <TabulatorTable {columns} {data} />
    </div>
</div>

