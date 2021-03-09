let startingPoint = {
  x: 60/1530,
  y: 742/765
};
let parameter = {
  x: 0.05816993464052288,
  y: 4.509803921568627e-4
};
let d = 0.08169934640522876;

let canvas = document.querySelector("#barChartCanvas");
let width = window.innerWidth, height = width/2;

//console.log(window.innerWidth, canvas.height);


window.addEventListener('resize', () => {
  // console.log(canvas.width, canvas.height);
  width = canvas.width;
  height = width/2;
})
console.log(width, height);

let T20 = {
  data: [81, 132, 96, 126, 137, 98, 138, 163, 127, 128, 127, 79], 
  backgroundColor: [],
  borderColor: [],
  fadedBackgroundColor: [],
  fadedBorderColor: [],
  hoverBackgroundColor: []
};
let OneDay = {
  data: [129, 955, 379, 752, 990, 164, 772, 930, 625, 852, 825, 532], 
  backgroundColor: [], 
  borderColor: [],
  fadedBackgroundColor: [],
  fadedBorderColor: [],
  hoverBackgroundColor: []
};
let Test = {
  data: [4, 834, 121, 1033, 549, 3, 446, 435, 443, 293, 552, 110],
  backgroundColor: [], 
  borderColor: [],
  fadedBackgroundColor: [],
  fadedBorderColor: [],
  hoverBackgroundColor: []
};
let wasHovered = {
  blue: false,
  red: false, 
  green: false
};
let isHovered = {
  blue: false,
  red: false, 
  green: false
};

let isBlue = (x, y) => {
  for(let i = 0; i<13; i++)
  {
    //console.log((startingPoint.x+d*i)*width, (startingPoint.x+d*i+parameter.x)*width,
    //startingPoint.y*height, (startingPoint.y-parameter.y*T20.data[i])*height);
    if(x >= (startingPoint.x+d*i)*width && 
      x <= (startingPoint.x+d*i+parameter.x)*width && y <= startingPoint.y*height
      && y >= (startingPoint.y-parameter.y*T20.data[i])*height)
      return true;
  }
  return false;
};
let isRed = (x, y) => {
  for(let i = 0; i<13; i++)
  {
    //console.log((startingPoint.x+d*i)*width, (startingPoint.x+d*i+parameter.x)*width,
    //startingPoint.y*height, (startingPoint.y-parameter.y*T20.data[i])*height);
    if(x >= (startingPoint.x+d*i)*width && 
      x <= (startingPoint.x+d*i+parameter.x)*width && y <= (startingPoint.y-parameter.y*T20.data[i])*height
      && y >= (startingPoint.y-parameter.y*(T20.data[i]+OneDay.data[i]))*height)
      return true;
  }
  return false;
};
let isGreen = (x, y) => {
  for(let i = 0; i<13; i++)
  {
    //console.log((startingPoint.x+d*i)*width, (startingPoint.x+d*i+parameter.x)*width,
    //startingPoint.y*height, (startingPoint.y-parameter.y*T20.data[i])*height);
    if(x >= (startingPoint.x+d*i)*width && 
      x <= (startingPoint.x+d*i+parameter.x)*width && y <= (startingPoint.y-parameter.y*(T20.data[i]+OneDay.data[i]))*height
      && y >= (startingPoint.y-parameter.y*(T20.data[i]+Test.data[i]+OneDay.data[i]))*height)
      return true;
  }
  return false;
};

