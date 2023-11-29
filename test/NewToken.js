const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("TokenContract", function () {

    let NewToken;
    
    beforeEach(async function () {
        const importContract = await ethers.getContractFactory("NewToken"); // Smart Contract 불러오기
        NewToken = await importContract.deploy("NewToken", "NT", 100); // 불러온 Smart Contract 활성화
    });

    it("Should assign the total supply of tokens to the owner", async function () {

        const [owner] = await ethers.getSigners();

        const ownerBalance = await NewToken.balanceOf(owner.address);
        expect(await NewToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer tokens between accounts", async function () {

        const [owner, addr1] = await ethers.getSigners();

        await NewToken.balanceOf(owner.address);

        await NewToken.transfer(addr1.address, 100);
        expect(await NewToken.balanceOf(addr1.address)).to.equal(100);
    });

    it("Should transferFrom tokens to whitelisted account", async function () {

        let endDate = new Date();
        endDate.setDate(endDate.getDate() + 3);
        endDate = Math.floor(endDate / 1000);

        let endDateTest = new Date();
        endDateTest.setDate(endDateTest.getDate() - 3);
        endDateTest = Math.floor(endDateTest / 1000);


        const [owner, addr1, addr2, addr3] = await ethers.getSigners();
        
        await NewToken.balanceOf(owner.address);
        await NewToken.transfer(addr1.address, 100);
        
        await NewToken.approve(addr2);
        await NewToken.transferFrom(addr1.address, addr2.address, endDate, 25);
        await NewToken.transferFrom(addr1.address, addr2.address, endDateTest, 25);
        await expect(NewToken.transferFrom(addr1.address, addr3.address, endDate, 50)).to.revertedWith("You have to send whitelisted address");

        expect(await NewToken.balanceOf(addr1.address)).to.equal(50);
        expect(await NewToken.balanceOf(addr2.address)).to.equal(50);
        expect(await NewToken.balanceOf(addr3.address)).to.equal(0);
    });

    it("Should burn tokens", async function () {

        const [owner] = await ethers.getSigners();
        
        await NewToken.balanceOf(owner.address);
        await NewToken.burn(100000000000000000000n);
        expect(await NewToken.balanceOf(owner.address)).to.equal(0);
    });

    it("Should burn tokens from accounts", async function () {

        const [owner, addr1] = await ethers.getSigners();

        await NewToken.balanceOf(owner.address);
        await NewToken.transfer(addr1.address, 100);

        await NewToken.burnFrom(addr1.address, 50);
        expect(await NewToken.balanceOf(addr1.address)).to.equal(50);
    });
});
