const month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const DateString = (dateString) => {
    const myDate = new Date(dateString);
    if (myDate.toDateString() === new Date().toDateString()) {
        return 'Today';
    }
    if (myDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return month[myDate.getMonth()] + ' ' + myDate.getDate() + ', ' + myDate.getFullYear();

    }
}