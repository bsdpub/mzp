const cities = {
    'New York': 'America/New_York',
    'Tokyo': 'Asia/Tokyo',
    'London': 'Europe/London'
};

// 시간 업데이트 함수
function updateTime(city, timezone) {
    const now = new Date().toLocaleString('en-US', { timeZone: timezone });
    // ID 값을 소문자 형태로 변경하여 찾기
    const cityId = city.toLowerCase().replace(' ', '-');  // "New York" -> "new-york"
    const cityElement = document.getElementById(cityId);
    
    if (cityElement) {
        cityElement.textContent = `${city}: ${new Date(now).toLocaleTimeString()}`;
    }
}

// 환율 업데이트 함수 (API 키 없이)
async function updateExchangeRate() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    
    if (data && data.rates.KRW) {
        const usdToKrw = data.rates.KRW;
        document.getElementById('usd-krw').textContent = `USD/KRW: ${usdToKrw.toFixed(2)}`;
    } else {
        document.getElementById('usd-krw').textContent = "USD/KRW: 데이터 로드 실패";
    }
}

// 주기적으로 업데이트
function startUpdates() {
    // 각 도시의 시간 업데이트
    Object.keys(cities).forEach(city => updateTime(city, cities[city]));
    
    // 환율 업데이트
    updateExchangeRate();

    // 1분마다 업데이트
    setInterval(() => {
        Object.keys(cities).forEach(city => updateTime(city, cities[city]));
        updateExchangeRate();
    }, 60000);
}

startUpdates();

