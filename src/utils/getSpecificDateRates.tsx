import { supabase } from "../supabaseClient"

export default async function getSpecificDateRates (date: Date) {

    const dayMonthYear = date.toISOString().split("T")[0]

    const specificDateRates = await supabase.from("ratesdata").select("rates").eq("rates_date", dayMonthYear)

    return specificDateRates
}