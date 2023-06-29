import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import logo from "../assets/logo_WITO_white.png";
import TutorialAccordion from "./TutorialAccordion";

export default function Home() {
  const [cookies] = useCookies(["username"]);
  const navigate = useNavigate();
  const tutorialSteps = [
    {
      id: "accordion1",
      title: "Step 1: Add a category",
      content: `Navigate to the categories page through the navigation bar on top of the page. Click the add button on the top right corner of the page and add the category of the voting group you will want recommendations on. You can star, delete, and edit the category name after adding it.`,
    },
    {
      id: "accordion2",
      title: "Step 2: Add candidates",
      content:
        "You will need to add your candidates for each category. You can add as many candidates as you need. You can also edit and delete the candidate name after adding.",
    },
    {
      id: "accordion3",
      title: "Step 3: Add tags to candidate",
      content:
        "After adding the candidates, you will need to add related tags to each candidate based on your knowledge of it. In order to proceed, each candidate needs to have at least 1 tag. You can also add tags from the tags page that can be accessed through the navigation bar. The tags can be edited and deleted as you please.",
    },
    {
      id: "accordion4",
      title: "Step 4: Set your preferences",
      content:
        "In order to provide you recommendations of your match for the vote, you will also need to add your preferred tags, along with its weightings. The weightings must add up tp 100% across each tags.",
    },
    {
      id: "accordion5",
      title: "Step 5: View your matches",
      content:
        "Calculating your preferences will result to a list of candidates, sorted from your highest match to the lowest. Hopefully our system will help you determine who you want to vote!",
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="p-3 mb-2 bg-primary text-white">
        <div className="top-margin container">
          <div className="text-center">
            <img src={logo} alt="WITO Logo" width="400"></img>
          </div>
          <div className="accordion text-dark" id="tutorialAccordion">
            {tutorialSteps.map((step) => (
              <TutorialAccordion
                id={step.id}
                key={step.id}
                title={step.title}
                content={step.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
