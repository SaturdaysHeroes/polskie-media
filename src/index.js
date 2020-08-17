import {Twitter} from "./twitter.js";

// Profile IDs to follow.
// TVP Info, TVN 24, Polsat News, Onet, Rzeczpospolita, NewsweekPolska. 
const profiles = [47295451, 14493047, 2383788666, 15720598, 194399035, 53054655];

const stream = Twitter.stream("statuses/filter", {follow: profiles}); 
stream.on("tweet", (tweet) => {
    if (!profiles.includes(tweet.user.id)) return;

    Twitter.post("statuses/update", {status: "Chciałbyś automatycznie otrzymywać wiadomości ze wszystkich polskich mediów? Daj mi followa już dziś!", in_reply_to_status_id: tweet.id_str}, (err) => {
        if (err) throw err;

        console.log("[REPLY] Successfully replied!")
    });

    Twitter.post("statuses/retweet/" + tweet.id_str, {}, (err) => {
        if (err) throw err;

        console.log("[RETWEET] Successfully retweeted!");
    });
});