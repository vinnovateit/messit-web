import moment from "moment";
export default function getDates(startDate:Date, endDate:Date) {
    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
        dateArray.push( (currentDate).format('YYYY-MM-DD') )
        currentDate = (currentDate).add(1, 'days');
    }
    return dateArray;
}