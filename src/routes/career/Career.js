import React, {useEffect} from "react";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {Mobile, PC} from "../../utils/MediaQuery";
import {useCareerAction} from "../../actions/Career";


export default function Career() {
  const careerAction = useCareerAction();

  useEffect(() => {
    careerAction.fetchSimpleCareer().then(res => {
      const totalWorkingYears = document.getElementById("totalWorkingYears");
      if (res.data.length) {
        totalWorkingYears.innerHTML = "n년 m개월 동안 열심히 달려왔어요 🏃🏻‍♀️";
      } else {
        totalWorkingYears.innerHTML = "멋진 커리어를 쌓아갈 단계에요 🏁";
      }
    });
  })

  return <div>
    <h2 id="totalWorkingYears"/>
    <PC>
      <FlexGrid flexGridColumnCount={2}>
        <FlexGridItem>
        </FlexGridItem>
      </FlexGrid>
    </PC>
    <Mobile>
      <FlexGrid flexGridColumnCount={1}>
        <FlexGridItem>
        </FlexGridItem>
      </FlexGrid>
    </Mobile>
  </div>
}
