
const weekly_profit_btn = document.getElementById("weekly_profit_btn");
const monthly_profit_btn = document.getElementById("monthly_profit_btn");
const annual_profit_btn = document.getElementById("annual_profit_btn");

// construim graficul pe baza ctx si config
let ctx = document.getElementById('chart_profit').getContext('2d');
let config = {
    type: 'line',
    data: {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [{
            label: 'Usage',
            data: [12, 19, 3, 5, 2, 3, 7],
            borderColor: '#6200ea',
            borderWidth: 2,
            fill: false
        }

        ]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        responsive: true
    }
};

let profit_chart = new Chart(ctx, config);
let chart_title = document.getElementById("chart_title");

weekly_profit_btn.addEventListener('click', function () {
    chart_title.innerHTML = 'Current Week Usage';
    profit_chart = new Chart(document.getElementById('chart_profit'), {
        type: 'line',
        data: {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [{
                label: 'Usage',
                data: [12, 19, 3, 5, 2, 3, 7],
                borderColor: '#6200ea',
                borderWidth: 2,
                fill: false
            }

            ]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true
        }
    });
});

monthly_profit_btn.addEventListener('click', function () {
    chart_title.innerHTML = "Current Month Usage";
    profit_chart = new Chart(document.getElementById('chart_profit'), {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '23', '24', '25', '26', '27', '28', '29', '30'],
            datasets: [
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                    label: "January",
                    borderColor: "#ffd11a",
                    fill: false
                },
                {
                    data: [4, 5, 5, 5, 5, 5, 5, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7],
                    label: "February",
                    borderColor: "#ea9c01",
                    fill: false
                },
                {
                    data: [7, 7, 12, 12, 12, 10, 10, 10, 9, 14, 14, 15, 14, 14, 13, 17, 10, 19, 12, 19, 18, 20, 17, 17, 19, 19, 19, 19, 20],
                    label: "March",
                    borderColor: "#ec7814",
                    fill: false
                },
                {
                    data: [20, 20, 19, 24, 22, 22, 25, 25, 27, 27, 27, 27, 27],
                    label: "April",
                    borderColor: "#da3341",
                    fill: false
                },
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    label: "May",
                    borderColor: "#ab0d40",
                    fill: false
                },
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    label: "June",
                    borderColor: "#8c1038",
                    fill: false
                },
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    label: "July",
                    borderColor: "#6039a0",
                    fill: false
                },
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    label: "August",
                    borderColor: "#005b9d",
                    fill: false
                },
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    label: "September",
                    borderColor: "#006db7",
                    fill: false
                },
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    label: "October",
                    borderColor: "#01a6e0",
                    fill: false
                },
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    label: "November",
                    borderColor: "#26b2ba",
                    fill: false
                },
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    label: "December",
                    borderColor: "#54a279",
                    fill: false
                }
            ]
        }, options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true
        }
    });

});


annual_profit_btn.addEventListener('click', function () {
    chart_title.innerHTML = "Current Year Usage";
    profit_chart = new Chart(document.getElementById('chart_profit'), {
        type: 'line',
        data: {
            labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
            datasets: [{
                label: '2020',
                data: [2, 2, 14, 10],
                borderColor: '#ff6666',
                borderWidth: 2,
                fill: false
            }

            ]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true
        }
    })
});