"use strict";

const inputCLP = document.querySelector("#inputCLP");
const select = document.querySelector("#select");
const result = document.querySelector("#result");
const btnCalculate = document.querySelector("#btnCalculate");

const getMindicador = async () => {
  try {
    const res = await fetch("https://mindicador.cl/api");
    const data = await res.json();
    const optionDolarValue = data.dolar.valor;
    const optionEuroValue = data.euro.valor;

    const transformToDolar = (value) => inputCLP.value / value;
    const transformToEuro = (value) => inputCLP.value / value;

    btnCalculate.addEventListener("click", () => {
      if (inputCLP.value === "") {
        return alert("Ingresa un monto en CLP y elige una moneda");
      }

      if (select.value === "dolar") {
        return (result.textContent = `$ ${Math.trunc(
          transformToDolar(optionDolarValue)
        )}`);
      }

      if (select.value === "euro") {
        return (result.textContent = `$ ${Math.trunc(
          transformToEuro(optionEuroValue)
        )}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
getMindicador();

const getDolarDate = async () => {
  try {
    const res = await fetch("https://mindicador.cl/api/dolar");
    const data = await res.json();
    const dataDolarTenDays = data.serie.slice(0, 10);

    const dataDolarTenDaysValues = dataDolarTenDays.map((day) => {
      return day.valor;
    });

    window.onload = function () {
      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "dark2",
        title: {
          text: "Historial valor del dolar",
        },
        data: [
          {
            type: "line",
            indexLabelFontSize: 16,
            lineColor: "#0dcaf0",
            dataPoints: [
              { y: dataDolarTenDaysValues[0] },
              { y: dataDolarTenDaysValues[1] },
              { y: dataDolarTenDaysValues[2] },
              { y: dataDolarTenDaysValues[3] },
              { y: dataDolarTenDaysValues[4] },
              { y: dataDolarTenDaysValues[5] },
              { y: dataDolarTenDaysValues[6] },
              { y: dataDolarTenDaysValues[7] },
              { y: dataDolarTenDaysValues[8] },
              { y: dataDolarTenDaysValues[9] },
            ],
          },
        ],
      });
      chart.render();
    };
  } catch (error) {
    console.log(error);
  }
};
getDolarDate();
