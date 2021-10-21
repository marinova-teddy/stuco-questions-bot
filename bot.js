const token = require("./auth.json").token;
const Discord = require("discord.js");
const client = new Discord.Client();

function formatTimestamp(timestamp) {
    let date = new Date(timestamp);
    date = date.getDate().toLocaleString(undefined, {minimumIntegerDigits: 2})
        + "." + date.getMonth().toLocaleString(undefined, {minimumIntegerDigits: 2})
        + "." + date.getFullYear()
        + " at " + date.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2})
        + ":" + date.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
    return date;
}

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.id === "864878446647050257") { 
        if (!message.content.startsWith("!!")) {
            //message is a question
            let question = new Discord.MessageEmbed()
                .setColor("8c8c8c") // grey - submitted, not answered
                .setTitle("Q: " + message.content)
                .setDescription("*Not answered yet... Please be patient.*")
                .setFooter("Asked on " + formatTimestamp(message.createdTimestamp))
            message.channel.send(question);
            message.delete();
        }
        else {
            //message is an answer
            //!!should check if author is stuco member
            if (message.content.startsWith("!!answer")) {
                if (message.reference != null) {
                    let answer = message.content.slice(9);
                    let name = "Anonymous";
                    let msg = await message.channel.messages.fetch(message.reference.messageID);
                    let embed = msg.embeds[0]
                        .addField(name, "A: " + answer, false)
                        .setColor("00cc00") // green - answered
                        .setDescription('')
                        .setFooter(msg.embeds[0].footer.text + "\nAnswered on " + formatTimestamp(message.createdTimestamp))
                    msg.edit(embed);
                    message.delete();
                }
            }
            if (message.content.startsWith("!!lock")) {
                if (message.reference != null) {
                    let msg = await message.channel.messages.fetch(message.reference.messageID);
                    let embed = msg.embeds[0]
                    if (embed.fields.length === 0) {
                        embed.setColor("cc0000"); //red - locked, no answer
                    } else {
                        embed.setColor("#e69500"); //orange - locked, answered
                    }
                    embed
                        .setDescription("*This question has been locked.*")
                        .setFooter(msg.embeds[0].footer.text + "\nLocked on " + formatTimestamp(message.createdTimestamp))
                    msg.edit(embed);
                    message.delete();
                }
            }
        }
    }
});


client.login(token);