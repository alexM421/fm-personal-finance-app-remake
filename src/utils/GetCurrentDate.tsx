export default async function GetCurrentDate () {

    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const res = await fetch(`https://api.api-ninjas.com/v1/worldtime?timezone=${clientTimeZone}`,{
        method: "GET",
        headers: {
            "X-Api-Key": import.meta.env.VITE_API_NINJA_KEY 
        }
    })
    const json = await res.json()
    return json 
}   