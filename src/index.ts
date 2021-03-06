/** @format */

require("dotenv").config();
const {
	Client,
	MessageEmbed,
	MessageActionRow,
	MessageSelectMenu,
} = require("discord.js");
const axios = require("axios");
const client = new Client({
	intents: ["GUILDS", "GUILD_MESSAGES"],
	partials: ["MESSAGE", "REACTION"],
});

const TorrentSearchApi = require("torrent-search-api");
TorrentSearchApi.enableProvider("1337x");
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
const farewell: string[] = [
	"bye",
	"goodbye",
	"see ya",
	"cya",
	"see you",
	"see you later",
	"goodbye",
	"سلام",
	"باي",
	"تصبحون بخير",
];

const commands: string[] = [
	"commandes",
	"what are the commands",
	"?",
	"شو بتساوي",
	"شو بتعمل",
];
client.once("ready", () => {
	console.log("Ready!");
});
client.on("messageCreate", async (message: any) => {
	if (message.author.bot) return;
	if (message) {
		if (message.author.username === "rihanfoudeh") {
			if (message.content === "لحالك") {
				message.reply(" هل تقصد يوسف ؟ 🤔");
				if (message.content === "yes" || message.content === "نعم") {
					// *** fix this ***\\
					message.reply(`<@861183623825457152> شوف شو بيحكي عليك `);
				}
				if (message.content === "no" || message.content === "لا")
					message.reply(` حريمه`);
			}
		}
	}
	if (commands.includes(message.content.toLowerCase())) {
		message.reply(
			`sending a message starting with ! will call a news api and send you the latest news of rest content of the message and  $ will call a torrent search api and send you the latest torrents of rest content of the message`,
		);
	}
	if (message.content === "are you online") {
		message.reply("yes i am online");
	}
	if (message.content === "yes" || message.content === "YES") {
		const embed = new MessageEmbed()
			.setTitle("Author: the dumb**s javascript bot")
			.setDescription("YES.")
			.setColor("#00ff00")
			.setTimestamp()
			.setThumbnail(
				"https://cdn.discordapp.com/attachments/717087150109879072/717087150109879072/image0.png",
			)
			.setImage(
				"https://i.kym-cdn.com/entries/icons/original/000/031/015/cover5.jpg",
			);

		message.channel.send({ embeds: [embed] });
	}

	if (farewell.includes(message.content.toLowerCase())) {
		if (message.author.username === "Marwan-Zakia") {
			message.reply(" حياك الله");
		} else if (message.author.username === "Ahmad jallad") {
			message.reply(" حياك الله");
		} else if (message.author.username === "rihanfoudeh") {
			message.reply("حريمة");
		} else {
			message.reply(`وعليكم السلام 😊${message.author.username} `);
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
				const randomNumber: number =
					Math.floor(Math.random() * 5) + 1;
				if (newdata && newdata.length !== 0) {
					const embed = new MessageEmbed()
						.setColor("#0099ff")
						.setTitle(
							(newdata[randomNumber]?.title).toString() ?? "no title",
						)
						.setURL(
							newdata[randomNumber]?.link ?? "https://www.google.com",
						)
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
						.setTimestamp();

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
	}
	const newPrefix: string = "$";
	if (message.content.startsWith(newPrefix)) {
		let newMessge: string = message.content.slice(1);
		const torrents: any = await TorrentSearchApi.search(newMessge);

		if (torrents.length !== 0 || torrents !== null) {
			let news: any = torrents.map((item: any) => {
				return {
					label: item?.title?.toString()?.slice(0, 100) || "no title",
					description:
						item?.desc?.slice(0, 100) || "https://www.google.com",
					value:
						item?.desc?.slice(0, 100) || "https://www.google.com",
					url: item?.desc?.slice(0, 100) || "https://www.google.com",
				};
			});

			const row = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId("select")
					.setPlaceholder("Nothing selected")
					.setMinValues(1)
					.setMaxValues(1)
					.addOptions(
						[...news] || [
							{
								label: "Select me",
								description: "This is a description",
								value: "first_option",
							},
						],
					),
			);
			if (row.components[0].options.length !== 0) {
				await message.reply({ components: [row] });
			} else {
				message.reply("no torrents found");
			}
		}
	}
});

client.on("interactionCreate", async (interaction: any) => {
	if (interaction.values) {
		const selected = interaction.values[0];
		interaction.reply(`You selected ${selected}`);
	} else {
		interaction.reply("there was an error");
	}
});
console.log("fdsa");

client.login(process.env.DISCORDJS_BOT_TOKEN);
