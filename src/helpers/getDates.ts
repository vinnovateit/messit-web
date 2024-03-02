import moment from "moment";
export  function getDates() {
    let startDate=moment().format('YYYY-MM-DD')
    let endDate=moment().add(1,'M').format('YYYY-MM-DD')
    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
        dateArray.push( (currentDate).format('YYYY-MM-DD') )
        currentDate = (currentDate).add(1, 'days');
    }
    return dateArray;
}
export function getDays(dateArray:string[]){
    let dayArray:string[]=[];
dateArray.forEach((date)=>{
    dayArray.push(moment(date).format('dddd'))
})

return dayArray
}