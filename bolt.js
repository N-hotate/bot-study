'use strict';

const bolt = require('@slack/bolt');
const dotenv = require('dotenv');
// 環境変数を読み込むための記述
// → process.env.環境変数名 で.envファイルに記述した環境変数が読み込まれる
dotenv.config();

// console.log(`SLACK_APP_TOKEN: ${process.env.SLACK_APP_TOKEN}`);
// console.log(`SLACK_BOT_TOKEN: ${process.env.SLACK_BOT_TOKEN}`);

// Boltライブラリの仕様に沿って設定を記述
const app = new bolt.App({
  token: process.env.SLACK_BOT_TOKEN, 
  appToken: process.env.SLACK_APP_TOKEN, 
  socketMode: true, 
  logLevel: 'debug'
});

// messageメソッド: 引数1の文字列を受け取ったら、引数2の関数を実行する
// アロー関数
app.message(/hello/i, ({message, say}) => {
  say(`こんにちは！ <@${message.user}>さん`); // sayメソッド： メッセージを投稿する関数
});

// 練習問題
app.message('おみくじ', ({message, say}) => {
  const lots = ['大吉', '吉', '中吉', '末吉', '凶'];
  const lot = lots[Math.floor(Math.random() * lots.length)];
  say(`${lot}, <@${message.user}>`);
});

// startメソッド: botアプリケーションを起動させる
app.start();