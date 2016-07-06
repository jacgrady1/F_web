'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Audio = function (_React$Component) {
    _inherits(Audio, _React$Component);

    function Audio() {
        _classCallCheck(this, Audio);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Audio).apply(this, arguments));
    }

    _createClass(Audio, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-md-6 col-md-offset-3' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'h3',
                                null,
                                'A piece of music'
                            ),
                            _react2.default.createElement(
                                'audio',
                                { controls: true, ref: 'music', src: 'http://www.alexkatz.me/codepen/music/interlude.mp3' },
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'Your browser does not support the ',
                                    _react2.default.createElement(
                                        'code',
                                        null,
                                        'audio'
                                    ),
                                    ' element '
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { id: 'audioplayer' },
                                _react2.default.createElement(
                                    'button',
                                    { type: 'button', className: 'btn btn-default', 'aria-label': 'Left Align' },
                                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-play', 'aria-hidden': 'true' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { ref: 'timeline', id: 'timeline', onClick: this.onTimelineClick },
                                    _react2.default.createElement('div', { ref: 'playhead', className: 'playhead' })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Audio;
}(_react2.default.Component);

exports.default = Audio;
