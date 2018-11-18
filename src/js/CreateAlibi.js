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
      locationFile: "Choose file...",
      locationData: {},
      showLocationBloom: false,
      bloomArray: ""
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "readfile", function (e) {
      _this.setState({
        showLocationBloom: false
      });

      var reader = new FileReader();
      var locationFile = e.target.value;

      reader.onload = function () {
        var locationData = reader.result;

        _this.setState({
          locationData: locationData
        });

        _this.setState({
          locationFile: locationFile
        });

        console.log(locationData);
        console.log(locationFile);
      };

      reader.readAsText(e.target.files[0]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "processLocationData", function (e) {
      var latitude = new _bloomfilter.BloomFilter(32 * 256, // number of bits to allocate.
      16 // number of hash functions.
      );
      var longitude = new _bloomfilter.BloomFilter(32 * 256, // number of bits to allocate.
      16 // number of hash functions.
      );
      var locationDataJson = JSON.parse(_this.state.locationData)["locations"];

      for (var i = 0; i < locationDataJson.length; i++) {
        var thisLocation = locationDataJson[i];
        latitude.add(thisLocation["latitudeE7"]);
        longitude.add(thisLocation["longitudeE7"]);
      }

      var bloomArray = {
        "latitude": [].slice.call(latitude.buckets),
        "longitude": [].slice.call(longitude.buckets),
        "numLocations": locationDataJson.length
      };
      bloomArray = JSON.stringify(bloomArray);

      _this.setState({
        showLocationBloom: true
      });

      _this.setState({
        bloomArray: bloomArray
      });
    });

    return _this;
  }

  _createClass(CreateAlibi, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_core.Card, null, _react.default.createElement("p", null, "Upload Google Location History file: (", _react.default.createElement("a", {
        href: "https://locationhistoryvisualizer.com/heatmap/",
        target: "_blank"
      }, "How do I get this?"), ")"), _react.default.createElement(_core.FileInput, {
        text: this.state.locationFile,
        fill: true,
        onInputChange: this.readfile
      }), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement(_core.Button, {
        rightIcon: "arrow-right",
        intent: "primary",
        text: "Next step",
        onClick: this.processLocationData
      }), _react.default.createElement("br", null), _react.default.createElement("br", null), this.state.showLocationBloom && _react.default.createElement("div", null, _react.default.createElement("p", null, "Your unique anonymized numbers are below. Please copy and provide to the appropriate authorities."), _react.default.createElement(_core.TextArea, {
        fill: true,
        readOnly: true,
        value: this.state.bloomArray
      })));
    }
  }]);

  return CreateAlibi;
}(_react.Component);

var _default = CreateAlibi;
exports.default = _default;
//# sourceMappingURL=CreateAlibi.js.map