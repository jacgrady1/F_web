'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _ApplicationStore = require('../stores/ApplicationStore');

var _ApplicationStore2 = _interopRequireDefault(_ApplicationStore);

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _fluxibleRouter = require('fluxible-router');

var _routes = require('../configs/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*globals document*/

var Application = function (_React$Component) {
    _inherits(Application, _React$Component);

    function Application() {
        _classCallCheck(this, Application);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Application).apply(this, arguments));
    }

    _createClass(Application, [{
        key: 'render',
        value: function render() {
            var Handler = this.props.currentRoute.handler;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Nav2.default, { currentRoute: this.props.currentRoute, links: _routes2.default }),
                _react2.default.createElement(Handler, null)
            );
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var newProps = this.props;
            if (newProps.pageTitle === prevProps.pageTitle) {
                return;
            }
            document.title = newProps.pageTitle;
        }
    }]);

    return Application;
}(_react2.default.Component);

exports.default = (0, _fluxibleAddonsReact.provideContext)((0, _fluxibleRouter.handleHistory)((0, _fluxibleAddonsReact.connectToStores)(Application, [_ApplicationStore2.default], function (context, props) {
    var appStore = context.getStore(_ApplicationStore2.default);
    return {
        pageTitle: appStore.getPageTitle()
    };
})));
