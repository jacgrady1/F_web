'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _md = require('react-icons/lib/md');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Audioplayer = function (_React$Component) {
    _inherits(Audioplayer, _React$Component);

    function Audioplayer(props) {
        _classCallCheck(this, Audioplayer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Audioplayer).call(this, props));

        _this.state = {
            title: props.trackTitle,
            srcMp3: props.srcMp3,
            srcOgg: props.oggSource,
            isPlaying: props.isPlaying ? true : false,
            currentTime: 0,
            duration: 0,
            volume: props.volume ? props.volume : 0.7,
            isMute: props.isMute ? props.isMute : false
        };
        _this.handlePlayClicked = _this.handlePlayClicked.bind(_this);
        _this.updateProgress = _this.updateProgress.bind(_this);
        _this.handleMediaEnd = _this.handleMediaEnd.bind(_this);
        return _this;
    }

    _createClass(Audioplayer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var self = this;
            var audioElement = self.refs.music;
            audioElement.volume = self.state.volume;
            // TODO handle resize
            audioElement.addEventListener('progress', self.updateProgress);
            audioElement.addEventListener('timeupdate', self.updateProgress);
            audioElement.addEventListener('ended', self.handleMediaEnd);
            self.setState({
                duration: audioElement.duration
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var self = this;
            var audioElement = self.refs.music;
            audioElement.removeEventListener('progress', self.updateProgress);
            audioElement.removeEventListener('timeupdate', self.updateProgress);
            audioElement.removeEventListener('ended', self.handleMediaEnd);
        }
        // button change

    }, {
        key: 'handleMediaEnd',
        value: function handleMediaEnd() {
            this.setState({ isPlaying: false });
        }
    }, {
        key: 'handlePlayClicked',
        value: function handlePlayClicked() {
            var self = this;
            var music = self.refs.music;
            if (self.state.isPlaying) {
                music.pause();
                self.setState({ isPlaying: false });
            } else {
                music.play();
                self.setState({ isPlaying: true });
            }
        }
        // Synchronizes playhead position with current point in audio

    }, {
        key: 'updateProgress',
        value: function updateProgress() {
            var music = this.refs.music;
            var timeline = this.refs.timeline;
            var playhead = this.refs.playhead;
            var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
            var playPercent = timelineWidth * (music.currentTime / music.duration);
            playhead.style.marginLeft = playPercent + 'px';
            //if (music.currentTime == music.duration) {
            //self.setState({isPlaying: false});
            //}
        }
        // Moves playhead as user drags

    }, {
        key: 'moveplayhead',
        value: function moveplayhead(e) {
            var music = this.refs.music;
            var timeline = this.refs.timeline;
            var playhead = this.refs.playhead;
            var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
            var newMargLeft = e.pageX - timeline.offsetLeft;
            if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
                playhead.style.marginLeft = newMargLeft + 'px';
            }
            if (newMargLeft < 0) {
                playhead.style.marginLeft = '0px';
            }
            if (newMargLeft > timelineWidth) {
                playhead.style.marginLeft = timelineWidth + 'px';
            }
        }
    }, {
        key: 'renderButton',
        value: function renderButton() {
            if (this.state.isPlaying === true) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_md.MdPause, { className: 'pause Fz(200%) Scale(2.0, 2.0) Fl(start)', onClick: this.handlePlayClicked })
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_md.MdPlayArrow, { className: 'play Fz(200%) Scale(2.0, 2.0) Fl(start)', onClick: this.handlePlayClicked })
                );
            }
        }
    }, {
        key: 'renderTimeLine',
        value: function renderTimeLine() {
            var playheadProps = {
                ref: 'playhead',
                className: 'playhead W(8px) Pos(a) H(8px) Bdrs(50%) Mt(1px) Bgc(#333)',
                onMouseDown: function onMouseDown() {}
            };
            var bufferbarProps = {
                ref: 'bufferbar',
                className: 'bufferbar W(0px) Pos(a) H(10px) Fl(start) Bdrs(15px) Bgc(#26a69a)'
            };
            return _react2.default.createElement(
                'div',
                { ref: 'timeline', className: 'W(400px) H(10px) Mt(10px) Pos(r) Fl(start) Bdrs(15px) Bgc(#acece6)', onClick: this.onTimelineClick },
                _react2.default.createElement('div', bufferbarProps),
                _react2.default.createElement('div', playheadProps)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.state.duration);
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
                                { controls: true, ref: 'music', src: this.state.srcMp3 },
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
                                this.renderButton(),
                                this.renderTimeLine()
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Audioplayer;
}(_react2.default.Component);

exports.default = Audioplayer;