$(document).ready(() => {
  let ctx = $('#barChartCanvas');

  for(let i = 0; i<13; i++)
  {
    T20.backgroundColor.push('rgba(37, 171, 219, 0.3)');
    T20.borderColor.push('rgba(37, 171, 219, 1)');
    T20.fadedBackgroundColor.push('rgba(37, 171, 219, 0.1)');
    T20.fadedBorderColor.push('rgba(37, 171, 219, 0.3)');
    T20.hoverBackgroundColor.push('rgba(37, 171, 219, 0.6)');
    OneDay.backgroundColor.push('rgba(219, 33, 101, 0.3)');
    OneDay.borderColor.push('rgba(219, 33, 101, 1)');
    OneDay.fadedBackgroundColor.push('rgba(219, 33, 101, 0.1)');
    OneDay.fadedBorderColor.push('rgba(219, 33, 101, .3)');
    OneDay.hoverBackgroundColor.push('rgba(219, 33, 101, 0.6)');
    Test.backgroundColor.push('rgba(23, 232, 75, 0.3)');
    Test.borderColor.push('rgba(23, 232, 75, 1)');
    Test.fadedBackgroundColor.push('rgba(23, 232, 75, 0.1)');
    Test.fadedBorderColor.push('rgba(23, 232, 75, .3)');
    Test.hoverBackgroundColor.push('rgba(23, 232, 75, 0.6)');
  }

  let data = {
    labels: [
      'Afghanistan',
      'Australia',
      'Bangladesh',
      'England',
      'India',
      'Ireland',
      'New Zealand',
      'Pakistan',
      'South Africa',
      'Sri Lanka',
      'West Indies',
      'Zimbabwe'
    ],
    datasets: [
      {
        label: 'T20 matches won',
        data: T20.data,
        backgroundColor: T20.backgroundColor,
        borderColor: T20.borderColor,
        borderWidth: 1,
      },
      {
        label: 'OneDay matches won',
        data: OneDay.data,
        type: 'bar',
        backgroundColor: OneDay.backgroundColor,
        borderColor: OneDay.borderColor,
        borderWidth: 1,
      },
      {
        label: 'Test matches won',
        data: Test.data,
        type: 'bar',
        backgroundColor: Test.backgroundColor,
        borderColor: Test.borderColor,
        borderWidth: 1,
      }
    ],
  };

  let barChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
          xAxes: [{
              stacked: true
          }],
          yAxes: [{
              stacked: true
          }]
      }
    }
  });

  document.addEventListener('mousemove', e => {
    // console.log(isBlue(e.clientX, e.clientY), isRed(e.clientX, e.clientY)
    // , isGreen(e.clientX, e.clientY));
    // console.log(e.clientX, e.clientY);
    isHovered.blue = isBlue(e.clientX, e.clientY);
    isHovered.red = isRed(e.clientX, e.clientY);
    isHovered.green = isGreen(e.clientX, e.clientY);
    if(!isHovered.blue && wasHovered.blue)
    {
      delete barChart.data.datasets[0].hoverBackgroundColor;
      delete barChart.data.datasets[0].hoverBorderWidth;
      barChart.data.datasets[1].backgroundColor = OneDay.backgroundColor;
      barChart.data.datasets[1].borderColor = OneDay.borderColor;
      barChart.data.datasets[2].backgroundColor = Test.backgroundColor;
      barChart.data.datasets[2].borderColor = Test.borderColor;
      wasHovered.blue = false;
      barChart.update();
    }
    if(!isHovered.red && wasHovered.red)
    {
      barChart.data.datasets[0].backgroundColor = T20.backgroundColor;
      barChart.data.datasets[0].borderColor = T20.borderColor;
      delete barChart.data.datasets[1].hoverBackgroundColor;
      delete barChart.data.datasets[1].hoverBorderWidth;
      barChart.data.datasets[2].backgroundColor = Test.backgroundColor;
      barChart.data.datasets[2].borderColor = Test.borderColor;
      wasHovered.red = false;
      barChart.update();
    }
    if(!isHovered.green && wasHovered.green)
    {
      barChart.data.datasets[0].backgroundColor = T20.backgroundColor;
      barChart.data.datasets[0].borderColor = T20.borderColor;
      barChart.data.datasets[1].backgroundColor = OneDay.backgroundColor;
      barChart.data.datasets[1].borderColor = OneDay.borderColor;
      delete barChart.data.datasets[2].hoverBackgroundColor;
      delete barChart.data.datasets[2].hoverBorderWidth;
      wasHovered.green = false;
      barChart.update();
    }
    if(isHovered.blue && !wasHovered.blue)
    {
      barChart.data.datasets[0].hoverBackgroundColor = T20.hoverBackgroundColor;
      barChart.data.datasets[0].hoverBorderWidth = 3;
      barChart.data.datasets[1].backgroundColor = OneDay.fadedBackgroundColor;
      barChart.data.datasets[1].borderColor = OneDay.fadedBorderColor;
      barChart.data.datasets[2].backgroundColor = Test.fadedBackgroundColor;
      barChart.data.datasets[2].borderColor = Test.fadedBorderColor;
      wasHovered.blue = true;
      barChart.update();
    }
    if(isHovered.red && !wasHovered.red)
    {
      barChart.data.datasets[0].backgroundColor = T20.fadedBackgroundColor;
      barChart.data.datasets[0].borderColor = T20.fadedBorderColor;
      barChart.data.datasets[1].hoverBackgroundColor = OneDay.hoverBackgroundColor;
      barChart.data.datasets[1].hoverBorderWidth = 3;
      barChart.data.datasets[2].backgroundColor = Test.fadedBackgroundColor;
      barChart.data.datasets[2].borderColor = Test.fadedBorderColor;
      wasHovered.red = true;
      barChart.update();
    }
    if(isHovered.green && !wasHovered.green)
    {
      barChart.data.datasets[0].backgroundColor = T20.fadedBackgroundColor;
      barChart.data.datasets[0].borderColor = T20.fadedBorderColor;
      barChart.data.datasets[1].backgroundColor = OneDay.fadedBackgroundColor;
      barChart.data.datasets[1].borderColor = OneDay.fadedBorderColor;
      barChart.data.datasets[2].hoverBackgroundColor = Test.hoverBackgroundColor;
      barChart.data.datasets[2].hoverBorderWidth = 3;
      wasHovered.green = true;
      barChart.update();
    }
  })
  
})