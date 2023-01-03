const formatDate = (timestamp) => {
    
    // Create a date object from the timestamp
    const date = new Date (timestamp)
    // Date is a class. We create a date instance. 

    // Create a list of names for the emonths
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    // Return a formatted date
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(); 
    // .getMonth() is a method that is inherited
    // .getMonth() returns a value from 0 to 11
    // to return the month as a string, the month index value is put into an array of months
}

module.exports = formatDate