<script lang="ts">
  import "$lib/styles/normalize.css";
  import "$lib/styles/base.css";
  import "$lib/styles/theme.css";

  import { goto } from "$app/navigation";
  import { Toasts } from "svoast";

  import { supabase } from "$lib/supabase";
  import { Loader } from "$lib";

  supabase.auth.onAuthStateChange((event, _) => {
    console.log(`Auth state changed to: ${event}`);

    if (event === "SIGNED_IN") {
      goto("/", { replaceState: true });
    } else if (event === "SIGNED_OUT") {
      goto("/auth?action=sign-in", { replaceState: true });
    }
  });
</script>

<slot />
<Toasts position="top-right" />
<Loader />
