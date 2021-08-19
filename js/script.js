/* ----------------------------------------- */
/*                  국내 발생 현황               */
/* ----------------------------------------- */

// all variables elements
const create_dt = document.querySelector(".create_dt");
const total_case_element = document.querySelector(".total-cases .value");
const new_case_element = document.querySelector(".total-cases .new-value");
const recovered_case_element = document.querySelector(".recovered .value");
const new_recovered_case_element = document.querySelector(
  ".recovered .new-value"
);
const critical_case_element = document.querySelector(".critical .value");
const new_critical_case_element = document.querySelector(
  ".critical .new-value"
);
const death_case_element = document.querySelector(".deaths .value");
const new_death_case_element = document.querySelector(".deaths .new-value");
const dates = [];
const two_week_total_cases = [];
const ctx_domestic = document
  .getElementById("domestic_stats_chart")
  .getContext("2d");

let dt,
  total_case,
  new_case,
  recovered_case,
  new_recovered_case,
  critical_case,
  new_critical_case,
  death_case,
  new_death_case;

// API - domestic
var domestic_data = document.getElementById("../api_domestic.php");
var xhr = new XMLHttpRequest();

xhr.open("GET", "api_domestic.php");
xhr.onload = function () {
  var xmlDoc = xhr.responseText;
  // console.log(xmlDoc);
  domestic_data.innerHTML += xmlDoc;
  domestic_data.style.display = "none";
  domesticStats();
};
xhr.send();

function domesticStats() {
  // 기준 일자
  dt = String(document.getElementsByTagName("createdt")[0].innerText);

  // 오늘 확진자
  total_case = Number(document.getElementsByTagName("decidecnt")[0].innerText);

  // 오늘 확진자 증가 수
  new_case =
    total_case -
    Number(document.getElementsByTagName("decidecnt")[1].innerText);

  // 오늘 완치자 수
  recovered_case = Number(
    document.getElementsByTagName("clearcnt")[0].innerText
  );

  // 오늘 완치자 증가 수
  new_recovered_case =
    recovered_case -
    Number(document.getElementsByTagName("clearcnt")[1].innerText);

  // 오늘 격리자 수
  critical_case = Number(document.getElementsByTagName("carecnt")[0].innerText);

  // 오늘 격리자 증감 수
  new_critical_case =
    critical_case -
    Number(document.getElementsByTagName("carecnt")[1].innerText);

  // 오늘 사망자 수
  death_case = Number(document.getElementsByTagName("deathcnt")[0].innerText);

  // 오늘 사망자 증가 수
  new_death_case =
    death_case - Number(document.getElementsByTagName("deathcnt")[1].innerText);

  for (let i = 14; i >= 0; i--) {
    // 2주간 날짜
    dates.push(document.getElementsByTagName("statedt")[i].innerText);

    // 2주간 확진자 수
    two_week_total_cases.push(
      Number(document.getElementsByTagName("decidecnt")[i].innerText)
    );
  }
  console.log(dt);
  console.log(total_case);
  console.log(new_case);
  console.log(recovered_case);
  console.log(new_recovered_case);
  console.log(critical_case);
  console.log(new_critical_case);
  console.log(death_case);
  console.log(new_death_case);

  domesticUI();
  domesticChart();
}

function domesticUI() {
  // create_dt.innerText += dt.toString();
  total_case_element.innerText = total_case.toLocaleString();
  new_case_element.innerText = "+ " + new_case.toLocaleString();
  recovered_case_element.innerText = recovered_case.toLocaleString();
  new_recovered_case_element.innerText =
    "+ " + new_recovered_case.toLocaleString();
  critical_case_element.innerText = critical_case.toLocaleString();
  // new_critical_case_element.innerText = new_critical_case.toLocaleString();

  if (Math.sign(new_critical_case) == 1) {
    new_critical_case_element.innerText = "+ " + critical_case.toLocaleString();
  } else if (Math.sign(new_critical_case) == -1) {
    new_critical_case_element.innerText = "- " + critical_case.toLocaleString();
  } else if (Math.sign(new_critical_case) == 0) {
    new_critical_case_element.innerText = "+0";
  }

  death_case_element.innerText = death_case.toLocaleString();
  new_death_case_element.innerText = "+ " + new_death_case.toLocaleString();
}

