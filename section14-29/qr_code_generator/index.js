import { input } from "@inquirer/prompts";
import qr from "qr-image";
import fs from "fs";

console.log("Welcome to the QRCODE Generator!\n");

const answer = await input({ message: 'Enter your URL: ' });

var qr_image = qr.image(answer);
qr_image.pipe(fs.createWriteStream('qrImage.png')); 

console.log(`QRCODE Generated for ${answer}`)