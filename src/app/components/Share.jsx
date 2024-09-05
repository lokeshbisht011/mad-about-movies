import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import soundEffectsManager from "@/lib/soundManager";

const Share = ({ url, description }) => {
  return (
    <div className="flex gap-3">
      <FacebookShareButton
        url={url}
        quote={description}
        hashtag={""}
        onClick={() => soundEffectsManager.playSound("click")}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={url}
        title={description}
        onClick={() => soundEffectsManager.playSound("click")}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton
        url={url}
        title={description}
        onClick={() => soundEffectsManager.playSound("click")}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton
        url={url}
        onClick={() => soundEffectsManager.playSound("click")}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <TelegramShareButton
        url={url}
        title={description}
        onClick={() => soundEffectsManager.playSound("click")}
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </div>
  );
};

export default Share;
