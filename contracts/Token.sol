// SPDX-License-Identifier: UNLICENSED
// 솔리디티 파일은 pragma로 시작됩니다.
// 컴파일러는 이 부분을 보고 버전을 검증하게 됩니다.
pragma solidity ^0.8.20;
import "hardhat/console.sol";

// 여기서부터 스마트 컨트랙트를 위한 주된 부분입니다.
contract Token {

    // Some string type variables to identify the token.
    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    // 고정된 양의 토큰 수
    uint256 public totalSupply = 1000000;

    // 이더리움 계정을 저장하기 위해 address 타입의 변수를 선언합니다.
    // mapping은 key/value 맵 형태의 자료구조 이며 여기에 각 계정의 잔고를 기록합니다.
    mapping(address => uint256) balances;

    // Transfer 이벤트는 오프체인 애플리케이션에서 스마트 컨트랙트에서 어떤 일이 일어났는지 이해하는 것을 도와줍니다.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);


    /*----------------------------------------------------------------------------------
                                        컨트랙트 초기화
    ----------------------------------------------------------------------------------*/
    constructor() {

        // totalSupply는 트랜잭션을 만든 사람의 계정에 주어집니다.
        balances[msg.sender] = totalSupply;
        //address owner = msg.sender;
    }


    /*----------------------------------------------------------------------------------
                                    토큰을 전송하기 위한 함수
            `external` modifier는 해당 함수가 외부에서만 호출 가능하도록 접근 제어 해줍니다.
    ----------------------------------------------------------------------------------*/
    function transfer(address to, uint256 amount) external {

        // 트랜잭션을 보내는 사람이 적당한 토큰을 가지고 있는지 확인합니다.
        // 만약 require에서 첫 번째 인자가 "false"일 경우에는 해당 동작이 실패하고 
        // 트랜잭션은 초기화됩니다.
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // 로그 표기
        console.log(
            
            "Transferring from %s to %s %s tokens",
            msg.sender,
            to,
            amount
        );

        balances[msg.sender] -= amount;
        balances[to] += amount;

        // 오프체인 애플리케이션에 해당 내용을 전달해줍니다.
        emit Transfer(msg.sender, to, amount);
    }


    /*----------------------------------------------------------------------------------
                    주어진 계정의 토큰 잔고를 읽기 위한 읽기 전용 함수
            view는 해당 함수의 상태를 변경시키지 않고 단순히 읽기만 하겠다는 의미이며
                        그렇기 때문에 가스비가 발생하지 않는다. 
    ----------------------------------------------------------------------------------*/
    function balanceOf(address account) external view returns (uint256) {

        return balances[account];
    }
}
