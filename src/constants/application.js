// @flow
export const BLANK_USR = {
  name: '',
  email: '',
  emailV: '',
  photoURL: '',
  uid: '',
  accessToken: '',
  providerData: ''
}

export const LOGO_COLOR = "#7EBA4C"

export const COLORS = [ "#787878", "#444444", "#7EBA4C" ]

export const SECTION_COLORS = [
  "#f44336", "#E91E63", "#9C27B0",
  "#673AB7", "#3F51B5", "#2196F3",
  "#03A9F4", "#00BCD4", "#009688",
  "#4CAF50", "#8BC34A", "#CDDC39",
  "#FFEB3B", "#FFC107", "#FF9800",
  "#FF5722", "#795548", "#9E9E9E",
  "#607D8B"
]

export const findDistinct = (array, key) => {
  var seen = []
  var info = array.filter((dat)=>{
    if (dat[key] !== undefined && seen.indexOf(dat[key]) === -1){
      seen.push(dat[key])
      return dat
    }
  })
  return info
}

export const LINE_CHART_TEST = {
   chart: {
     type: 'area'
   },
   credits: {
       enabled: false
   },
   title: {
     text: ''
   },
   subtitle: {
     text: ''
   },
   xAxis: {
     allowDecimals: false,
     labels: {
       formatter: function () {
         return this.value; // clean, unformatted number for year
       }
     }
   },
   yAxis: {
     title: {
       text: 'Leaning'
     }
//     labels: {
//       formatter: function () {
//         return this.value / 1000 + 'k';
//       }
//     }
   },
//   tooltip: {
//     pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
//   },
   plotOptions: {
     area: {
       pointStart: 0,
       marker: {
         enabled: false,
         symbol: 'circle',
         radius: 2,
         states: {
           hover: {
             enabled: true
           }
         }
       }
     }
   },
   series: [{
     name: 'USA',
     data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
       1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
       27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
       26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
       24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
       22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
       10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
   }]
 }

export const DRILL_BAR_TEST = {
  series: [{
    colorByPoint: true,
    data: [{
      name: '2015',
      y: 33860,
      drilldown: '2015'
    }, {
      name: '2016',
      y: 33290,
      drilldown: '2016'
    }, {
      name: '2017',
      y: 34023,
      drilldown: '2017'
    }]
  }],
  drilldown: {
    series: [{
      id: '2015',
      name: 'RAF 2015',
      data: [
        ['RAF', 1.187],
        ['Opportunity', 0.251],
        ['Projected RAF', 1.437],
      ]
    }, {
      id: '2016',
      name: 'RAF 2016',
      data: [
        ['RAF', 1.243],
        ['Opportunity', 0.241],
        ['Projected RAF', 1.484],
      ]
    }, {
      id: '2017',
      name: 'RAF 2017',
      data: [
        ['RAF', 0.937],
        ['Opportunity', 0.381],
        ['Projected RAF', 1.318],
      ]
    }]
  }
}

export const INFO_CHART_TEST = [
  { name: 'Members', name_sub: 'in 2015', num: 20181, num_sub: '78.5%' },
  { name: 'Members', name_sub: 'in 2016', num: 23689, num_sub: '72.1%' },
  { name: 'Members', name_sub: 'in 2017', num: 27348, num_sub: '77.3%' },
]

export const DONUT_CHART_TEST = [
  [["Captured",67],["Missed",33]],
  [["Captured",54],["Missed",46]],
  [["Captured",21],["Missed",79]]
]