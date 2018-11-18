"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@blueprintjs/core");

var _bloomfilter = require("bloomfilter");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CreateAlibi =
/*#__PURE__*/
function (_Component) {
  _inherits(CreateAlibi, _Component);

  function CreateAlibi() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CreateAlibi);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CreateAlibi)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      checkLatitude: "",
      checkLongitude: "",
      bloomArray: "",
      showResults: false,
      userResult: false,
      falsePositiveRate: 0
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "processLocationData", function (e) {
      var bloomJson = JSON.parse(_this.state.bloomArray);
      var latitude = new _bloomfilter.BloomFilter(bloomJson["latitude"], // number of bits to allocate.
      16 // number of hash functions.
      );
      var longitude = new _bloomfilter.BloomFilter(bloomJson["longitude"], // number of bits to allocate.
      16 // number of hash functions.
      );
      var falsePositiveRate = Math.pow(1 - Math.pow(Math.E, -1 * 16 * bloomJson["numLocations"] / (32 * 256)), 16) * 100;
      var userResult = latitude.test(_this.state.checkLatitude) && longitude.test(_this.state.checkLongitude);

      _this.setState({
        userResult: userResult
      });

      _this.setState({
        falsePositiveRate: falsePositiveRate
      });

      _this.setState({
        showResults: true
      });
    });

    return _this;
  }

  _createClass(CreateAlibi, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_core.Card, null, _react.default.createElement("p", null, "User's unique anonymized numbers:"), _react.default.createElement(_core.TextArea, {
        fill: true,
        onChange: function onChange(e) {
          return _this2.setState({
            bloomArray: e.target.value
          });
        }
      }), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement("p", null, "Latitude and longitude of the crime:"), _react.default.createElement("input", {
        className: "bp3-input",
        type: "text",
        placeholder: "Latitude",
        dir: "auto",
        onChange: function onChange(e) {
          return _this2.setState({
            checkLatitude: e.target.value
          });
        }
      }), _react.default.createElement("input", {
        className: "bp3-input",
        type: "text",
        placeholder: "Longitude",
        dir: "auto",
        onChange: function onChange(e) {
          return _this2.setState({
            checkLongitude: e.target.value
          });
        }
      }), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement(_core.Button, {
        rightIcon: "arrow-right",
        intent: "primary",
        text: "Check",
        onClick: this.processLocationData
      }), _react.default.createElement("br", null), _react.default.createElement("br", null), this.state.showResults && _react.default.createElement("div", null, this.state.userResult && _react.default.createElement("p", null, "This user could have been at the scene of crime. ", _react.default.createElement("b", null, "The false positive rate is ", this.state.falsePositiveRate, "%.")), !this.state.userResult && _react.default.createElement("p", null, "This user was not at the scene of the crime.")));
    }
  }]);

  return CreateAlibi;
}(_react.Component);

var _default = CreateAlibi;
exports.default = _default;
//# sourceMappingURL=CheckAlibi.js.map