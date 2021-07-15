const token = require("./auth.json").token;
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.channel.id === "864878446647050257") { 
        let question = new Discord.MessageEmbed()
            .setColor("45196E")
            .setTitle("Q: " + message.content)
            .setDescription("Not answered yet... Please be patient.")
        message.channel.send(question);
        message.delete();
    }
});

client.login(token);