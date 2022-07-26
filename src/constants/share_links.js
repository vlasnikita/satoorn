import { HOSTING_ADDRESS, SERVICE_NAME } from "Constants/routes";
import { apply } from "file-loader";
import socialTg from "Static/social/social-telegram.svg";
import socialVk from "Static/social/social-vk.svg";
import socialTw from "Static/social/social-twitter.svg";
import socialFb from "Static/social/social-facebook.svg";


const commonChareContext = `${HOSTING_ADDRESS}/challenges
/$challengeId&text=Принял челлендж "$challengeTitle" на ${SERVICE_NAME}`

class ShareTemplate {
    baseUrl;
    imgSrc;
    alt;
    constructor(baseUrl, imgSrc, alt) {
        this.baseUrl = baseUrl
        this.imgSrc = imgSrc,
        this.alt = alt
    }

    apply = (challengeId, challengeTitle) => {
        return this.baseUrl + commonChareContext
        .replace('$challengeId', challengeId)
        .replace('$challengeTitle', challengeTitle)
    }
}

export const TG_TEMPLATE = new ShareTemplate(
    'https://telegram.me/share/url?url=', 
    socialTg, 
    'Telegram',
)

export const VK_TEMPLATE = new ShareTemplate(
    'https://vk.com/share.php?url=', 
    socialVk, 
    'VK',
)

export const TWITTER_TEMPLATE = new ShareTemplate(
    'https://twitter.com/intent/tweet?url=', 
    socialTw, 
    'Twitter',
)

export const FB_TEMPLATE = new ShareTemplate(
    'https://www.facebook.com/sharer.php?url=',
    socialFb,
    'Facebook'
)