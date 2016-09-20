export default {
    validateYouTubeUrl(url) {
        if (url !== undefined || url !== '') {
            const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            let match = url.match(regExp);
            if (match && match[1].length === 11) {
                return match[1]; // return youtube id
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
};
