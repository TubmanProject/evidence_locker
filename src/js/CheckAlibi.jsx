import React, { Component } from "react";
import { Button, Card, TextArea } from "@blueprintjs/core";
import { BloomFilter } from "bloomfilter";

class CreateAlibi extends Component {
  state = {
    checkLatitude: "",
    checkLongitude: "",
    bloomArray: "",
    showResults: false,
    userResult: false,
    falsePositiveRate: 0,
  };

  processLocationData = (e) => {
    var bloomJson = JSON.parse(this.state.bloomArray);
    var latitude = new BloomFilter(
      bloomJson["latitude"], // number of bits to allocate.
      16        // number of hash functions.
    );
    var longitude = new BloomFilter(
      bloomJson["longitude"], // number of bits to allocate.
      16        // number of hash functions.
    );
    var falsePositiveRate = Math.pow(1 - Math.pow(Math.E, (-1*16*bloomJson["numLocations"])/(32*256)), 16)*100;
    var userResult = latitude.test(this.state.checkLatitude) && longitude.test(this.state.checkLongitude);

    this.setState({ userResult });
    this.setState({ falsePositiveRate });
    this.setState({ showResults: true });
  }

  render() {
    return (
      <Card>
        <p>User's unique anonymized numbers:</p>
        <TextArea fill={true} onChange={(e) => this.setState({ bloomArray: e.target.value })} /><br /><br />
        <p>Latitude and longitude of the crime:</p>
        <input className="bp3-input" type="text" placeholder="Latitude" dir="auto" onChange={(e) => this.setState({ checkLatitude: e.target.value })} />
        <input className="bp3-input" type="text" placeholder="Longitude" dir="auto" onChange={(e) => this.setState({ checkLongitude: e.target.value })} /><br /><br />
        <Button rightIcon="arrow-right" intent="primary" text="Check" onClick={this.processLocationData} /><br /><br />

        {this.state.showResults && <div>
          {this.state.userResult && <p>This user could have been at the scene of crime. <b>The false positive rate is {this.state.falsePositiveRate}%.</b></p>}
          {!this.state.userResult && <p>This user was not at the scene of the crime.</p>}
        </div>}
      </Card>
    );
  }
}

export default CreateAlibi;
