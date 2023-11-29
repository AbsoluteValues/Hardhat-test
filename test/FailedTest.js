/*
const keccak256 = require('keccak256'); // keccak256 해시 기법 모듈 불러오기
const date = require('date-and-time'); // date-and-time 모듈 불러오기

describe("솔닥 블록체인 과제", function () {

    const randomStrFront = Math.random().toString(36).substring(2, 12); // 위변조를 보다 어렵게 하기 위한 랜덤 문자열 생성
    const randomStrBack = Math.random().toString(36).substring(2, 12); // 위변조를 보다 어렵게 하기 위한 랜덤 문자열 생성

    let now = new Date(); // 날짜
    now = date.format(now, 'YYYY.MM.DD.HH:mm:ss'); // 처방 날짜값 구하기

    const hashing = keccak256(randomStrFront, now, randomStrBack).toString('hex'); // keccak256 해시 기법을 이용한 해싱

    let error = "없음"; // 에러 표출을 위한 변수

    const clicked = true; // 버튼 클릭 여부 결정 변수

    it("포괄적인 테스트", async function () {

        const importContract = await ethers.getContractFactory("Document"); // Smart Contract 불러오기
        const testContract = await importContract.deploy(); // 불러온 Smart Contract 활성화

        await testContract.setHashList("hash", hashing); // 해시값 저장
        await testContract.setNowList("date", now); // 처방 날짜값 저장
        await testContract.setTimeoutList("timeout", "3"); // 유효 기간값 저장
        await testContract.setStatusList("status", "안 좋음"); // 상태값 저장

        // 이미 조제된 처방전인지의 여부 판단을 위한 값을 저장하는 테스팅 코드
        // await testContract.setIsAlreadyDone();

        let _hash = await testContract.getHash("hash"); // 저장된 해시값 불러오기

        let _now = await testContract.getNow("date"); // 저장된 처방 날짜값 불러오기
        _now = _now.split('.');

        const _timeout = await testContract.getTimeout("timeout"); // 저장된 처방전 유효 기간 불러오기

        const convertedTimeout = _now[0] + _now[1] + (Number(_now[2]) + Number(_timeout)); // 처방 날짜와 유효 기간 합산

        let prescriptionDate = new Date(); // 날짜
        prescriptionDate = date.format(prescriptionDate, 'YYYY.MM.DD.HH:mm:ss'); // 약국에서 처방 받는 날짜 구하기
        prescriptionDate = prescriptionDate.split('.'); // 계산한 처방 받는 날짜 전처리

        const convertedPrescriptionDate = prescriptionDate[0] + prescriptionDate[1] + prescriptionDate[2]; // 처방 받는 날짜 추가 가공

        // 처방전 유효 기간 관련 테스트 코드
        console.log(convertedTimeout);
        console.log(convertedPrescriptionDate);
        console.log(Number(convertedTimeout) - Number(convertedPrescriptionDate));
        console.log(Number(convertedTimeout) - Number(convertedPrescriptionDate) >= 0);

        const _isAlreadyDone = await testContract.getIsAlreadyDone(); // 이미 조제된 처방전인지의 여부 판단을 위한 값 불러오기
        
        // if (hashing != "09a5dd05a06b2b1806e534bff9035b57f19700ed6f0a917b37d8038aabc8e1bf")
        if (hashing != _hash)
            error = "위변조된 처방전입니다."; // 오류 저장
        
        if ((Number(convertedTimeout) - Number(convertedPrescriptionDate) >= 0) == false) // 유효 기간 확인
            error = "유효기간이 지난 처방전입니다."; // 오류 저장
        
        if (_isAlreadyDone == "yes")
            error = "조제가 이미 완료된 처방전입니다."; // 오류 저장

        if (error == "없음")
            console.log("조제 가능");
        else
            console.log("조제 불가능");

        if (clicked == true)
            console.log("(처방 확인 및 조제 완료 버튼 누름)")
        
            if (error == "없음")
                await testContract.setIsAlreadyDone(); // 이미 조제된 처방전인지의 여부 판단을 위한 값 저장
            else
                console.log(error); // 저장된 오류 출력
    });
});
*/
