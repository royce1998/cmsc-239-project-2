import React, { Component } from 'react';
import './App.css';
import {csv} from 'd3-fetch';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';
import {Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars, SparklinesReferenceLine, SparklinesNormalBand} from 'react-sparklines';
import Chart from 'chart.js';


class Vis3 extends Component {

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
    const data = this.state.data.map(value => value.mkres10_raw);

    const keys = ["Facebook", "Google", "Amazon"];
    return (
      <div className="App">

        <Sparklines data={data} width={200}>
            <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
            <SparklinesNormalBand style={{ fill: "#2991c8", fillOpacity: .1 }} />
        </Sparklines>

        {Object.keys(keys).map(key => {
          console.log(this.state.keyOfInterest);
          return (<button
            key={key}
            onClick={() => this.setState({keyOfInterest: key})}
            >{keys[key]}</button>);
        })}
      </div>
    );
  }
}

export default Vis3;
