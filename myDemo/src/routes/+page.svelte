<script lang="ts">
  import IconBookmark from '@lucide/svelte/icons/bookmark';
  const diagramCircle = 'preset-tonal w-8 aspect-square flex justify-center items-center rounded-full';
</script>

  <div class="preset-tonal-success flex items-center justify-center p-4"
    style="width: calc(100vw - 10px); margin: 3px 5px 2px 5px;">
  
    <span class="text-2xl font-bold">UNIERP - EMERP</span>
    <span class="text-xs ml-5">사용자 ID</span>
  </div>

<div>
    <a href="/00.Login" style="width: calc(100vw - 10px);; justify-content: flex-start; margin: 3px 5px 2px 15px;">
    <button type="button" class="btn preset-tonal-primary" style="width: 100%; justify-content: flex-start;">
        모듈
    </button>
    </a>

    <a href="/T10.Page_Query" style="display: block; width: calc(100vw - 30px); margin: 3px 5px 2px 25px;">
        <button type="button" class="btn preset-outlined-primary-500" style="width: 100%; justify-content: flex-start;">
            T10.Page_Query 이동
        </button>
    </a>
    <a href="/T11.AddRow" style="display: block; width: calc(100vw - 30px); margin: 3px 5px 2px 25px;">
        <button type="button" class="btn preset-outlined-primary-500" style="width: 100%; justify-content: flex-start;">
            T11.AddRow 이동
        </button>
    </a>

  </div>