// data.js

/* ----------------------------------------- */
/*                  국내 발생 현황               */
/* ----------------------------------------- */

// all variables elements
const total_case_element = document.querySelector(".total-cases .value");
const new_case_element = document.querySelector(".total-cases .new-value");
const recovered_case_element = document.querySelector(".recovered .value");
const new_recovered_case_element = document.querySelector(
  ".recovered .new-value"
);
const critical_case_element = document.querySelector("critical .value");
const new_critical_case_element = document.querySelector("critical .new-value");
const death_case_element = document.querySelector("deaths .value");
const new_death_case_element = document.querySelector("deaths .new-value");
const dates = [];
const two_week_total_cases = [];

// 공공 데이터 xml
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://cors-anywhere.herokuapp.com/openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=TAdLe2Q%2FHUYZwzjdBvhvsJmf20BQxyX4eCCuHh9AEU3SV55TkrlsyMAjb5hR96dr%2B5tC4HQBk4vR5NMZ%2F27GdA%3D%3D&pageNo=1&numOfRows=10&startCreateDt=-1"
);

xhr.onload = () => {
  // console.log(xhr.responseXML);
  const xmlDoc = xhr.responseXML;

  totalCases(xmlDoc);
};
xhr.send();

function totalCases(data) {
  // // 오늘 확진자
  // const total_case = Number(
  //   data.getElementsByTagName("decideCnt")[0].textContent
  // );
  // total_case_element.innerHTML = total_case;

  // // 오늘 확진자 증가 수
  // const new_case =
  //   total_case - Number(data.getElementsByTagName("decideCnt")[1].textContent);
  // new_case_element.innerHTML = new_case;

  // // 오늘 완치자 수
  // const recovered_case = Number(
  //   data.getElementsByTagName("clearCnt")[0].textContent
  // );
  // recovered_case_element.innerHTML = recovered_case;

  // // 오늘 완치자 증가 수
  // const new_recovered_case =
  //   recovered_case -
  //   Number(data.getElementsByTagName("clearCnt")[1].textContent);
  // new_recovered_case_element.innerHTML = new_recovered_case;

  // // 오늘 격리자 수
  // const critical_case = Number(
  //   data.getElementsByTagName("careCnt")[0].textContent
  // );
  // critical_case_element.innerHTML = critical_case;

  // // 오늘 격리자 증감 수
  // const new_critical_case =
  //   critical_case - Number(data.getElementsByTagName("careCnt")[1].textContent);
  // new_critical_case_element.innerHTML = new_critical_case;

  // // 오늘 사망자 수
  // const death_case = Number(
  //   data.getElementsByTagName("deathCnt")[0].textContent
  // );
  // death_case_element.innerHTML = death_case;

  // // 오늘 사망자 증가 수
  // const new_death_case =
  //   death_case - Number(data.getElementsByTagName("deathCnt")[1].textContent);
  // new_death_case_element.innerHTML = new_death_case;

  for (let i = 14; i >= 0; i--) {
    // 2주간 날짜
    dates.push(data.getElementsByTagName("stateDt")[i].textContent);

    // 2주간 확진자 수
    two_week_total_cases.push(
      Number(data.getElementsByTagName("decideCnt")[i].textContent)
    );
  }
  domesticChart();
}

// domestic-stats chart
const ctx_domestic = document
  .getElementById("domestic_stats_chart")
  .getContext("2d");

let my_chart1;
function domesticChart() {
  my_chart1 = new Chart(ctx_domestic, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "확진자 수",
          data: two_week_total_cases,
          fill: false,
          borderColor: "#fff",
          backgroundColor: "#fff",
          borderWidth: 1,
        },
      ],
    },
    option: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

/* ----------------------------------------- */
/*                 도시별 발생 현황              */
/* ----------------------------------------- */

const name_cell = document.getElementById("region-name");
const total_cell = document.getElementById("region-total");
const recovered_cell = document.getElementById("region-recovered");
const critical_cell = document.getElementById("region-critical");
const death_cell = document.getElementById("region-death");

const region_name = [],
  region_total = [],
  region_new = [],
  region_yesterday = [],
  region_recovered = [],
  region_critical = [],
  region_death = [];

const xhr1 = new XMLHttpRequest();
xhr1.open(
  "GET",
  "https://cors-anywhere.herokuapp.com/openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=TAdLe2Q%2FHUYZwzjdBvhvsJmf20BQxyX4eCCuHh9AEU3SV55TkrlsyMAjb5hR96dr%2B5tC4HQBk4vR5NMZ%2F27GdA%3D%3D&pageNo=1&numOfRows=10&startCreateDt=-1"
);

xhr1.onload = () => {
  console.log(xhr1.responseXML);
  const xmlDoc1 = xhr1.responseXML;

  regionStats(xmlDoc1);
};
xhr1.send();

// regionStats Function
function regionStats(data) {
  for (let i = 17; i >= 1; i--) {
    // 지역 이름
    const name = data.getElementsByTagName("gubun")[i].textContent;
    region_name.push(name);

    // 도시별 확진자 수
    const total = Number(data.getElementsByTagName("defCnt")[i].textContent);
    region_total.push(total);

    // 도시별 완치자 수
    const recovered = Number(
      data.getElementsByTagName("isolClearCnt")[i].textContent
    ).toLocaleString();
    region_recovered.push(recovered);

    // 도시별 격리자 수
    const critical = Number(
      data.getElementsByTagName("isolIngCnt")[i].textContent
    ).toLocaleString();
    region_critical.push(critical);

    // 도시별 사망자 수
    const death = Number(
      data.getElementsByTagName("deathCnt")[i].textContent
    ).toLocaleString();
    region_death.push(death);
  }

  for (let i = 36; i >= 20; i--) {
    // 도시별 어제 확진자 수
    const yesterday_total = Number(
      data.getElementsByTagName("defCnt")[i].textContent
    );
    region_yesterday.push(yesterday_total);
  }

  for (let i = 0; i < region_total.length; i++) {
    region_new.push(region_total[i] - region_yesterday[i]);
  }

  region_name.forEach((value) => {
    name_cell.innerHTML += `<p>${value}</p>`;
  });
  region_total.forEach((value, index) => {
    total_cell.innerHTML += `<p id='${index}'>${value}</p>`;
  });
  region_new.forEach((value, index) => {
    document.getElementById(`${index}`).innerHTML += `<span>(+${value})</span>`;
  });
  region_recovered.forEach((value) => {
    recovered_cell.innerHTML += `<p>${value}</p>`;
  });
  region_critical.forEach((value) => {
    critical_cell.innerHTML += `<p>${value}</p>`;
  });
  region_death.forEach((value) => {
    death_cell.innerHTML += `<p>${value}</p>`;
  });
  // region_yesterday = [],
}
