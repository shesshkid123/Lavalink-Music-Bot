const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
const { MessageButton, MessageActionRow } = require('discord-buttons')
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      if (args[0]) {
        const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.channel.send(embed.setColor(es.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
        } else if (!cmd && cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`MENU 🔰 **${category.toUpperCase()} [${items.length}]**`)
            .setFooter(`To see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);
            } catch { }
          } else {
            embed.setDescription(`${items.join(", ")}`)
          }
          return message.channel.send(embed)
        }
        if (cmd.name) embed.addField("**<a:arrowRightGlow:933615126760800316> Command name**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`<a:arrowRightGlow:933615126760800316> Detailed Information about: \`${cmd.name}\``);
        if (cmd.description) embed.addField("**<a:arrowRightGlow:933615126760800316> Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**<a:arrowRightGlow:933615126760800316> Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch { }
        if (cmd.cooldown) embed.addField("**<a:arrowRightGlow:933615126760800316> Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField("**<a:arrowRightGlow:933615126760800316> Cooldown**", `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**<a:arrowRightGlow:933615126760800316> Usage**", `\`\`\`${config.prefix}${cmd.usage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        if (cmd.useage) {
          embed.addField("**<a:arrowRightGlow:933615126760800316> Useage**", `\`\`\`${config.prefix}${cmd.useage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        return message.channel.send(embed);
      } else {
        let button_back = new MessageButton().setStyle('green').setID('1').setLabel("<<")
        let button_home = new MessageButton().setStyle('blurple').setID('2').setLabel("🏠")
        let button_forward = new MessageButton().setStyle('green').setID('3').setLabel('>>')
        let button_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/gAGX7mdpkD")
        let button_invite = new MessageButton().setStyle('url').setLabel('Invite Me').setURL("https://discord.com/api/oauth2/authorize?client_id=930297293347913818&permissions=8&scope=applications.commands%20bot")

        let button_cat_information = new MessageButton().setStyle('blurple').setID('button_cat_information').setLabel('​Information').setEmoji("🔰")
        let button_cat_music = new MessageButton().setStyle('blurple').setID('button_cat_music').setLabel('​Music Related').setEmoji("🎶")
        let button_cat_filter = new MessageButton().setStyle('blurple').setID('button_cat_filter').setLabel('Filter').setEmoji("👀")
        let button_cat_queue = new MessageButton().setStyle('blurple').setID('button_cat_queue').setLabel('Queue Related').setEmoji("⚜️")
        let button_cat_settings = new MessageButton().setStyle('blurple').setID('button_cat_settings').setLabel('​Settings').setEmoji("⚙")

        //array of all buttons


        let buttonRow1 = new MessageActionRow()
          .addComponent(button_back).addComponent(button_home).addComponent(button_forward)
          .addComponent(button_dc).addComponent(button_invite)
        let buttonRow2 = new MessageActionRow()
          .addComponent(button_cat_information).addComponent(button_cat_music)
          .addComponent(button_cat_filter).addComponent(button_cat_queue)
          .addComponent(button_cat_settings)


        const allbuttons = [buttonRow1, buttonRow2]
        //define default embed
        let FIRSTEMBED = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter("Page Home\n" + client.user.username + " | Habibi Music", client.user.displayAvatarURL())
          .setTitle(`Information about the  Music Bot: __**${client.user.username}**__`)
          .addField(":muscle: **__My Features__**",
            `>>> An Advanced <:Youtube:933612933018173450> **Youtube System** with **Searching Features**
An advanced <:Spotify:933613004208087050> **Spotify System** with **Audio Filtering**`)
          .addField(":chart_with_upwards_trend: **__STATS:__**",
            `>>> :gear: **${client.commands.map(a => a).length} Commands**
:file_folder: on **${client.guilds.cache.size} Guilds**
⌚️ **${duration(client.uptime).map(i => `\`${i}\``).join(", ")} Uptime**
📶 **\`${Math.floor(client.ws.ping)}ms\` Ping**`)

        //Send message with buttons
        let helpmsg = await message.channel.send({
          content: `***Click on the __Buttons__ to swap the Help-Pages***`,
          embed: FIRSTEMBED,
          components: allbuttons
        });
        //create a collector for the thinggy
        const collector = helpmsg.createButtonCollector(button => !button.clicker.user.bot, { time: 180e3 }); //collector for 5 seconds
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        var edited = false;
        var embeds = [FIRSTEMBED]
        for (const e of allotherembeds())
          embeds.push(e)
        let currentPage = 0;
        collector.on('collect', async b => {
          if (b.clicker.user.id !== message.author.id)
            return b.reply.send(`:x: **Only the one who typed ${prefix}help is allowed to react!**`)
          if (b.id.includes("button_cat_")) {
            //b.reply.send(`***Going to the ${b.id.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
            //information, music, admin, settings, voice, minigames, nsfw
            let index = 0;
            switch (b.id.replace("button_cat_", "")) {
              case "information": index = 0; break;
              case "music": index = 1; break;
              case "filter": index = 2; break;
              case "queue": index = 3; break;
              case "settings": index = 4; break;
            }
            currentPage = index + 1;
            await helpmsg.edit({ embed: embeds[currentPage], components: allbuttons });
            await b.defer();
          } else {
            //page forward
            if (b.id == "1") {
              //b.reply.send("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
              if (currentPage !== 0) {
                await helpmsg.edit({ embed: embeds[currentPage], components: allbuttons });
                await b.defer();
              } else {
                currentPage = embeds.length - 1
                await helpmsg.edit({ embed: embeds[currentPage], components: allbuttons });
                await b.defer();
              }
            }
            //go home
            else if (b.id == "2") {
              //b.reply.send("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
              currentPage = 0;
              await helpmsg.edit({ embed: embeds[currentPage], components: allbuttons });
              await b.defer();
            }
            //go forward
            else if (b.id == "3") {
              //b.reply.send("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
              if (currentPage < embeds.length - 1) {
                currentPage++;
                await helpmsg.edit({ embed: embeds[currentPage], components: allbuttons });
                await b.defer();
              } else {
                currentPage = 0
                await helpmsg.edit({ embed: embeds[currentPage], components: allbuttons });
                await b.defer();
              }
            }
          }
        });

        let d_button_back = new MessageButton().setStyle('green').setID('1').setLabel("<<").setDisabled(true);
        let d_button_home = new MessageButton().setStyle('blurple').setID('2').setLabel("🏠").setDisabled(true);
        let d_button_forward = new MessageButton().setStyle('green').setID('3').setLabel('>>').setDisabled(true);
        let d_button_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/gAGX7mdpkD");
        let d_button_invite = new MessageButton().setStyle('url').setLabel('Invite Me').setURL("https://discord.com/api/oauth2/authorize?client_id=930297293347913818&permissions=8&scope=applications.commands%20bot");

        let d_button_cat_information = new MessageButton().setStyle('blurple').setID('button_cat_information').setLabel('​Information').setEmoji("🔰").setDisabled(true);
        let d_button_cat_music = new MessageButton().setStyle('blurple').setID('button_cat_music').setLabel('​Music Related').setEmoji("🎶").setDisabled(true);
        let d_button_cat_filter = new MessageButton().setStyle('blurple').setID('button_cat_filter').setLabel('Filter').setEmoji("👀").setDisabled(true)
        let d_button_cat_queue = new MessageButton().setStyle('blurple').setID('button_cat_queue').setLabel('Queue Related').setEmoji("⚜️").setDisabled(true)
        let d_button_cat_settings = new MessageButton().setStyle('blurple').setID('button_cat_settings').setLabel('​Settings').setEmoji("⚙").setDisabled(true);


        //array of all buttons


        let d_buttonRow1 = new MessageActionRow()
          .addComponent(d_button_back).addComponent(d_button_home).addComponent(d_button_forward)
          .addComponent(d_button_dc).addComponent(d_button_invite)
        let d_buttonRow2 = new MessageActionRow()
          .addComponent(d_button_cat_information).addComponent(d_button_cat_music)
          .addComponent(d_button_cat_filter).addComponent(d_button_cat_queue)
          .addComponent(d_button_cat_settings)


        const alldisabledbuttons = [d_buttonRow1, d_buttonRow2]
        collector.on('end', collected => {
          edited = true;
          helpmsg.edit({ content: `Time has ended type ${prefix}help again!`, embed: helpmsg.embeds[0], components: alldisabledbuttons })
        });
        setTimeout(() => {
          if (!edited)
            helpmsg.edit({ content: `Time has ended type ${prefix}help again!`, embed: helpmsg.embeds[0], components: alldisabledbuttons })
        }, 180e3 + 150)
      }
      function allotherembeds() {
        var embeds = [];
        var embed0 = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle(`🔰 Information Commands 🔰`)
          .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔰 Info").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
          .setFooter(`Page 1 / 6  | Habibi Music\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
        embeds.push(embed0)
        var embed1 = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle(`🎶 Music Related Commands :notes:`)
          .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🎶 Music").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
          .setFooter(`Page 2 / 6 \nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
        embeds.push(embed1)
        var embed2 = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle(`👀 Filter Related Commands :notes:`)
          .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "👀 Filter").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
          .setFooter(`Page 3 / 6 \nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
        embeds.push(embed2)
        var embed3 = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle(`👀 Queue Related Commands :notes:`)
          .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
          .setFooter(`Page 4 / 6 \nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
        embeds.push(embed3)
        var embed4 = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle(`⚙️ Settings`)
          .setDescription(`⚙️ **Settings**\n> ${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
          .setFooter(`Page 5 / 6  \nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
        embeds.push(embed4)
        var embed5 = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle("Bot Creator")

          .addField(`**__Bot Creator Information__**`, `>>> 💯 This Bot has been made by Habibi & HPRIYAM:\n[Discord](https://discord.gg/gAGX7mdpkD)`)
          .setFooter(`Page 6 / 6  \nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
        embeds.push(embed5)
        return embeds
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`❌ An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