let chart;
function domesticChart() {
  chart = new Chart(ctx_domestic, {
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
const ctx_region = document
  .getElementById("region_stats_chart")
  .getContext("2d");

const region_name = [],
  region_total = [],
  region_new = [],
  region_yesterday = [],
  region_recovered = [],
  region_critical = [],
  region_death = [];

// API - region
var region_data = document.getElementById("../api_region.php");
var xhr1 = new XMLHttpRequest();

xhr1.open("GET", "../api_region.php");
xhr1.onload = function () {
  var xmlDoc1 = xhr1.responseText;
  // console.log(xmlDoc);
  region_data.innerHTML += xmlDoc1;
  region_data.style.display = "none";
  regionStats();
  regionChart();
};
xhr1.send();

// regionStats Function
function regionStats() {
  for (let i = 17; i >= 1; i--) {
    // 지역 이름
    const name = document.getElementsByTagName("gubun")[i].textContent;
    region_name.push(name);

    // 시도별 확진자 수
    const total = Number(
      document.getElementsByTagName("defcnt")[i].textContent
    );
    region_total.push(total);

    // 시도별 완치자 수
    const recovered = Number(
      document.getElementsByTagName("isolclearcnt")[i].textContent
    );
    region_recovered.push(recovered);

    // 시도별 격리자 수
    const critical = Number(
      document.getElementsByTagName("isolingcnt")[i].textContent
    );
    region_critical.push(critical);

    // 시도별 사망자 수
    const death = Number(
      document.getElementsByTagName("deathcnt")[i].textContent
    );
    region_death.push(death);
  }

  // 시도별 어제 확진자 수
  for (let i = 36; i >= 20; i--) {
    const yesterday_total = Number(
      document.getElementsByTagName("defcnt")[i].textContent
    );
    region_yesterday.push(yesterday_total);
  }

  // 시도별 확진 증가 수
  for (let i = 0; i < region_total.length; i++) {
    region_new.push(region_total[i] - region_yesterday[i]);
  }

  region_name.forEach((value) => {
    name_cell.innerHTML += `<p>${value}</p>`;
  });
  region_total.forEach((value, index) => {
    total_cell.innerHTML += `<p id='${index}'>${value.toLocaleString()}</p>`;
  });
  region_new.forEach((value, index) => {
    document.getElementById(
      `${index}`
    ).innerHTML += `<span>(+${value.toLocaleString()})</span>`;
  });
  region_recovered.forEach((value) => {
    recovered_cell.innerHTML += `<p>${value.toLocaleString()}</p>`;
  });
  region_critical.forEach((value) => {
    critical_cell.innerHTML += `<p>${value.toLocaleString()}</p>`;
  });
  region_death.forEach((value) => {
    death_cell.innerHTML += `<p>${value.toLocaleString()}</p>`;
  });

  console.log(region_total);
  console.log(region_recovered);
  console.log(region_death);
}

// regionChart function
let chart2;
function regionChart() {
  chart2 = new Chart(ctx_region, {
    type: "line",
    data: {
      labels: region_name,
      datasets: [
        {
          label: "확진자 수",
          data: region_total,
          fill: false,
          borderColor: "#fff",
          backgroundColor: "#fff",
          borderWidth: 1,
        },
        {
          label: "완치자 수",
          data: region_recovered,
          fill: false,
          borderColor: "#03b98c",
          backgroundColor: "#03b98c",
          borderWidth: 1,
        },
        {
          label: "사망자 수",
          data: region_death,
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
