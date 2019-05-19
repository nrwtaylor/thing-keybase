const Bot = require('keybase-bot')

const bot = new Bot()
const username = 'ednabot'
const paperkey = 'treat pear fish asthma spike season sport physical addict fold remind venue lecture'

const var_dump = require('var_dump')

var gearmanode = require('gearmanode');
//var client = gearmanode.client();


bot
  .init(username, paperkey, {verbose: false})
  .then(() => {
    console.log(`Your bot is initialized. It is logged in as ${bot.myInfo().username}`)

    const channel = {name: 'kbot,' + bot.myInfo().username, public: false, topicType: 'chat'}

    // Reply to incoming traffic on all channels
    const onMessage = message => {
    var_dump(message)
    stations =  message.channel.name.split(",")

    const channel = message.channel
    console.log('message received.')

    // https://www.npmjs.com/package/gearmanode
    var client = gearmanode.client();

    var from = message.channel.name
    var to =  message.sender.uid
    var subject = message.content.text.body

    console.log('Heard, "' + subject + '"')

    // This suggests this is a DM so don't need
    // to watch for a keyword
    match = false
    if (stations.length == 1) {
      var to =  message.channel.name
    }

    if (stations.length == 2) {
      match = true;
    }

    if (subject.toLowerCase().includes('ednabot')) {
      match = true;
    }

    if (subject.toLowerCase().includes('edna')) {
      match = true;
    }

    if (subject.toLowerCase().includes('control')) {
      match = true;
    }

      console.log(to);
      console.log(from);
      console.log(subject);
      console.log(match);



    if (match == false) {return;}

    var arr = {"from":from,"to":to,"subject":subject} 
    var datagram = JSON.stringify(arr) 

    try {    
    var job = client.submitJob('call_agent', datagram);
    }

    catch (e) {
      console.log(e);

      var sms = "quiet"
      var message = "Quietness. Just quietness."
    }

    job.on('workData', function(data) {
    //    console.log('WORK_DATA >>> ' + data);
    });

    job.on('complete', function() {

        sms = "sms"
        message = "sms"


      try {
        var thing_report = JSON.parse(job.response);
        var sms = thing_report.sms
        var message = thing_report.message
      }

      catch (e) {
        console.log(e);

        var sms = "quiet"
        var message = "Quietness. Just quietness."
}
        console.log(sms);
        console.log(message);

        bot.chat.send(channel, {body: sms})

        client.close();
      });
    }

    bot.chat.watchAllChannelsForNewMessages(onMessage)

  })
  .catch(error => {
    console.log(error)
  })
