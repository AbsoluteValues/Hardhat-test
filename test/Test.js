/*
const keccak256 = require('keccak256'); // keccak256 해시 기법 모듈 불러오기
const { expect } = require("chai");
const { ethers } = require("hardhat");

const randomStrFront = Math.random().toString(36).substring(2, 12); // 위변조를 보다 어렵게 하기 위한 랜덤 문자열 생성
const randomStrBack = Math.random().toString(36).substring(2, 12); // 위변조를 보다 어렵게 하기 위한 랜덤 문자열 생성

let startDate = new Date();
startDate = Math.floor(startDate / 1000);

let endDate = new Date();
endDate.setDate(endDate.getDate() + 3);
endDate = Math.floor(endDate / 1000);

const hashing = keccak256(randomStrFront, startDate, randomStrBack).toString('hex'); // keccak256 해시 기법을 이용한 해싱

describe("RegisterPrescription", function () {
    
    let testContract;
    
    beforeEach(async function () {
        const importContract = await ethers.getContractFactory("Prescription"); // Smart Contract 불러오기
        testContract = await importContract.deploy(); // 불러온 Smart Contract 활성화
    });

    // "Validations"
    it("Should not register same hash", async function () {

        await testContract.RegisterPrescription(hashing, startDate, endDate);
        await expect(testContract.RegisterPrescription(hashing, startDate, endDate)).to.be.revertedWith("You already registered this prescription");
    });

    
    // "Registered"
    it("Should change status to Registered", async function () {

        await testContract.RegisterPrescription(hashing, startDate, endDate);
        expect(await testContract.getPrescriptionInfo(hashing)).to.deep.equal([startDate, endDate, "1"]);
    });


    // Event
    it("Should emit an event on RegisterPrescription", async function () {

        await expect(testContract.RegisterPrescription(hashing, startDate, endDate)).to.emit(testContract, "LogRegisterPrescription");
    });
});



describe("UsePrescription", function () {

    let testContract;
    
    beforeEach(async function () {
        const importContract = await ethers.getContractFactory("Prescription"); // Smart Contract 불러오기
        testContract = await importContract.deploy(); // 불러온 Smart Contract 활성화
    });

    // "Validations"
    it("Should revert already Used Prescription", async function () {

        await testContract.RegisterPrescription(hashing, startDate, endDate);
        await testContract.UsePrescription(hashing);
        await expect(testContract.UsePrescription(hashing)).to.be.revertedWith("You already used this prescription");
    });

    it("Should revert Null Prescription", async function () {

        await expect(testContract.UsePrescription(hashing)).to.be.revertedWith("You must register prescription");
    });

    it("Should revert strange Prescription (block.timestamp < prescription.startDate)", async function () {

        let startDateTest = new Date();
        startDateTest.setDate(startDateTest.getDate() + 3);
        startDateTest = Math.floor(startDateTest / 1000);

        await testContract.RegisterPrescription(hashing, startDateTest, endDate);
        await expect(testContract.UsePrescription(hashing)).to.be.revertedWith("You can't use expired prescription");
    });

    it("Should revert Expired Prescription (block.timestamp > prescription.endDate)", async function () {

        let endDateTest = new Date();
        endDateTest.setDate(endDateTest.getDate() - 3);
        endDateTest = Math.floor(endDateTest / 1000);

        await testContract.RegisterPrescription(hashing, startDate, endDateTest);
        await expect(testContract.UsePrescription(hashing)).to.be.revertedWith("You can't use expired prescription");
    });


    // "Used"
    it("Should change status to Used", async function () {

        await testContract.RegisterPrescription(hashing, startDate, endDate);
        await testContract.UsePrescription(hashing);
        expect(await testContract.getPrescriptionInfo(hashing)).to.deep.equal([startDate, endDate, "2"]);
    });


    // "Events"
    it("Should emit an event on UsePrescription", async function () {

        await testContract.RegisterPrescription(hashing, startDate, endDate);
        await expect(testContract.UsePrescription(hashing)).to.emit(testContract, "LogUsePrescription");
    });
});
*/