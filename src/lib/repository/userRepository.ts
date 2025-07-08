import { supabase } from "$lib/supabase";
import { User } from "$lib";

const userRepository = {
  async getAll() {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .order("created_at", { ascending: false });

    return error ? [] : data.map(User.fromJSON);
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", id)
      .single();

    return error ? null : User.fromJSON(data);
  },

  async getByEmail(email: string) {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email)
      .single();

    return error ? null : User.fromJSON(data);
  }
};

export default userRepository;