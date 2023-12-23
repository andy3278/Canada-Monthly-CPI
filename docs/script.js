
// Load JSON data
Promise.all([
    fetch('./data/Canada_CPI_11012022_11012023.json').then(response => response.json()),
    fetch('./data/Canada_Unemployment_rate.json').then(response => response.json()),
    fetch('./data/Canada_earnings.json').then(response => response.json())
])
.then(([data1, data2, data3]) => {
    // target month 
    const targetMonth = 13;
    // Extract the months and CPI values from the data
    const months = data1.map(item => new Date(item.Date).toLocaleDateString());

    const allItems = data1.map(item => item['All-items']);
    const food = data1.map(item => item['Food']);
    const shelter = data1.map(item => item['Shelter']);
    const household = data1.map(item => item['Household']);
    const clothing = data1.map(item => item['Clothing']);
    const transportation = data1.map(item => item['Transportation']);
    const health = data1.map(item => item['Health']);
    const recreation = data1.map(item => item['Recreation']);
    const alcohol = data1.map(item => item['Alcohol-tobacco-cannabis']);




    // KPI 1
    const CPIThisMonth = data1[data1.length - 1]['All-items'];
    const CPIPreviousMonth = data1[data1.length - 2]['All-items'];
    const CPIPreviousYear = data1[data1.length - targetMonth]['All-items'];
    var CPIDiff = CPIThisMonth - CPIPreviousMonth;
    var CPIYearDiff = (CPIThisMonth - CPIPreviousYear)/CPIPreviousYear * 100;
    var CPIDiffString;
    var colorClass;
    CPIDiff = CPIDiff.toFixed(2);
    CPIYearDiff = CPIYearDiff.toFixed(2);

    if (CPIDiff > 0) {
        var CPIDiffString = `+ ${CPIDiff} (last month)`;
        colorClass = 'red';
    } else if (CPIDiff < 0) {
        var CPIDiffString = `- ${CPIDiff} (last month)`;
        colorClass = 'green';
    } else {
        var CPIDiffString = "No change (last month)";
        colorClass = 'unchanged';
    }
    var CPIYearDiffString;
    var YearDiffcolorClass;
    if (CPIYearDiff > 0) {
        var CPIYearDiffString = `+ ${CPIYearDiff}% (last year)`;
        YearDiffcolorClass = 'red';
    } else if (CPIYearDiff < 0) {
        var CPIYearDiffString = `- ${CPIYearDiff}% (last year)`;
        YearDiffcolorClass = 'green';
    } else {
        var CPIYearDiffString = "No change (last year)";
        YearDiffcolorClass = 'unchanged';
    }
    var kpi1Div = document.getElementById('kpi1');
    kpi1Div.innerHTML = `<span class="kpi-value">${CPIThisMonth}</span> <span class="kpi-change ${YearDiffcolorClass}">${CPIYearDiffString}</span>`;
    
    // KPI 2
    const UnemployThisMonth = data2[data2.length - 1]['Unemployment rate'];
    const UnemployPreviousMonth = data2[data2.length - 2]['Unemployment rate'];
    var UnemployDiff = UnemployThisMonth - UnemployPreviousMonth;
    UnemployDiff = UnemployDiff.toFixed(2);
    if (UnemployDiff > 0) {
        var UnemployDiffString = `+ ${UnemployDiff}% (last month)`;
        colorClass = 'red';
    } else if (UnemployDiff < 0) {
        var UnemployDiffString = `- ${UnemployDiff}% (last month)`;
        colorClass = 'green';
    } else {
        var UnemployDiffString = "No change (last month)";
        colorClass = 'unchanged';
    }
    var kpi2Div = document.getElementById('kpi2');
    kpi2Div.innerHTML = `<span class="kpi-value">${UnemployThisMonth}%</span> <span class="kpi-change ${colorClass}">${UnemployDiffString}</span>`;
    
    // KPI 3
    const EarningThisMonth = data3[data3.length - 1]['Average weekly earnings'];
    const EarningPreviousYear = data3[data3.length - targetMonth]['Average weekly earnings'];
    var EarningYearDiff = (EarningThisMonth - EarningPreviousYear)/EarningPreviousYear * 100;
    EarningYearDiff = EarningYearDiff.toFixed(2);
    
    if (EarningYearDiff > 0) {
        var EarningYearDiffString = `+ ${EarningYearDiff}% (last year)`;
        colorClass = 'green';
    } else if (EarningYearDiff < 0) {
        var EarningYearDiffString = `- ${EarningYearDiff}% (last year)`;
        colorClass = 'red';
    } else {
        var EarningYearDiffString = "No change (last year)";
        colorClass = 'unchanged';
    }
    var kpi3Div = document.getElementById('kpi3');
    kpi3Div.innerHTML = `<span class="kpi-value">$${EarningThisMonth}</span> <span class="kpi-change ${colorClass}">${EarningYearDiffString}</span>`;
    // Get the context of the canvas element we want to select
    var ctx = document.getElementById('cpiChart').getContext('2d');

    // Create the line chart
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'All items',
                data: allItems,
                backgroundColor: '#F94144',
                borderColor: '#F94144',
                borderWidth: 1,
                hidden: false
            },
            {
                label: 'Food',
                data: food,
                backgroundColor: '#F3722C',
                borderColor: '#F3722C',
                borderWidth: 1,
                hidden: false
            },
            {
                label: 'Shelter',
                data: shelter,
                backgroundColor: '#cca000',
                borderColor: '#cca000',
                borderWidth: 1,
                hidden: false
            },
            {
                label: 'Household',
                data: household,
                backgroundColor: '#90BE6D',
                borderColor: '#90BE6D',
                borderWidth: 1,
                hidden: true
            },
            {
                label: 'Clothing',
                data: clothing,
                backgroundColor: '#43AA8B',
                borderColor: '#43AA8B',
                borderWidth: 1,
                hidden: true
            },
            {
                label: 'Transportation',
                data: transportation,
                backgroundColor: '#577590',
                borderColor: '#577590',
                borderWidth: 1,
                hidden: true
            },
            {
                label: 'Health',
                data: health,
                backgroundColor: '#277DA1',
                borderColor: '#277DA1',
                borderWidth: 1,
                hidden: true
            },
            {
                label: 'Recreation',
                data: recreation,
                backgroundColor: '#c200fb',
                borderColor: '#c200fb',
                borderWidth: 1,
                hidden: true
            },
            {
                label: 'Alcohol-tobacco-cannabis',
                data: alcohol,
                backgroundColor: '#220901',
                borderColor: '#220901',
                borderWidth: 1,
                hidden: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Canada CPI Trend'
                }
            }
        }
    });
    
    document.getElementById('lineSelector').addEventListener('change', function() {
        var selectedOption = this.value;

        // Update the 'hidden' property of each dataset depending on the selected option
        myChart.data1.datasets.forEach(function(dataset) {
            if (selectedOption === 'All') {
                dataset.hidden = false;
            } else {
                dataset.hidden = dataset.label !== selectedOption;
            }
        });

        // Update the chart to reflect the changes to the datasets
        myChart.update();
    });

    var ctx2 = document.getElementById('unemployChart').getContext('2d');
    var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: months.slice(-6),
            datasets: [{
                label: 'Unemployment rate',
                // lastes 3 months data
                data: data2.map(item => item['Unemployment rate']).slice(-6),
                backgroundColor: '#705f55',
                borderColor: '#705f55',
                borderWidth: 1,
                hidden: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Canada Unemployment Rate'
                }
            }
        }
    });

    var latestDataDiv = document.getElementById('latestData');
    var latestDate = new Date(Math.max.apply(null, data1.map(item => item.Date)));
    // Convert the latest date to a string in the ISO 8601 format and extract just the date part
    var latestDateString = latestDate.toISOString().substring(0, 10);
    // find latest update date
    var now = new Date();
    var latestUpdate = new Date(now.getFullYear(), now.getMonth(), 25)
    // if today is before the 25th, then the latest update is last month
    if (now.getDate() <= 25) {
        latestUpdate.setMonth(latestUpdate.getMonth() - 1);
    }
    var latestUpdateString = latestUpdate.toISOString().substring(0, 10);
    latestDataDiv.textContent = `Last update: ${latestUpdateString} | Latest data: ${latestDateString}`;

    // Create the table
    var tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    // sorting data by date descending
    data1.sort(function(a, b) {
        var dateA = new Date(a.Date), dateB = new Date(b.Date);
        return dateB - dateA; // sort in descending order
    });
    data1.forEach(function(item) {
            var row = tableBody.insertRow();
            var monthCell = row.insertCell();
            var cpiCell = row.insertCell();
            var foodCell = row.insertCell();
            var shelterCell = row.insertCell();
            var householdCell = row.insertCell();
            var clothingCell = row.insertCell();
            var transportationCell = row.insertCell();
            var healthCell = row.insertCell();
            var recreationCell = row.insertCell();
            var alcoholCell = row.insertCell();
            monthCell.textContent = new Date(item.Date).toISOString().substring(0, 10);
            cpiCell.textContent = item['All-items'];
            foodCell.textContent = item['Food'];
            shelterCell.textContent = item['Shelter'];
            householdCell.textContent = item['Household'];
            clothingCell.textContent = item['Clothing'];
            transportationCell.textContent = item['Transportation'];
            healthCell.textContent = item['Health'];
            recreationCell.textContent = item['Recreation'];
            alcoholCell.textContent = item['Alcohol-tobacco-cannabis'];
        });
});
