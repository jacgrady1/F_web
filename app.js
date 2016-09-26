import Fluxible from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import devToolsPlugin from 'fluxible-plugin-devtools';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
import VideoStore from './stores/VideoStore';
// create new fluxible instance
const app = new Fluxible({
    component: Application
});

app.plug(fetchrPlugin({
    xhrPath: '/_api',
    xhrTimeout: 300000
}));
app.plug(devToolsPlugin());

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(VideoStore);

module.exports = app;
