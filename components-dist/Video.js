'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPlayer = require('react-player');

var _reactPlayer2 = _interopRequireDefault(_reactPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Video = function (_React$Component) {
    _inherits(Video, _React$Component);

    function Video() {
        _classCallCheck(this, Video);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Video).apply(this, arguments));
    }

    _createClass(Video, [{
        key: 'handleClick',
        value: function handleClick() {
            this.refs.player.seekTo(1000.1);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h2',
                    null,
                    'Video'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Welcome to the site!'
                ),
                _react2.default.createElement(_reactPlayer2.default, { url: 'https://www.youtube.com/watch?v=_r9w3hE0s0U', playing: true, ref: 'player' }),
                _react2.default.createElement(
                    'button',
                    { onClick: this.handleClick.bind(this) },
                    ' seekToButton'
                ),
                _react2.default.createElement(
                    'button',
                    { className: 'btn btn-lg btn-primary' },
                    ' Primay '
                )
            );
        }
    }]);

    return Video;
}(_react2.default.Component);

exports.default = Video;
