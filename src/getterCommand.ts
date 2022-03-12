// /** @format */

// import { CommandInteraction, MessageEmbed } from "discord.js";
// import { Command } from "reconlx";

// const { pagination } = require("reconlx");
// const TorrentSearchApi = require("torrent-search-api");
// TorrentSearchApi.enableProvider("1337x");
// // 
// export default class GetterCommand extends Command {
// 	constructor(client) {
// 		super(client, {
// 			name: "getter",
// 			aliases: ["get", "g"],
// 			group: "utility",
// 			memberName: "getter",
// 			description: "Get torrents from 1337x",
// 			args: [
// 				{
// 					key: "query",
// 					prompt: "What do you want to search for?",
// 					type: "string",
// 					default: "",
// 				},
// 			],
// 		});
// 	}

// 	public async run(message: any, args: string[]) {
// 		if (!args[0]) {
// 			return message.channel.send(
// 				"Please enter the name of the torrent you want to search for",
// 			);
// 		}
// 		const torrents = await TorrentSearchApi.search(args.join(" "));
// 		const torrentsEmbed = new MessageEmbed()
// 			.setColor("#0099ff")
// 			.setTitle(`Torrents for ${args.join(" ")}`)
// 			.setDescription(
// 				torrents
// 					.slice(0, 10)
// 					.map((torrent: any, index: number) => {
// 						return `**${index + 1}.** ${torrent.title}`;
// 					})
// 					.join("\n"),
// 			)
// 			.setFooter(
// 				`Use ${message.prefix}getter <torrent number> to view the torrent`,
// 			);
// 		const pages = pagination(torrentsEmbed, {
// 			inline: true,
// 			separator: "\u200b",
// 		});
// 		const torrentPage = await message.channel.send(pages.first());
// 		const filter = (reaction: any, user: any) =>
// 			["◀", "▶"].includes(reaction.emoji.name) &&
// 			user.id === message.author.id;
// 		const collector = torrentPage.createReactionCollector(filter, {
// 			time: 60000,
// 		});
// 	}

// 	async execute(
// 		message: CommandInteraction,
// 		args: string[],
// 	): Promise<void> {
// 		if (args[0]) {
// 			let torrents = await TorrentSearchApi.search(args[0]);
// 			if (torrents.length > 0) {
// 				let page = new pagination.Page(message, torrents, {
// 					color: "#00ff00",
// 					timeout: 0,
// 					controls: {
// 						back: true,
// 						forward: true,
// 						jump: true,
// 					},
// 					embed: {
// 						title: `Torrents for ${args[0]}`,
// 						description: "",
// 						thumbnail: {
// 							url: "https://i.imgur.com/4sjwzGm.png",
// 						},
// 						footer: {
// 							text: "Page",
// 						},
// 						fields: [],
// 					},
// 					paginator: {
// 						type: "embed",
// 					},
// 				});
// 				page.paginate();
// 			} else {
// 				message?.channel?.send(`No torrents found for ${args[0]}`);
// 			}
// 		}
// 	}
// }

// module.exports = GetterCommand;
// /* 
// 	constructor(client: Client) {
// 		super(client, {
// 			name: "getter",
// 			description: "getter",
// 			aliases: ["get"],
// 			group: "getter",
// 			usage: "getter <torrent>",
// 			ownerOnly: false,
// 			guildOnly: false,
// 		});
// 	}

// 	public async run(message: any, args: string[]) {
// 		if (!args[0]) {
// 			return message.channel.send(
// 				"Please enter the name of the torrent you want to search for"
// 			);
// 		}
// 		const torrents = await TorrentSearchApi.search(args.join(" "));
// 		const torrentsEmbed = new MessageEmbed()
// 			.setColor("#0099ff")
// 			.setTitle(`Torrents for ${args.join(" ")}`)
// 			.setDescription(
// 				torrents
// 					.slice(0, 10)
// 					.map((torrent: any, index: number) => {
// 						return `**${index + 1}.** ${torrent.title}`;
// 					})
// 					.join("\n")
// 			)
// 			.setFooter(
// 				`Use ${message.prefix}getter <torrent number> to view the torrent`
// 			);
// 		const pages = pagination(torrentsEmbed, {
// 			inline: true,
// 			separator: "\u200b",
// 		});
// 		const torrentPage = await message.channel.send(pages.first());
// 		const filter = (reaction: any, user: any) =>
// 			["◀", "▶"].includes(reaction.emoji.name) && user.id === message.author.id;
// 		const collector = torrentPage.createReactionCollector(filter, {
// 			time:



