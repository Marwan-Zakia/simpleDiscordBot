/** @format */

const { pagination } = require("reconlx");
const TorrentSearchApi = require("torrent-search-api");
TorrentSearchApi.enableProvider("1337x");
const { Client, message, MessageEmbed } = require("discord.js");

module.exports = {

	name: "getter",
	description: "getter",
	async run(client: any, message: any, args: any) {
	
		const newPrefix: string = "*";
		if (message.content.startsWith(newPrefix)) {
				console.log("args");
			let newMessge: string = message.content.slice(1);
			const torrents: any = await TorrentSearchApi.search(
				newMessge ?? "games",
			);
			console.log(torrents);
			const randomNumber: number = Math.floor(Math.random() * 5) + 1;
			if (torrents && torrents.length !== 0) {
				const embed = new MessageEmbed()
					.setColor("#0099ff")
					.setTitle(
						(torrents[randomNumber]?.title).toString() ?? "no title",
					)
					.setURL(
						torrents[randomNumber]?.desc ?? "https://www.google.com",
					)
					.setDescription(
						torrents[randomNumber]?.title
							?.toString()
							?.slice(0, 500) ?? "no description",
					)
					.setThumbnail(
						torrents[randomNumber]?.desc ??
							"https://i.imgur.com/AfFp7pu.png",
					)

					.setImage(
						torrents[randomNumber]?.desc ??
							"https://i.imgur.com/AfFp7pu.png",
					)
					.setTimestamp()
					.setFooter({
						text: `powered 1337x this has a ${
							torrents[randomNumber]?.size ?? ""
						} `,
						iconURL: "https://i.imgur.com/AfFp7pu.png",
					});
				console.log("hi")
				 message.channel.send({ embeds: [embed] });
			} else if (
				!torrents ||
				torrents.length === 0 ||
				torrents === null
			) {
				message.reply("could not get data becuse no 🥲");
				console.log("err");
			}
		}
	},
};
/* 

	const newPrefix: string = "*";
		if (message.content.startsWith(newPrefix)) {
			let newMessge: string = message.content.slice(1);
			const torrents: any = await TorrentSearchApi.search(
				newMessge ?? "games",
			);
			console.log(torrents);
			const randomNumber: number = Math.floor(Math.random() * 5) + 1;
			if (torrents && torrents.length !== 0) {
				const embed = new MessageEmbed()
					.setColor("#0099ff")
					.setTitle(
						(torrents[randomNumber]?.title).toString() ?? "no title",
					)
					.setURL(
						torrents[randomNumber]?.desc ?? "https://www.google.com",
					)
					.setDescription(
						torrents[randomNumber]?.title
							?.toString()
							?.slice(0, 500) ?? "no description",
					)
					.setThumbnail(
						torrents[randomNumber]?.desc ??
							"https://i.imgur.com/AfFp7pu.png",
					)

					.setImage(
						torrents[randomNumber]?.desc ??
							"https://i.imgur.com/AfFp7pu.png",
					)
					.setTimestamp()
					.setFooter({
						text: `powered 1337x this has a ${
							torrents[randomNumber]?.size ?? ""
						} `,
						iconURL: "https://i.imgur.com/AfFp7pu.png",
					});

				message.channel.send({ embeds: [embed] });
			} else if (
				!torrents ||
				torrents.length === 0 ||
				torrents === null
			) {
				message.reply("could not get data becuse no 🥲");
				console.log("err");
			}
		}

*/
