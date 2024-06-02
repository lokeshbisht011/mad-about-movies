import React from 'react'
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
    LinkedinIcon
} from 'next-share';

const Share = ({url, description}) => {
    return (
        <div className='flex gap-3'>
            < FacebookShareButton
                url={url}
                quote={description}
                hashtag={''}
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton >

            <TwitterShareButton
                url={url}
                title={description}
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            <WhatsappShareButton
                url={url}
                title={description}
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <LinkedinShareButton url={url}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>


            <TelegramShareButton
                url={url}
                title={description}
            >
                <TelegramIcon size={32} round />
            </TelegramShareButton>
        </div>
    )
}

export default Share

