<script lang="ts">
  import "$lib/styles/normalize.css";
  import "$lib/styles/base.css";
  import "$lib/styles/theme.css";

  import { Toasts } from "svoast";
</script>

<slot />
<Toasts position="top-right" />
