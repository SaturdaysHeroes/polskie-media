import {Twitter} from "./twitter.js";

const message = " Chciałbyś automatycznie otrzymywać wiadomości ze wszystkich polskich mediów? Daj mi followa! Jestem w pełni niezależnym botem retweetującym wszystkie polskie media."
const shouldReply = true; 
const cooldown = 60 * 1000;
var lastReply = Date.now();

Twitter.get("friends/ids", {screen_name: "media_polskie"}, (err, data) => {
    if (err) {
        console.log("[ERROR] " + err);
        return;
    }; 

    const profiles = data.ids
    const stream = Twitter.stream("statuses/filter", {follow: profiles}); 
    stream.on("tweet", (tweet) => {
        if (!profiles.includes(tweet.user.id)) return;

        if (shouldReply && (Date.now() - lastReply > cooldown)) {
            Twitter.post("statuses/update", {status: `@${tweet.user.screen_name} ${message}`, in_reply_to_status_id: tweet.id_str, auto_populate_reply_metadata: true}, (err) => {
                if (err) {
                    console.log("[ERROR] " + err);
                    return;
                };

                console.log("[REPLY] Successfully replied!")
                lastReply = Date.now();
            });
        };

        Twitter.post("statuses/retweet/" + tweet.id_str, {}, (err) => {
            if (err) {
                console.log("[ERROR] " + err);
                return;
            };

            console.log("[RETWEET] Successfully retweeted!");
        });
    });
});