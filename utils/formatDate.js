const formatDate = (timestamp) => {
    
    // Create a date object from the timestamp
    const dateObj = new Date (timestamp)
    // Date is a class. We create a date instance. 

    // Create a list of names for th emonths
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    // Return a formatted date
    return months[date.getMonth()] + '' + date.getDate() + ', ' + date.getFullYear(); 
    // getMonth is a method that is inherited
}

module.exports = formatDate