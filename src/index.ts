/** @format */

import path from "path";

require("dotenv").config();
const {
	Client,
	WebhookClient,
	Intents,
	MessageMentions,
	MessageEmbed,
	Discord,
} = require("discord.js");
const fs = require("fs");
const axios = require("axios");
//hello
// Create a new client instance
const client = new Client({
	intents: ["GUILDS", "GUILD_MESSAGES"],
	partials: ["MESSAGE", "REACTION"],
});

// When the client is ready, run this code (only once)
// client.once('ready', () => {
// 	console.log('Ready!');
// });
const prefix: string = "!";
const greetings: string[] = [
	"hello",
	"hi",
	"hey",
	"sup",
	"yo",
	"what's up",
	"what's up?",
	"هلا",
	"هيلو",
	"السلام عليكم",
	"مرحبا",
	"مرحبا بكم",
	"هاي",
];
client.on("messageCreate", async (message: any) => {
	if (message) {
		if (message.author.username === "rihanfoudeh") {
			if (message.content === "لحالك") {	
					message.reply(" هل تقصد يوسف ؟ 🤔");
				if (message.content === "yes" || message.content === "نعم") {
			         message.reply(`<@861183623825457152> شوف شو بيحكي عليك `);
				}
				if (message.content === "no" || message.content === "لا") 	message.reply(` حريمه`);	
				
			}
		}
		}

	
	if (message.content === "js" || message.content === "javascript") {
		message.channel.send({
			files: [
				{
					attachment: "assets/java.png",
					name: "java.png",
				},
			],
		});
	}
	if (greetings.includes(message.content.toLowerCase())) {
		if (message.author.username === "Marwan-Zakia") {
			message.reply("hello there how are you Marwan 👑");
		} else if (message.author.username === "Ahmad jallad") {
			message.reply("hello 👑👑");
		} else if (message.author.username === "rihanfoudeh") {
			message.reply(" كيف حالك ؟ يا حريمة 🤔");
		} else {
			message.reply(
				`hello there how are you ${message.author.username} `,
			);
		}
	}

	// if (message.content === "help") {
	// 	message.channel.send({
	// 		files: [
	// 			{
	// 				attachment: "assets/help.png",
	// 				name: "help.png",
	// 			},
	// 		],
	// 	});
	// }

	if (message.content.startsWith(prefix)) {
		let newMessge: string = message.content.slice(1);
		let newdata: any;
		const url = `https://newsdata.io/api/1/news?apikey=${
			process.env.Api
		}&q=${newMessge ?? "games"}`;
		axios
			.get(url)
			.then((res: any) => {
				let er = false;
				newdata = res.data.results;
				const randomNumber = Math.floor(Math.random() * 10) + 1;
				if (newdata && newdata.length !== 0) {
					const embed = new MessageEmbed()
						.setColor("#0099ff")
						.setTitle((newdata[randomNumber]?.title).toString())
						.setURL(newdata[randomNumber]?.link)
						.setDescription(
							newdata[randomNumber]?.full_description
								?.toString()
								?.slice(0, 500) ?? "no description",
						)
						.setThumbnail(
							newdata[randomNumber]?.image_url ??
								"https://i.imgur.com/AfFp7pu.png",
						)

						.setImage(
							newdata[randomNumber]?.image_url ??
								"https://i.imgur.com/AfFp7pu.png",
						)
						.setTimestamp()
						.setFooter({
							text: "powered by newsdata.io",
							iconURL: "https://i.imgur.com/AfFp7pu.png",
						});
					er = true;
					message.channel.send({ embeds: [embed] });
				} else if (
					(er === false && !newdata) ||
					newdata.length === 0 ||
					newdata === null
				) {
					message.reply("could not get data becuse no 🥲");
					console.log("err");
				}
			})

			.catch((err: any) => console.log(err));
		console.log(url);
	}
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
