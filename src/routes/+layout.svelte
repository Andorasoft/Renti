<script lang="ts">
  import "$lib/styles/normalize.css";
  import "$lib/styles/base.css";
  import "$lib/styles/theme.css";

  import { goto } from "$app/navigation";
  import { Toasts } from "svoast";

  import { supabase } from "$lib/supabase";

  supabase.auth.onAuthStateChange((event, _) => {
    if (event === "SIGNED_IN") {
      goto("/");
    } else if (event === "SIGNED_OUT") {
      goto("/auth?action=sign-in");
    }
  });
</script>

<slot />
<Toasts position="top-right" />
