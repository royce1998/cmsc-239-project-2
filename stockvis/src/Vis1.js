import React, { Component } from 'react';
import './App.css';
import {csv} from 'd3-fetch';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';
import {Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars} from 'react-sparklines';
import Chart from 'chart.js';


function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

class Vis1 extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

  componentWillMount() {
    csv('https://raw.githubusercontent.com/royce1998/Files/master/points_data.csv')
      .then(data => {
        this.setState({
          data: data,
          loading: false
        });
      });
  }

  render() {

    const {loading, points_data} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    const vis1data = this.state.data.map(value => value.points);

    console.log(vis1data);
    return (
      <div className="App">
        <Sparklines data={vis1data}>
          <SparklinesLine color="blue" />
        </Sparklines>
      </div>
    );
  }
}

export default Vis1;