// 	async run(message: any, args: any) {
// 		const { search } = args;
// 		const torrents = await TorrentSearchApi.search(search);
// 		if (torrents.length === 0)
// 			return message.channel.send(`No torrents found for ${search}`);
// 		const paginated = pagination.paginate(torrents, {
// 			size: 10,
// 			page: 1,
// 		});
// 		const embed = new MessageEmbed()
// 			.setColor("#0099ff")
// 			.setTitle(`Torrents search for ${search}`)
// 			.setDescription(`Here are the first 10 torrents for ${search}`);
// 		for (let i = 0; i < paginated.length; i++) {
// 			const torrent = paginated[i];
// 			embed.addField(`${torrent.title}`, `${torrent.magnet}`, true);
// 		}
// 		message.channel.send(embed);
// 	}
//  */

// // 	let newMessge: string = message.content.slice(1);
// // 	const torrents: any = await TorrentSearchApi.search(
// // 		newMessge ?? "games",
// // 	);
// // 	console.log(torrents);
// // 	const randomNumber: number = Math.floor(Math.random() * 5) + 1;
// // 	if (torrents && torrents.length !== 0) {
// // 		const embed = new MessageEmbed()
// // 			.setColor("#0099ff")
// // 			.setTitle(
// // 				(torrents[randomNumber]?.title).toString() ?? "no title",
// // 			)
// // 			.setURL(
// // 				torrents[randomNumber]?.desc ?? "https://www.google.com",
// // 			)
// // 			.setDescription(
// // 				torrents[randomNumber]?.title
// // 					?.toString()
// // 					?.slice(0, 500) ?? "no description",
// // 			)
// // 			.setThumbnail(
// // 				torrents[randomNumber]?.desc ??
// // 					"https://i.imgur.com/AfFp7pu.png",
// // 			)

// // 			.setImage(
// // 				torrents[randomNumber]?.desc ??
// // 					"https://i.imgur.com/AfFp7pu.png",
// // 			)
// // 			.setTimestamp()
// // 			.setFooter({
// // 				text: `powered 1337x this has a ${
// // 					torrents[randomNumber]?.size ?? ""
// // 				} `,
// // 				iconURL: "https://i.imgur.com/AfFp7pu.png",
// // 			});
// // 		console.log("hi")
// // 		 message.channel.send({ embeds: [embed] });
// // 	} else if (
// // 		!torrents ||
// // 		torrents.length === 0 ||
// // 		torrents === null
// // 	) {
// // 		message.reply("could not get data becuse no 🥲");
// // 		console.log("err");
// // 	}
// // }
// // },
// // };
// /* 

// 	const newPrefix: string = "*";
// 		if (message.content.startsWith(newPrefix)) {
// 			let newMessge: string = message.content.slice(1);
// 			const torrents: any = await TorrentSearchApi.search(
// 				newMessge ?? "games",
// 			);
// 			console.log(torrents);
// 			const randomNumber: number = Math.floor(Math.random() * 5) + 1;
// 			if (torrents && torrents.length !== 0) {
// 				const embed = new MessageEmbed()
// 					.setColor("#0099ff")
// 					.setTitle(
// 						(torrents[randomNumber]?.title).toString() ?? "no title",
// 					)
// 					.setURL(
// 						torrents[randomNumber]?.desc ?? "https://www.google.com",
// 					)
// 					.setDescription(
// 						torrents[randomNumber]?.title
// 							?.toString()
// 							?.slice(0, 500) ?? "no description",
// 					)
// 					.setThumbnail(
// 						torrents[randomNumber]?.desc ??
// 							"https://i.imgur.com/AfFp7pu.png",
// 					)

// 					.setImage(
// 						torrents[randomNumber]?.desc ??
// 							"https://i.imgur.com/AfFp7pu.png",
// 					)
// 					.setTimestamp()
// 					.setFooter({
// 						text: `powered 1337x this has a ${
// 							torrents[randomNumber]?.size ?? ""
// 						} `,
// 						iconURL: "https://i.imgur.com/AfFp7pu.png",
// 					});

// 				message.channel.send({ embeds: [embed] });
// 			} else if (
// 				!torrents ||
// 				torrents.length === 0 ||
// 				torrents === null
// 			) {
// 				message.reply("could not get data becuse no 🥲");
// 				console.log("err");
// 			}
// 		}

// */
