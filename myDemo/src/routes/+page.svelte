<script>
    import TabulatorTable from '$lib/Tabulator/Table_Read.svelte';
    import { minMaxFilterEditor, minMaxFilterFunction } from '$lib/Tabulator/minMaxFilterEditor.js';
    
    import DateRange from '$lib/Flowbite/DateRange.svelte';

    let from = undefined;
    let to = undefined;

    function handleDateChange(event) {
        from = event.detail.from;
        to = event.detail.to;
    }

    //-----------------------------------------------------------------------------------------------------
        
    const columns = [
        { title: "ID", field: "id", maxWidth:100, headerFilter:"number", headerFilterPlaceholder:"at least...", headerFilterFunc:">="},
        { title: "Name", field: "name", minWidth:100, maxWidth:200, headerFilter:true, headerFilterPlaceholder:"Find a Person...", headerFilterFunc:"like", headerFilterLiveFilter:true},
        { title: "Age", field: "age", maxWidth:100, headerFilter:minMaxFilterEditor, headerFilterFunc:minMaxFilterFunction, headerFilterLiveFilter:false},
        { title: "Gender", field: "gender", maxWidth:100, editor:"list", editorParams:{values:{"male":"Male", "female":"Female", clearable:true}}, headerFilter:true, headerFilterPlaceholder:"Select...", headerFilterParams:{values:{"male":"Male", "female":"Female", "":""}, clearable:true}}
    ];  

    let data = [];
    let loading = false;
    let error = '';

    // TabulatorTable에 접근할 수 있도록 ref 선언
    let tableRef;

    async function fetchData() {
        loading = true;
        error = '';
        try {
            const res = await fetch('/api/users');
            if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
            data = await res.json();
        } catch (e) {
            error = e instanceof Error ? e.message : String(e);
        } finally {
            loading = false;
        }
    }

    // data가 변경될 때 TabulatorTable에 적용
    $: if (tableRef && typeof tableRef.setData === 'function') {
        tableRef.setData(data);
    }
</script>

<style>
    :root {
        --header-height: 300px;
    }
    .tabulator-container {
        width: calc(100vw - 6px);
        height: calc(100vh - var(--header-height, 100px) - 3px);
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .tabulator-table-el {
        width: 100%;
        height: 100%;
    }
    .fetch-btn {
        margin: 16px 0 8px 0;
        padding: 8px 16px;
        font-size: 1rem;
    }
</style>

<div class="TopArea" style="height: var(--header-height, 300px);">
    <button class="fetch-btn" on:click={fetchData} disabled={loading}>
        {#if loading}불러오는 중...{/if}
        {#if !loading}데이터 가져오기{/if}
    </button>

    <h2>DateRange.svelte 사용 예시</h2>
    <div style="width: 220px; height:40px"><DateRange bind:from bind:to on:change={handleDateChange} />
    </div>
    <p>{from}</p>
    <p>{to}</p>

    <h1>Tabulator Example</h1>

</div>

<div class="tabulator-container">
    <div class="tabulator-table-el" style="margin: 0px 3px 0px 3px;">
        {#if error}
            <p style="color:red">{error}</p>
        {/if}

        <TabulatorTable bind:this={tableRef} {columns} {data} />
    </div>
</div>

