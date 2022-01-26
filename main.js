//1 박스 2개 만들기
//2 드랍다운 리스트 만들기
//3 환율정보 들고오기
//4 드랍다운리스트에서 아이템 선택하면 아이템이 바뀜
//5 금액을 입력시 환전
//6 드랍다운 리스트에서 아이뎉믕 선택해ㅕㄴ 다시 그단위기준으로 환산이 됨

//7 숫자를 한국어로 읽기
//8 밑에 박스를 바꾸어도 위의 박스애 환율이 적용







let currencyRatio = {
  USD: {
    KRW: 1195.65,
    USD: 1,
    VND: 22645.0,
    unit: "달러",
  },
  KRW: {
    KRW: 1,
    USD: 0.00084,
    VND: 18.94,
    unit: "원",
  },
  VND: {
    VND: 1,
    USD: 0.000044,
    KRW: 0.053,
    unit: "동",
  },
};
let fromCurrency = "USD";
let toCurrency = "USD";
var unitWords = ["", "만", "억", "조", "경"];
var splitunit = 10000;
let toButton = document.getElementById("to-button");
let frombutton = document.getElementById("from-button");

document.querySelectorAll("#from-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    //1 버튼 가져오기
    //2 버튼 값 바꾸기
    document.getElementById("from-button").textContent = this.textContent;

    //3 선택된 currency값을 변수에 저장
    fromCurrency = this.textContent;
    console.log("fromcurrency는", fromCurrency);
    convert("from");
  })
);

document.querySelectorAll("#to-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    //1 버튼 가져오기

    //2 버튼 값 바꾸기

    document.getElementById("to-button").textContent = this.textContent;

    toCurrency = this.textContent;
    convert("from");
  })
);

function convert(type) {
  let amount = 0;
  // if 구문이용하여 위 아래 박스 상호 작용 코드 생성
  if (type == "from") {
    //얼마? 가지고있느 돈, 뭘 바꿀건지

    let amount = document.getElementById("from-input").value;

    //돈 * 환율 = 환전금액
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    document.getElementById("to-input").value = convertedAmount;

    renderKoreanNumber(amount, convertedAmount);
  } else {
    let amount = document.getElementById("to-input").value;

    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];

    document.getElementById("from-input").value = convertedAmount;

    renderKoreanNumber(convertedAmount, amount);
  }
}
//한국어로 표현하기

function renderKoreanNumber(from, to) {
  document.getElementById("fromNumToKorea").textContent =
    readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent =
    readNum(to) + currencyRatio[toCurrency].unit;
}

// 숫자 읽어서 단위별로 쪼개는 함수 \
function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitunit, i + 1)) / Math.pow(splitunit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }
  return resultString;
}


