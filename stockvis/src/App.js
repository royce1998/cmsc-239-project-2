import React, { Component } from 'react';
import './App.css';
import {csv} from 'd3-fetch';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';
import {Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars} from 'react-sparklines';

function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

class App extends Component {
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
          data,
          loading: false
        });
      });
  }

  render() {
    const {loading, points_data} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    const data = [
      {x: 0, y: 8},
      {x: 1, y: 5},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 1},
      {x: 5, y: 7},
      {x: 6, y: 6},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 0}
    ];
    const vis1data = this.state.data.map(value => value.points);
    console.log(vis1data);
    return (
      <div className="App">
        <XYPlot height={300} width={300}>
          <LineSeries data={data} />
        </XYPlot>
        <Sparklines data={vis1data}>
          <SparklinesLine color="blue" />
        </Sparklines>

      <Sparklines data={vis1data} limit={20}>
          <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
          <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
      </Sparklines>
      </div>
    );
  }
}

export default App;
