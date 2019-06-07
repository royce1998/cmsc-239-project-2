import React, { Component } from 'react';
import './App.css';
import {csv} from 'd3-fetch';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';
import {Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars, SparklinesReferenceLine, SparklinesNormalBand} from 'react-sparklines';
import Chart from 'chart.js';
import TreeMap from "react-d3-treemap";
import "react-d3-treemap/dist/react.d3.treemap.css";

class Vis4 extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
    this.dataurl = 'https://raw.githubusercontent.com/royce1998/Files/master/facebook_data.csv';
  }

  componentWillMount() {
    csv(this.dataurl)
      .then(data => {
        this.setState({
          data: data,
          loading: false,
          keyOfInterest: 0
        });
      });
  }

  render() {
    if (this.state.keyOfInterest == 0) {
      this.dataurl = 'https://raw.githubusercontent.com/royce1998/Files/master/facebook_data.csv';
    }
    else if (this.state.keyOfInterest == 1) {
      this.dataurl = 'https://raw.githubusercontent.com/royce1998/Files/master/google_data.csv';
    }
    else {
      this.dataurl = 'https://raw.githubusercontent.com/royce1998/Files/master/amazon_data.csv';
    }
    csv(this.dataurl)
      .then(data => {
        this.setState({
          data: data,
          loading: false,
        });
      });
    const {loading, points_data} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    const data = this.state.data.map(value => value.mkres10);
    const keys = ["Facebook", "Google", "Amazon"];
    return (
      <div className="App">
        <Sparklines data={data} limit={14}>
            <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
            <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
            <SparklinesReferenceLine
                type="mean"
                style={{ stroke: 'red', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
        </Sparklines>
        {Object.keys(keys).map(key => {
          return (<button
            key={key}
            onClick={() => this.setState({keyOfInterest: key})}
            >{keys[key]}</button>);
        })}
      </div>
    );
  }
}

export default Vis4;
