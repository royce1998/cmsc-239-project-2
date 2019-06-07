import React, {Component} from 'react';

import {RadialChart, Hint} from 'react-vis';

// function groupBy(data, key, month) {
//
//   const array = [];
//
//   key.map((d) => {
//     array.push(data[d + month * 63].volume);
//     });
//   return array;
// }

export default class ExampleChart extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      keyOfInterest: 'February'
    };
  }

  render() {
    const {value, keyOfInterest} = this.state;
    const {data} = this.props;
    const companyKey = [0, 1, 2]
    const keys = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const array = [];
    const month = keys.indexOf(keyOfInterest);
    companyKey.map((d) => {
      array.push(data[d + month * 63].volume);
      });
    const preppedData = Object.entries(array).map(([key, values]) => {
      return {key, size: values};
    });

    return (
      <div>
        <RadialChart
          animation
          innerRadius={80}
          radius={140}
          getAngle={d => d.size}
          data={preppedData}
          onValueMouseOver={v => this.setState({value: v})}
          onSeriesMouseOut={v => this.setState({value: false})}
          width={300}
          height={300}
          padAngle={0.04}
        >
          {value !== false && <Hint value={value} />}
        </RadialChart>
        {Object.keys(keys).map(key => {
          return (<button
            key={key}
            onClick={() => this.setState({keyOfInterest: keys[key]})}
            >{keys[key]}</button>);
        })}
      </div>
    );
  }
}
