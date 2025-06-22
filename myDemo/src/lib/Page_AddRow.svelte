<script lang="ts">
    import { run } from 'svelte/legacy';

    import TabulatorTable from '$lib/Tabulator/Table_Read.svelte';
    
    
    interface Props {
        // columns, fetchData의 api 주소는 외부에서 전달받음
        columns?: any;
        api?: string;
        title?: import('svelte').Snippet;
    }

    let { columns = [], api = '', title }: Props = $props();

    let dateFrom = $state('');
    let dateTo = $state('');
    let searchValue = $state('');
    let data = $state([]);
    let loading = $state(false);
    let saving = $state(false);
    let adding = false;
    let error = $state('');
    // Adjust the type according to the actual TabulatorTable instance type if available
    let tableRef = $state<any>();

    // 날짜가 변경될 때 searchValue에 자동 입력
    $effect(() => {
        if (dateFrom || dateTo) {
            searchValue = [dateFrom, dateTo].filter(Boolean).join(' ~ ');
        }
    });

    // $inspect(api).with((_type, value) => {
    //     console.log(value);
    // });    

    async function fetchData() {
        loading = true;
        error = '';
        try {
            const params = new URLSearchParams({
                dateFrom,
                dateTo,
                searchValue
            });
            
            const res = await fetch(`${api}?${params.toString()}`);
            if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
            data = await res.json();
        } catch (e) {
            error = e instanceof Error ? e.message : String(e);
        } finally {
            loading = false;
        }
    }

    async function saveData() {
        saving = true;
        error = '';
        try {
            fetchData();
        } catch (e) {
            error = e instanceof Error ? e.message : String(e);
        } finally {
            saving = false;
        }
    }

    async function addRow() {
        adding = true;
        error = '';
        try {
            tableRef.addRow({
                id: '',
                name: searchValue,
                age: '',
                gender: '',
                date: ''
            });

            searchValue = '';
        } catch (e) {
            error = e instanceof Error ? e.message : String(e);
        } finally {
            adding = false;
        }
    }

    // data가 변경될 때 TabulatorTable에 적용
    $effect(() => {
        if (tableRef && typeof tableRef.setData === 'function') {
            tableRef.setData(data);
        }
    });
</script>

<style>
    :root {
        --header-height: 128px;
    }
    .toparea-tool {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .toparea-title {
        display: flex;
        font-size: x-large;
    }
    .toparea-btns {
        display: flex;
        gap: 3px;
    }
    .toparea-condition {
        height: 78px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .toparea-condition_date {
        display: flex;
        gap: 3px;
    }
    .toparea-condition_text {
        display: flex;
        gap: 3px;
        margin-top: 3px;
    }
    .tabulator-container {
        width: calc(100vw - 6px);
        height: calc(100vh - var(--header-height, 128px) - 3px);
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .tabulator-table-el {
        width: 100%;
        height: 100%;
    }
</style>

<div class="TopArea">
    <div class="toparea-tool">
        <div class="toparea-title">
            {#if title}{@render title()}{:else}<h1>프로그램 이름...</h1>{/if}
        </div>
        <div class="toparea-btns">
            <button type="button" class="btn preset-outlined-primary-500" onclick={fetchData} disabled={loading}>
                {#if loading}조회 중...{/if}
                <span class="material-icons">조회</span>
            </button>    
            <button type="button" class="btn preset-outlined-primary-500" onclick={saveData} disabled={loading}>
                {#if saving}저장 중...{/if}
                <span class="material-icons">저장</span>
            </button>    
            <button type="button" class="btn preset-outlined-primary-500" onclick={() => history.back()}>
                <span class="material-icons">닫기</span>
            </button>    
        </div>
    </div>
    <div class="toparea-condition">
        <div class="toparea-condition_date">
            <input class="input" type="date" bind:value={dateFrom} />
            <input class="input" type="date" bind:value={dateTo} />
        </div>
        <div class="toparea-condition_text">
            <input
                class="input"
                type="text"
                placeholder="입력..."
                bind:value={searchValue}
                onkeydown={(e) => { if (e.key === 'Enter') addRow(); }}
            />
        </div>
    </div>
</div>

<div class="tabulator-container">
    <div class="tabulator-table-el" style="margin: 0px 3px 0px 3px;">
        {#if error}
            <p style="color:red">{error}</p>
        {/if}
        <TabulatorTable bind:this={tableRef} {columns} {data}/>
    </div>
</div>