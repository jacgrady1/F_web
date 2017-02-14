export default {
    // home: {
    //     path: '/',
    //     method: 'get',
    //     page: 'home',
    //     title: 'Home',
    //     handler: require('../components/Home')
    // },
    video: {
        path: '/',
        method: 'get',
        page: 'video',
        title: 'Video',
        handler: require('../components/Video')
    },
    keywords: {
        path: '/keywords',
        method: 'get',
        page: 'keywords',
        title: 'Keywords',
        handler: require('../components/Keywords')
    }
    // audio: {
    //     path: '/audio',
    //     method: 'get',
    //     page: 'audio',
    //     title: 'Audio',
    //     handler: require('../components/Audio')
    // }
};
