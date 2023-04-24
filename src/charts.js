import { Chart } from 'chart.js/auto';

export const generateDonutChart = (traveler) => {
  const totalSpent = traveler.getYearlySpent();
  const amountSpent = totalSpent / 1.1;
  const commission = totalSpent - amountSpent;

  const donutChartCanvas = document.getElementById('donutChartCanvas');

  const donutChart = new Chart(donutChartCanvas, {
    type: 'doughnut',
    data: {
      labels: ['Amount Spent', 'Travel Agent Fee'],
      datasets: [{
        label: 'Amount',
        data: [amountSpent, commission],
        backgroundColor: ['#D68C7A', '#544948']
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 20
            }
          }
        }
      },
      title: {
        display: true,
        text: 'Total Amount Spent This Year (including 10% travel agent fee)',
        fontSize: 24 
      },
    }
  });

  const totalSpentDisplay = document.getElementById('totalSpent');
  totalSpentDisplay.innerText = `Total spent: $${totalSpent}`;
};
