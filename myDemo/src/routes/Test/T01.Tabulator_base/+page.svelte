<script>
    import TabulatorTable from '$lib/Tabulator/Table_Read.svelte';

    const columns = [
        { title: "Name", field: "name" },
        { title: "Age asdfg", field: "age" },
        { title: "Gender", field: "gender" }
    ];

    const data = [
        { id: 1, name: "Alice", age: 25, gender: "Female" },
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

