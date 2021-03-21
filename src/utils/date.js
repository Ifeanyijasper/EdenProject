const month = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

export const DateString = (dateString) => {
    const myDate = new Date(dateString);
    if (myDate.getDate().toString() === new Date().getDate().toString()) {
        return 'Today';
    }
    if (myDate.getDate().toString() === (Number(new Date().getDate()) - 1).toString()) {
        return 'Yesterday';
    } else {
        return month[myDate.getMonth()] + ' ' + myDate.getDate() + ', ' + myDate.getFullYear();

    }
}