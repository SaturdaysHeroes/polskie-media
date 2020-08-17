import {Twitter} from "./twitter.js";

// Profile IDs to follow.
const profiles = [
    47295451, // TVP Info 
    14493047, // TVN 24
    2383788666, // Polsat News
    15720598, // Onet
    194399035, // Rzeczpospolita
    53054655, // Newsweek Polska
    1073461458, // Telewizja Republika
    153802461 // wPolityce
];
const message = " Chciałbyś automatycznie otrzymywać wiadomości ze wszystkich polskich mediów? Daj mi followa! Jestem w pełni niezależnym botem retweetującym wszystkie polskie media."
const shouldReply = true; 
const cooldown = 180 * 1000
var lastReply = Date.now();

const stream = Twitter.stream("statuses/filter", {follow: profiles}); 
stream.on("tweet", (tweet) => {
    if (!profiles.includes(tweet.user.id)) return;

    if (shouldReply && (Date.now() - lastReply > cooldown)) {
        Twitter.post("statuses/update", {status: `@${tweet.user.screen_name} ${message}`, in_reply_to_status_id: tweet.id_str, auto_populate_reply_metadata: true}, (err) => {
            if (err) throw err;

            console.log("[REPLY] Successfully replied!")
            lastReply = Date.now();
        });
    };

    Twitter.post("statuses/retweet/" + tweet.id_str, {}, (err) => {
        if (err) throw err;

        console.log("[RETWEET] Successfully retweeted!");
    });
});