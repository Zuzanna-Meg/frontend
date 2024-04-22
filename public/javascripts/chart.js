async function getFunds() {

    const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/budget", {
        method: "GET"
    });

    const result = await response.json();
    return result;

}

function getDatesBetween(startDate, endDate) {
    const dates = [];

    while (startDate <= endDate) {
        dates.push(startDate.toLocaleString('default', { month: 'long' }) + "/" + startDate.getFullYear());

        startDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + 1,
        );
    }

    return dates;
};

async function generateChart() {
    var funds = await getFunds();
    funds.forEach(item => {
        item.date = new Date(item.date)
    });
    funds.sort((a, b) => a.date - b.date);
    budget = [];
    grants = [];

    funds.forEach(item => {
        budget.push({
            x: item.date,
            y: item.funds,
            author: item.author,
            comment: item.comment
        });
        grants.push({
            x: item.date,
            y: item.grants,
            author: item.author,
            comment: item.comment
        });
    });

    const ctx = document.getElementById('fundChart');


    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Funds',
                data: budget,
                borderWidth: 2,
                borderColor: '#ff9bcd',
            },
            {
                label: 'Grant',
                data: grants,
                borderWidth: 2,
                borderColor: '#008000',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        displayFormats: {
                            quarter: 'MMM YYYY'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amount (£)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function (context) {
                            return context[0].label.split(',').slice(0, 2);
                        },
                        afterBody: function (context) {
                            return 'Author: ' + context[0].raw.author + '\nComment: ' + context[0].raw.comment;
                        }
                    }
                }
            }
        }
    });

}

generateChart();

