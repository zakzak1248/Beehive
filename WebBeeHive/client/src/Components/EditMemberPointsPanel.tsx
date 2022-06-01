import React from "react";
import "../CSS/EditMemberPointsPanel.css";
import { MemberInfo } from "../Interfaces";

interface IProps {
  member: MemberInfo;
  reloadParent: () => void;
}

function EditMemberPointsPanel({ member, reloadParent }: IProps) {
  let oldNumber = member.points;

  const [newNumber, setNewNumber] = React.useState(oldNumber);

  const incrementNum = () => {
    let n = newNumber;
    n += 1;
    setNewNumber(n);
  };

  const decrementNum = () => {
    let n = newNumber;
    n -= 1;
    setNewNumber(n);
  };

  const handleSet = () => {
    member.points = newNumber;
    reloadParent();
  };

  return (
    <div className="EditMemberPointsPanel">
      <div className="EditMemberPointsPanel-Editor">
        <div className="EditMemberPointsPanel-OldPoints">{oldNumber}</div>
        <div className="EditMemberPointsPanel-PointEditor">
          <button
            className="EditMemberPointsPanel-AddPoint"
            onClick={incrementNum}
          >
            +1
          </button>
          <div className="EditMemberPointsPanel-NewPoints">{newNumber}</div>
          <button
            className="EditMemberPointsPanel-MinusPoint"
            onClick={decrementNum}
          >
            -1
          </button>
        </div>
      </div>
      <button className="EditMemberPointsPanel-SaveButton" onClick={handleSet}>
        Set
      </button>
    </div>
  );
}

export default EditMemberPointsPanel;
