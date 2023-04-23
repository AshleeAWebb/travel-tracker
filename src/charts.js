import { Chart } from 'chart.js';

export const generateDonutChart = (totalSpent, travelAgentFee, netTotal) => {
  const donutChartCanvas = document.createElement('canvas');
  donutChartCanvas.id = 'donutChart';
  donutChartCanvas.setAttribute('width', '50');
  donutChartCanvas.setAttribute('height', '50');

  const donutChartSection = document.createElement('section');
  donutChartSection.appendChild(donutChartCanvas);
  document.body.appendChild(donutChartSection);

  const donutChart = new Chart(donutChartCanvas, {
    type: 'doughnut',
    data: {
      labels: ['Total Spent', 'Travel Agent Fee'],
      datasets: [{
        label: 'Amount',
        data: [netTotal, travelAgentFee],
        backgroundColor: ['#544948', '#D094AD']
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Total Amount Spent This Year (including 10% travel agent fee)'
      }
    }
  });

  donutChart.canvas.parentNode.style.height = '300px';
  donutChartSection.style.display = 'flex';
  donutChartSection.style.justifyContent = 'center';

  const totalSpentDisplay = document.getElementById('totalSpent');
  totalSpentDisplay.innerText = `Total spent: $${totalSpent.toFixed(2)} | Travel agent fee: $${travelAgentFee.toFixed(2)} | Net total: $${netTotal.toFixed(2)}`;
};