/** @format */

import axios from "axios";
import Commando from "discord.js-commando";
const { RichEmbed } = require("discord.js");
export default class GetterCommand extends Commando.Command {
	constructor(clinet: any) {
		super(clinet, {
			description: "get news from newsdata.io",
			name: "news",
			aliases: ["news"],
			group: "general",
			memberName: "news",
		});
	}
	async run(message: any, args: any): Promise<any> {
		let newMessge: string = args;
		let newdata: any;
		const url = `https://newsdata.io/api/1/news?apikey=${
			process.env.Api
		}&q=${newMessge ?? "games"}`;
		axios
			.get(url)
			.then((res: any) => {
				newdata = res.data.results;
				return newdata;
			})
			.catch((err: any) => console.log(err));
		console.log(newdata);

		if (!newdata) {
			message.reply(
				"sorry couldn`t find what you were looking for 🥲",
			);
			console.log("err");
		}
		let embed = new RichEmbed()
			.setTitle("news")
			.setColor("#0099ff")
			.setDescription(`${newdata[0].title}`)
			.setImage(`${newdata[0].image}`)
			.setURL(`${newdata[0].url}`)
			.setFooter(`${newdata[0].source}`);
		message.channel.send(embed);
	}
}

/** 

async execute(message: any, args: string[]) {
        let newMessge: string = message.content.slice(1);
        let newdata: any;
        const url = `https://newsdata.io/api/1/news?apikey=${process.env.Api}&q=${newMessge ?? "games"}`;
        axios

            .get(url)
            .then((res: any) => {
                newdata = res.data.results;
                return newdata;
            })
            .catch((err: any) => console.log(err));
        console.log(newdata);
         
        if (!newdata) {
            message.reply("sorry couldn`t find what you were looking for 🥲";
            console.log("err");
  
**/
