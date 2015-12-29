var casper = require('casper').create({
	clientScripts: ["/Projects/jquery.min.js"],
	// verbose: true,
	logLevel: 'debug'
});

var x = require('casper').selectXPath;

casper.userAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36');
//useragent cannot be a mobile useragent

phantom.cookiesEnabled = true;
//phantom.clearCookies();

var fs = require('fs');
var cookies = JSON.stringify(phantom.cookies);
fs.write("cookies.txt", cookies, 644);
var config = require('config.json');

casper.start('https://www.staplesadvantage.com/webapp/wcs/stores/servlet/salogon?storeId=10101&cid=EM%3AContract%3ALink+%28Traditional%29+Supervisor+Created+%28w%2FPDF%29%3Anull%3AAutomated%3Asingle%3AHTML%3AUser', function() {
//must use above url from welcome email from staples to avoid redirect
    this.echo(this.getTitle());
    casper.capture('test.png');
}).viewport(1200, 1000);

casper.waitForSelector(x('//*[@id="MALLLOGON_ROW_COMPANY1"]'), function() {
	this.thenEvaluate(function() {
		$('#MALLLOGON_ROW_COMPANY1').val(config.id);
		$('#MALLLOGON_ROW_USER1').val(config.user);
		$('#MALLLOGON_ROW_PASSWORD1').val(config.pass);
	});
});


casper.wait(1000,function() {
	casper.capture('test1.png');
});	

casper.then(function() {
	casper.click(x('//*[@id="loginActions"]/a[1]'));
});

//if there's already a session in progress, need to log in again - below script tests that and logs in if necessary
casper.wait(7000,function() {
	if(this.exists(x('//*[@id="MALLLOGON_ROW_PASSWORD1"]'))){
		console.log('here');
		this.thenEvaluate(function() {
			$('#MALLLOGON_ROW_PASSWORD1').val(config.pass);
		});
		casper.capture('test2.png');
		casper.then(function() {
			casper.click(x('//*[@id="loginActions"]/div/a[2]'));
		});
	}
});	

casper.wait(7000,function() {
	casper.capture('test3.png');
});

casper.waitForSelector(x('//*[@id="newHeader"]/header/header[1]/nav/div/ul[2]/li[5]/a'), function() {
	casper.click(x('//*[@id="newHeader"]/header/header[1]/nav/div/ul[2]/li[5]/a'));
});

casper.wait(3000,function() {
	casper.capture('test4.png');
});

casper.waitForSelector(x('//*[@id="searchorders"]/a'), function() {  
	casper.click(x('//*[@id="searchorders"]/a'));
});

casper.wait(3000,function() {
	casper.capture('test5.png');
});

casper.waitForSelector(x('//*[@id="container"]/div/div/div[2]/div[2]/div[3]/div[1]/form/a'), function() {  
	casper.click(x('//*[@id="container"]/div/div/div[2]/div[2]/div[3]/div[1]/form/a'));
});

casper.wait(3000,function() {
	casper.capture('test6.png');
	/*this.thenEvaluate(function() {
		var rowcount = $("tbody.ordertable").length;
	});
	this.echo(rowcount);*/
});	

casper.waitForSelector(x('//*[@id="container"]/form/div/div/div[2]/div[2]/div[5]/div[2]/table/tbody[2]/tr[1]/td[2]/a'), function() {  
	casper.click(x('//*[@id="container"]/form/div/div/div[2]/div[2]/div[5]/div[2]/table/tbody[2]/tr[1]/td[2]/a'));
});

casper.wait(3000,function() {
	casper.capture('test7.png');
});

casper.waitForSelector(x('//*[@id="Search For Order Results"]'), function() {  
	casper.click(x('//*[@id="Search For Order Results"]'));
});

casper.waitForSelector(x('//*[@id="orderDetailForm"]/div[3]/div[2]/div[2]/table'), function() {
	this.thenEvaluate(function() {
		// var that = this;
		// that.echo('here');
		// console.log('there');
		// var rows = $('table.orderdetail_table tr').get();
		// var table = $.map(rows, function(row) {
	 // 		var cells = $('td', row).get();
	 // 		that.echo(cells);
	 // 		var rowContents = $.map(cells, function(cell) {
	 // 			casper.echo(cell);
	 //    		return $(cell).html();
	 // 		});
	 // 		return rowContents;
		// });
		// this.echo(table);
		
	});
	var body = $('body').html();
	fs.write("body.html", 'body', 'w');
});


// fs.write("table.txt", table);
// casper.echo(table);

//must logout at end of session
casper.waitForSelector(x('//*[@id="newHeader"]/header/header[1]/nav/div/ul[2]/li[5]/a'), function() {
	casper.click(x('//*[@id="newHeader"]/header/header[1]/nav/div/ul[2]/li[5]/a'));
});

casper.waitForSelector(x('//*[@id="nav_logout"]/a'), function() {  
	casper.click(x('//*[@id="nav_logout"]/a'));
});

casper.wait(3000, function() {
	casper.capture('test8.png');
});


casper.run();


//*[@id="container"]/form/div/div/div[2]/div[2]/div[5]/div[2]/table/tbody[2]/tr[1]/td[2]/a
//*[@id="container"]/form/div/div/div[2]/div[2]/div[5]/div[2]/table/tbody[2]/tr[2]/td[2]/a
//*[@id="container"]/form/div/div/div[2]/div[2]/div[5]/div[2]/table/tbody[2]/tr[21]/td[2]/a