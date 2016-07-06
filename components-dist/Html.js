'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ApplicationStore = require('../stores/ApplicationStore');

var _ApplicationStore2 = _interopRequireDefault(_ApplicationStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Html = function (_React$Component) {
    _inherits(Html, _React$Component);

    function Html() {
        _classCallCheck(this, Html);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Html).apply(this, arguments));
    }

    _createClass(Html, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'html',
                null,
                _react2.default.createElement(
                    'head',
                    null,
                    _react2.default.createElement('meta', { charSet: 'utf-8' }),
                    _react2.default.createElement(
                        'title',
                        null,
                        this.props.context.getStore(_ApplicationStore2.default).getPageTitle()
                    ),
                    _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, user-scalable=no' }),
                    _react2.default.createElement('link', { rel: 'stylesheet', href: '/assets/stylesheets/atomic.css' }),
                    _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' })
                ),
                _react2.default.createElement(
                    'body',
                    { id: 'atomic' },
                    _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: this.props.markup } }),
                    _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: this.props.state } }),
                    _react2.default.createElement('script', { src: '/public/js/' + this.props.clientFile })
                )
            );
        }
    }]);

    return Html;
}(_react2.default.Component);

exports.default = Html;
