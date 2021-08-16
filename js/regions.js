// regions.js

// all region names with ISO Code
const region_list = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

// select search region element
const search_region_element = document.querySelector(".search-region");
const region_list_element = document.querySelector(".region-list");
const change_region_btn = document.querySelector(".change-region");
const close_list_btn = document.querySelector(".close");
const input = document.getElementById("search-input");

// cearate region list
function createRegionList(region, index) {
  // const num_regions = region_list.length;

  let i = 0,
    ul_list_id;

  region_list.forEach((region, index) => {
    ul_list_id = `list-${index}`;
    region_list_element.innerHTML += `<ul id='${ul_list_id}'></ul>`;
    i++;

    document.getElementById(`${ul_list_id}`).innerHTML += `
      <li onclick="fetchData('${region}')" id="${region}">
        ${region}
      </li>
    `;
  });
}

createRegionList();

// change 클릭 시, search-list show/hide
change_region_btn.addEventListener("click", function () {
  input.value = "";
  resetRegionList();
  search_region_element.classList.toggle("hide");
  search_region_element.classList.add("fadeIn");
});

// close_btn 클릭 시, search-list hide
close_list_btn.addEventListener("click", function () {
  search_region_element.classList.add("hide");
});

// search-region에서 나라 검색
input.addEventListener("input", function () {
  let value = input.value.toUpperCase();

  region_list.forEach((region) => {
    if (region.startsWith(value)) {
      document.getElementById(region).classList.remove("hide");
    } else {
      document.getElementById(region).classList.add("hide");
    }
  });
});

// reset region list (show all the regions)
function resetRegionList() {
  region_list.forEach((region) => {
    document.getElementById(region).classList.remove("hide");
  });
}
