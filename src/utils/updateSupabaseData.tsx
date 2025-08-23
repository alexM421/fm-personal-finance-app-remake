//supabase
import { supabase } from "../supabaseClient";
//types
import type { Data } from "../types/DataTypes";

export default async function updateSupabaseData (updateData: Data) {

    const { user_id } = updateData

    const { error } = await supabase.from("appdata").update(updateData).eq("user_id", user_id)

    if(error){
        throw new Error(`Couldn't updated data to supabase : ${error.cause}`)
    }

    const { data } = await supabase.from("appdata").select("*").eq("user_id", user_id)

    if(!data){
        throw new Error("Data is null.")
    }

    localStorage.setItem(`data_${user_id}`, JSON.stringify(data))

}