<script>
    import { run } from 'svelte/legacy';

    import TabulatorTable from '$lib/Tabulator/Table_Read.svelte';
    import { minMaxFilterEditor, minMaxFilterFunction } from '$lib/Tabulator/minMaxFilterEditor.js';
    import { onMount } from 'svelte';

    const columns = [
        { title: "ID", field: "id", maxWidth:100, headerFilter:"number", headerFilterPlaceholder:"at least...", headerFilterFunc:">="},
        { title: "Name", field: "name", minWidth:100, maxWidth:200, headerFilter:true, headerFilterPlaceholder:"Find a Person...", headerFilterFunc:"like", headerFilterLiveFilter:true},
        { title: "Age", field: "age", maxWidth:100, headerFilter:minMaxFilterEditor, headerFilterFunc:minMaxFilterFunction, headerFilterLiveFilter:false},
        { title: "Gender", field: "gender", maxWidth:100, editor:"list", editorParams:{values:{"male":"Male", "female":"Female", clearable:true}}, headerFilter:true, headerFilterPlaceholder:"Select...", headerFilterParams:{values:{"male":"Male", "female":"Female", "":""}, clearable:true}}
    ];  

    let layout = $state('fitColumns');
    let data = $state([]);
    let loading = $state(true);
    let error = $state('');

    onMount(async () => {
        try {
            const res = await fetch('/api/users');
            if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
            data = await res.json();
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    run(() => {
        layout = Array.isArray(data)
            ? (loading == false && data.length > 1 ? 'fitData' : 'fitColumns')
            : 'fitColumns';
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
    .tabulator-table-el {
        width: 100%;
        height: 100%;
    }
</style>

<div class="TopArea" style="height: var(--header-height, 80px);">
    <h1>Tabulator Example</h1>
    <p>This is a simple example of using Tabulator with Svelte.</p>
</div>
<div class="tabulator-container" style="height: calc(100vh - var(--header-height, 100px)); 
                                        width: calc(100vw - 6px);">
    <div class="tabulator-table-el" style="margin: 0px 3px 0px 3px;">
        {#if loading}
            <p>Loading...</p>
        {:else if error}
            <TabulatorTable {columns} {data} />
        {:else}
            <p>{layout}</p>
            <TabulatorTable {columns} {data} {layout} />
        {/if}
    </div>
</div>

