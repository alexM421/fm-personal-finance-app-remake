//types
import { type Dispatch, type SetStateAction } from "react";
import type { Data } from "../types/DataTypes";
//supabase
import { supabase } from "../supabaseClient";

export default async function syncUserData (userData: Data, setData: Dispatch<SetStateAction<Data>>) {

    const { error } = await supabase
        .from("appdata")
        .update(userData)
        .eq("user_id",userData.user_id)

        if(error){
            throw new Error("couldn't update table")
        }

        const { data } = await supabase
            .from("appdata")
            .select("*")
            .eq("user_id", userData.user_id)
        
        setData(data?.[0])
}