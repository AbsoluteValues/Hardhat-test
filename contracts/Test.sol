// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;
import "hardhat/console.sol";

contract Prescription {

    enum PrescriptionStatus {
        Null,
        Registered,
        Used
    }

    struct PrescriptionInfo {
        uint startDate;
        uint endDate;
        PrescriptionStatus status;
    }
    
    mapping(string => PrescriptionInfo) private _prescriptionInfos;

    event LogRegisterPrescription(string prescriptionHash, uint256 startDate, uint256 endDate, PrescriptionStatus status);

    event LogUsePrescription(string prescriptionHash);

    function RegisterPrescription(string memory prescriptionHash, uint256 startDate, uint256 endDate) public {
        if ( _prescriptionInfos[prescriptionHash].status != PrescriptionStatus.Null ) { revert("You already registered this prescription"); }
        _prescriptionInfos[prescriptionHash] = PrescriptionInfo(startDate, endDate, PrescriptionStatus.Registered);
        emit LogRegisterPrescription(prescriptionHash, startDate, endDate, PrescriptionStatus.Registered);
    }

    function UsePrescription(string memory prescriptionHash) public {
        if ( _prescriptionInfos[prescriptionHash].status == PrescriptionStatus.Used ) { revert("You already used this prescription"); }
        if ( _prescriptionInfos[prescriptionHash].status != PrescriptionStatus.Registered ) { revert("You must register prescription"); }
        if ( (_prescriptionInfos[prescriptionHash].startDate <= block.timestamp && block.timestamp <= _prescriptionInfos[prescriptionHash].endDate) != true ) { revert("You can't use expired prescription"); }
        _prescriptionInfos[prescriptionHash].status = PrescriptionStatus.Used;
        emit LogUsePrescription(prescriptionHash);
    }

    function getPrescriptionInfo(string memory prescriptionHash) public view returns(PrescriptionInfo memory) {
        return _prescriptionInfos[prescriptionHash];
    }
}
