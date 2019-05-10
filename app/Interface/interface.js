module.exports = {

	// Get Current Date in a cute string
	getDateStringCustom: function(){
	    var oDate = new Date();
	    var sDate;
	    sDate = oDate.getYear() + 1900
	        + '/'
	        + ((oDate.getMonth() + 1 < 10) ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1)
	        + '/' + oDate.getDate()
	        + ' - ' + oDate.getHours()
	        + ':' + ((oDate.getMinutes() < 10) ? '0' + (oDate.getMinutes()) : oDate.getMinutes())
	        + ':' + ((oDate.getSeconds() < 10) ? '0' + (oDate.getSeconds()) : oDate.getSeconds());
	    return sDate;
	}

}