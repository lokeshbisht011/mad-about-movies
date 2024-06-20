import Swal from "sweetalert2";
import { CHALLENGE_DIALOGUE_TITLE } from "./constants";
import { createRoot } from "react-dom/client";
import Share from "../components/Share";
import toast from "react-hot-toast";

export const challengeFriendPopup = (movieUrl, description) => {
    Swal.fire({
        title: CHALLENGE_DIALOGUE_TITLE,
        html: '<div id="share-container"></div>',
        didOpen: () => {
            const container = document.getElementById('share-container');
            if (container) {
                const root = createRoot(container);
                root.render(
                    <div className='flex items-center justify-center'>
                        <Share url={movieUrl} description={description} />
                    </div>
                );

                Swal.getPopup().addEventListener('willClose', () => {
                    root.unmount();
                });
            }
        },
        showConfirmButton: false,
        width: 500,
    });
}

export const gameCompletedPopup = (title, movieUrl, description) => {
    Swal.fire({
        title: title,
        html: '<div id="share-container"></div>',
        didOpen: () => {
            const container = document.getElementById('share-container');
            if (container) {
                const root = createRoot(container);
                root.render(
                    <div className='flex items-center justify-center'>
                        <Share url={movieUrl} description={description} />
                    </div>
                );

                Swal.getPopup().addEventListener('willClose', () => {
                    root.unmount();
                });
            }
        },
        showConfirmButton: false,
        width: 500,
    });
}

export const giveUp = (markGameCompleted) => {
    toast.dismiss();
    Swal.fire({
        title: "Are you sure you want to give up?",
        showCancelButton: true,
        confirmButtonColor: "#182237",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        width: 500,
    }).then((result) => {
        if (result.isConfirmed) {
            markGameCompleted();
        }
    });
}