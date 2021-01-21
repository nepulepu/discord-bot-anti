const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.BOT_TOKEN
const client = new Discord.Client();
const ytdl = require('ytdl-core');

var version = '0.0.1';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! ver:${version}`)
});

var ayat = ['hm ye la manul', 'ok manul', 'thanks manul', 'noted nul'];
var links = ['https://youtu.be/6vmXwO-dgvA', 'https://youtu.be/e3-v-GTNpno'];

var servers = {};
console.log(ayat.length);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


client.on('message', msg => {

    function play(connection, message) {
        var server = servers[message.guild.id];
        server.dispatcher = connection.play(ytdl(links[getRndInteger(0, links.length - 1)], { filter: 'audioonly' }));

        server.queue.shift();
        server.dispatcher.on("end", function() {
            connection.disconnect();
            // message.member.voice.disconnect();
        });

    }

    if (!servers[msg.guild.id]) servers[msg.guild.id] = {
        queue: []
    }
    if (msg.member.id == '693060533976301629') {
        if (!msg.member.voice.channel) {
            msg.reply(ayat[getRndInteger(0, ayat.length - 1)]);

        } else {
            msg.member.voice.channel.join().then(function(connection) {
                play(connection, msg)


            })
            setTimeout(function() { msg.member.voice.channel.leave() }, 7000);
        }

    }
});
client.login(token);