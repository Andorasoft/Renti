<script lang="ts">
  import { page } from '$app/stores';
</script>

<div>
  <p>{$page.url.pathname}{$page.url.search}</p>
</div>