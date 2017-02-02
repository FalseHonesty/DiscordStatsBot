var jsonfile = require('jsonfile');
var Discord = require('discord.js');
var quiche = require('quiche');
var client = new Discord.Client();
var config = jsonfile.readFileSync('config.json');
var later = require('later');
var messages = {
	hour: 0,
	day: {
		total: 0,
		hour0: 0, hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0,
		hour6: 0, hour7: 0, hour8: 0, hour9: 0, hour10: 0, hour11: 0,
		hour12: 0, hour13: 0, hour14: 0, hour15: 0, hour16: 0, hour17: 0,
		hour18: 0, hour19: 0, hour20: 0, hour21: 0, hour22: 0, hour23: 0
	},
	week: {
		total: 0,
		day0: 0,  day1: 0, day2: 0, day3: 0,
		day4: 0, day5: 0, day6: 0
	}
}

client.login(config.key);

var hourly = later.setInterval(function () {
	collectHourlyStats();
}, later.parse.cron('0 * * * *'));

var daily = later.setInterval(function () {
	sendDailyStats(true);
}, later.parse.cron('0 23 * * 0'));

var weekly = later.setInterval(function () {
	sendWeeklyStats(true);
}, later.parse.cron('0 23 * * *'));

client.on('ready', () => {
	console.log("Ready!");
})

client.on('message', msg => {
	if(msg.channel.id == config.statsChannel){
		if(msg.content.startsWith('!')){
			if(msg.content.startsWith('!dayStats')){
				sendDailyStats(false);
			} else if (msg.content.startsWith('!weekStats')){
				sendWeeklyStats(false);
			} else if (msg.content.startsWith('!collect')){
				collectHourlyStats();
			}
		}
		return;
	} else {
		messages.hour++;
	}
});

function collectHourlyStats() {
	messages.day.total += messages.hour;
	messages.day["hour" + new Date().getHours()] = messages.hour;
	messages.hour = 0;
}

function sendDailyStats(remover) {
	messages.week.total += messages.day.total;
	messages.week["day" + new Date().getDay()] = messages.day.total;
	var graph = quiche('line');
	var data = [];

	for (key in messages.day){
		if (key != "total"){
			data.push(messages.day[key]);
		}
	}

	graph.setTitle("Today's statistics!");
	graph.addData(data, 'Messages', '000000');
	var hours = [];
	for(var i = 0; i < 24; i++){
		hours.push(i + ":00");
	}
	graph.addAxisLabels('x', hours)
	graph.setHostname('image-charts.com');
	graph.setHeight(350);
	graph.setWidth(500);
	
	client.channels.get(config.statsChannel).sendFile(graph.getUrl(true), "day_statistics.png");

	if(remover){
		messages.day.total = 0;
		for (key in messages.day){
			if (key != "total"){
				messages.day[key] = 0;
			}
		}
	}
}

function sendWeeklyStats(remover) {
	var graph = quiche('line');
	var data = [];

	for (key in messages.week){
		if (key != "total"){
			data.push(messages.week[key]);
		}
	}

	graph.setTitle("This Week's statistics!");
	graph.addData(data, 'Messages', '000000');
	graph.addAxisLabels('x', ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])
	graph.setHostname('image-charts.com');
	graph.setHeight(350);
	graph.setWidth(500);

	client.channels.get(config.statsChannel).sendFile(graph.getUrl(true), "week_statistics.png");

	if(remover){
		for(key in messages.week){
			messages.week[key] = 0;
		}
	}
}