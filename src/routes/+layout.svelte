<script lang="ts">
  import "$lib/styles/normalize.css";
  import "$lib/styles/base.css";
  import "$lib/styles/theme.css";

  import { onMount } from "svelte";
  import { Toasts } from "svoast";

  import { initAuthListener } from "$lib/supabase";
  import { Loader } from "$lib";

  onMount(() => {
    initAuthListener();
  });
</script>

<slot />
<Toasts position="top-right" />
<Loader />
