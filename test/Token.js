/*
const { expect } = require("chai");

describe("Token contract", function () {

    it("Deployment should assign the total supply of tokens to the owner", async function () {

        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer tokens between accounts", async function() {

        const [owner, addr1, addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();

        // 소유자로부터 addr1으로 토큰 전송하기
        await hardhatToken.connect(owner).transfer(addr1.address, 500000);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(500000);

        // add1에서 add2로 토큰 전송하기
        await hardhatToken.connect(addr1).transfer(addr2.address, 250000);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(250000);
    });
});
*/
