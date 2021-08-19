<?php
// 시도별 발생 현황 API
$ch = curl_init();
$url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=TAdLe2Q%2FHUYZwzjdBvhvsJmf20BQxyX4eCCuHh9AEU3SV55TkrlsyMAjb5hR96dr%2B5tC4HQBk4vR5NMZ%2F27GdA%3D%3D&pageNo=1&numOfRows=10&startCreateDt=-10';

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
$response = curl_exec($ch);
curl_close($ch);

var_dump($response);