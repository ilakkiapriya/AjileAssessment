import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

export  const sidebaritems =  [
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
      name: "questionnaire",
      label: "Questionnaire",
      path: "/Questionnaire",
      Icon: QuestionAnswerIcon,
      items: [
        { name: "view", label: "View",Icon: VisibilityIcon},
        { name: "add", label: "Add",Icon: PlaylistAddIcon}
      ]
    }
]

export default sidebaritems;

