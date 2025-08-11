export default function formatNumber (number: number){

    const formattedNumber = number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return formattedNumber
}