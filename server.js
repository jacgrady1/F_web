/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/server';
import app from './app';
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';

//services
import ytdlService from './services/ytdlService';

const env = process.env.NODE_ENV;

const debug = debugLib('f-web');

const server = express();

// Get access to the fetchr plugin instance
const fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our services
fetchrPlugin.registerService(ytdlService);

server.use(compression());
server.use(bodyParser.json());

server.use('/public', express['static'](path.join(__dirname, '/build')));
server.use('/assets', express['static'](path.join(__dirname, '/public')));
// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use((req, res, next) => {
    const context = app.createContext({
       req: req, // The fetchr plugin depends on this
       debug: (req.query.debug === "true") // needed to enable devtools
       // xhrContext: {
       //     _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
       // }
    });

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                // Pass through to next middleware
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const markup = ReactDOM.renderToString(createElementWithContext(context));
        const htmlElement = React.createElement(HtmlComponent, {
            clientFile: env === 'production' ? 'main.min.js' : 'main.js',
            context: context.getComponentContext(),
            state: exposed,
            markup: markup
        });
        const html = ReactDOM.renderToStaticMarkup(htmlElement);

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
