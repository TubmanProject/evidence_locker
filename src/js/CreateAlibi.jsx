import React, { Component } from "react";
import { Button, Card, FileInput, TextArea } from "@blueprintjs/core";
import { BloomFilter } from "bloomfilter";

class CreateAlibi extends Component {
  state = {
    locationFile: "Choose file...",
    locationData: {},
    showLocationBloom: false,
    bloomArray: "",
  };

  readfile = (e) => {
    this.setState({ showLocationBloom: false });
    var reader = new FileReader();
    var locationFile = e.target.value;
    reader.onload = () => {
      var locationData = reader.result;
      this.setState({ locationData });
      this.setState({ locationFile });
      console.log(locationData);
      console.log(locationFile);
    };
    reader.readAsText(e.target.files[0]);
  }

  processLocationData = (e) => {
    var latitude = new BloomFilter(
      32 * 256, // number of bits to allocate.
      16        // number of hash functions.
    );
    var longitude = new BloomFilter(
      32 * 256, // number of bits to allocate.
      16        // number of hash functions.
    );
    var locationDataJson = JSON.parse(this.state.locationData)["locations"];
    for (var i = 0; i < locationDataJson.length; i++) {
      var thisLocation = locationDataJson[i];
      latitude.add(thisLocation["latitudeE7"]);
      longitude.add(thisLocation["longitudeE7"]);
    }

    var bloomArray = {
      "latitude": [].slice.call(latitude.buckets),
      "longitude": [].slice.call(longitude.buckets),
      "numLocations": locationDataJson.length
    }
    bloomArray = JSON.stringify(bloomArray);
    this.setState({ showLocationBloom: true });
    this.setState({ bloomArray })
  }

  render() {
    return (
      <Card>
        <p>Upload Google Location History file: (<a href="https://locationhistoryvisualizer.com/heatmap/" target="_blank">How do I get this?</a>)</p>
        <FileInput text={this.state.locationFile} fill={true} onInputChange={this.readfile} /><br /><br />
        <Button rightIcon="arrow-right" intent="primary" text="Next step" onClick={this.processLocationData} /><br /><br />
        {this.state.showLocationBloom && <div>
          <p>Your unique anonymized numbers are below. Please copy and provide to the appropriate authorities.</p>
          <TextArea
            fill={true}
            readOnly={true}
            value={this.state.bloomArray}
          />
        </div>}
      </Card>
    );
  }
}

export default CreateAlibi;
