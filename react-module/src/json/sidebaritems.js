import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import AssessmentIcon from "@material-ui/icons/Assessment";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";

export  const sidebaritems =  [
    { name: "home", label: "Home",path: "/home", Icon: HomeIcon },
    {
      name: "trains",
      label: "Train",
      path: "/trains",
      Icon: GroupIcon,
      items: [
        { name: "telecom", 
          label: "Telecom", 
          path: "/telecom",
          Icon:  FiberManualRecordOutlinedIcon,
          items: [
            { name: "vodafone",
              label: "Vodafone",
              path: "/Vodafone",
              Icon: PersonIcon 
            },
            { name: "bell",
              label: "Bell",
              path: "/Bell",
              Icon: PersonIcon 
          }
          ]},
        { name: "bank", 
          label: "Banking", 
          path: "/Banking",
          Icon:  FiberManualRecordOutlinedIcon,
          items: [
            { name: "bofa",
              label: "BoFA",
              path: "/BoFA",
              Icon: PersonIcon 
            },
            { name: "td",
              label: "TD",
              path: "/TD",
              Icon: PersonIcon 
          }
          ]
        }
      ]
    },
    {
      name: "reports",
      label: "Reports",
      path: "/Reports",
      Icon: AssessmentIcon,
      items: [
        { name: "profile", label: "Profile" },
        { name: "teams", label: "Teams" }
      ]
    },
    {
      name: "questionnaire",
      label: "Questionnaire",
      path: "/Questionnaire",
      Icon: QuestionAnswerIcon,
      items: [
        { name: "add", label: "Add" },
        { name: "view", label: "View"}
      ]
    }
]

export default sidebaritems;

