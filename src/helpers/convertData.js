export const converterData = (date,addDay,formato) => {
    let currentDate
    let currentDayOfMonth
    let currentDayOfMonthWhit0
    let currentMonth
    let currentMonthWhit0
    let currentYear
    let TempData

    currentDate=new Date(Math.abs(date.getTime()) + (addDay)*(1000 * 3600 * 24));
    currentDayOfMonth = currentDate.getDate();
    currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    currentYear = currentDate.getFullYear();
    if (currentMonth + 1 <10){currentMonthWhit0='0' + (currentMonth + 1)}else{currentMonthWhit0=(currentMonth+1)}
    if (currentDayOfMonth <10){currentDayOfMonthWhit0='0'+currentDayOfMonth}else{currentDayOfMonthWhit0=currentDayOfMonth}
    if (formato=='DD-MM-YYYY'){TempData = currentDayOfMonthWhit0+ '-' + currentMonthWhit0 + '-' +currentYear;}
    if (formato=='YYYY-MM-DD'){TempData = currentYear+ '-' + currentMonthWhit0 + '-' +currentDayOfMonthWhit0;}
    return TempData
}