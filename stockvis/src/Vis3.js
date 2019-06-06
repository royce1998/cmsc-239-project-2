import React, { Component } from 'react';
import './App.css';
import {csv} from 'd3-fetch';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';
import {Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars, SparklinesReferenceLine} from 'react-sparklines';
import Chart from 'chart.js';


class Vis2 extends Component {

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
    const data = this.state.data.map(value => value.price);

    const keys = ["Facebook", "Google", "Amazon"];
    return (
      <div className="App">
        <Sparklines data={data} style={{background: "#00bdcc"}} margin={10} height={60}>
          <SparklinesLine style={{ stroke: "white", fill: "none" }} />
          <SparklinesReferenceLine
              type="mean"
              style={{ stroke: 'white', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
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

export default Vis2;
