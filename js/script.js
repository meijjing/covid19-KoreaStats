// script.js

// select all elements
const region_name_element = document.querySelector(".domestic .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const critical_element = document.querySelector(".critical .value");
const new_critical_element = document.querySelector(".critical .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

const region_table_element = document.querySelector(".region-table tbody");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

// app variables
let country_list = [],
  app_data = [],
  cases_list = [],
  new_cases_list = [],
  recovered_list = [],
  new_recovered_list = [],
  deaths_list = [],
  new_deaths_list = [],
  formatedDates = [],
  region_list = [];

// 국내 발생 API
fetch(
  "https://api.corona-19.kr/korea/?serviceKey=seyzA5FZwDrHnk16poUafx7jgt9hMWLiT",
  {
    method: "GET",
  }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);

    // 전체 확진자 수
    total_cases_element.innerHTML = data.TotalCase;
    // 전체 완치자 수
    recovered_element.innerHTML = data.TotalRecovered;
    // 오늘 완치자 수
    // new_recovered_element.innerHTML = data.TodayRecovered;
    if (Math.sign(data.TodayRecovered) == 1) {
      new_recovered_element.innerHTML =
        "+ " + parseInt(data.TodayRecovered).toLocaleString();
    } else if (Math.sign(data.Recovered) == -1) {
      new_recovered_element.innerHTML =
        "- " + parseInt(data.TodayRecovered).toLocaleString();
    } else if (Math.sign(data.Recovered) == 0) {
      new_recovered_element.innerHTML = "+0";
    }

    // 전체 격리자 수
    critical_element.innerHTML = data.NowCase;
    // 오늘 격리자 수
    // new_critical_element.innerHTML = data.TotalCaseBefore;
    if (Math.sign(data.TotalCaseBefore) == 1) {
      new_critical_element.innerHTML = "+ " + data.TotalCaseBefore;
    } else if (Math.sign(data.TotalCaseBefore) == -1) {
      new_critical_element.innerHTML = "- " + data.TotalCaseBefore;
    } else if (Math.sign(data.TotalCaseBefore) == 0) {
      new_critical_element.innerHTML = "+0";
    }

    // 전체 사망자 수
    deaths_element.innerHTML = data.TotalDeath;
    // 오늘 사망자 수
    // new_deaths_element.innerHTML = data.TodayDeath;
    if (Math.sign(data.TodayDeath) == 1) {
      new_deaths_element.innerHTML = "+ " + data.TodayDeath;
    } else if (Math.sign(data.TodayDeath) == -1) {
      new_deaths_element.innerHTML = "- " + data.TodayDeath;
    } else if (Math.sign(data.TodayDeath) == 0) {
      new_deaths_element.innerHTML = "+0";
    }
  })
  .catch((err) => {
    console.error(err);
  });

// 시도별 발생동향 API
fetch(
  "https://api.corona-19.kr/korea/country/new/?serviceKey=seyzA5FZwDrHnk16poUafx7jgt9hMWLiT",
  {
    method: "GET",
  }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);

    // korea - 오늘 확진자 수
    new_cases_element.innerHTML = "+ " + data.korea.newCase;

    // 시/도 별 확진자 수 배열 만들기
    var datas = Object.keys(data).slice(3, 20);
    // console.log(datas);

    datas.forEach((value) => {
      let DATA = data[value];
      // let user_region;

      app_data.push(DATA);
      // console.log(app_data);
      // console.log(DATA);

      // 도시 이름 리스트
      country_list.push(DATA.countryName);

      // 도시별 누적 확진자 수
      cases_list.push(parseInt(DATA.totalCase.replace(/,/g, "")));

      // 도시별 오늘 확진자 수
      new_cases_list.push(DATA.newCase);

      // 도시별 누적 완치자 수
      recovered_list.push(parseInt(DATA.recovered.replace(/,/g, "")));
      // console.log(recovered_list);

      // 도시별 누적 사망자 수
      deaths_list.push(parseInt(DATA.death.replace(/,/g, "")));
    });
  })
  .then(() => {
    axesLinearChart();
  })
  .catch((err) => {
    console.log(err);
  });

// UPDATE CHART
let my_chart;
function axesLinearChart() {
  my_chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: country_list,
      datasets: [
        {
          label: "확진자 수",
          data: cases_list,
          fill: false,
          borderColor: "#fff",
          backgroundColor: "#fff",
          borderWidth: 1,
        },
        {
          label: "완치자 수",
          data: recovered_list,
          fill: false,
          borderColor: "#03b98c",
          backgroundColor: "#03b98c",
          borderWidth: 1,
        },
        {
          label: "사망자 수",
          data: deaths_list,
          fill: false,
          borderColor: "#d63a2f",
          backgroundColor: "#d63a2f",
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
