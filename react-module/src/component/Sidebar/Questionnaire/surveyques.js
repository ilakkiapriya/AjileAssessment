export const surveyques = {
    title: "Employee Survey",
    showProgressBar: "top",
    goNextPageAutomatic: true,
    showNavigationButtons: true,
        pages: [
            {
                title: "What operating system do you use?",
                questions: [
                    {
                        type: "checkbox",
                        name: "opSystem",
                        title: "OS",
                        hasOther: true,
                        isRequired: true,
                        choices: ["Windows", "Linux", "Macintosh OSX"]
                    }
                ]
            },
            {   
                title: "What is your area of interest?",
                questions: [
                    {
                        type: "checkbox",
                        name: "areaofinterest",
                        title: "Please select from the list",
                        choicesOrder: "random",
                        colCount: 4,
                        isRequired: true,
                        choices: ["Javascript",
                        "Java",
                        "Python",
                        "CSS",
                        "PHP",
                        "Ruby",
                        "C++"]
                    }
                ]
            },
            {
                questions: [
                    {
                        type: "rating",
                        title: "How satisfied are you with the Project?",
                        choicesOrder: "random",
                        rateMin: 1,
                        rateMax: 5 
                    },
                    {
                        type: "matrix",
                        name: "Description :",
                        rows: [
                            {
                                value: 1,
                                text: " 1 . Strongly Disagree"
                            }, {
                                value: 2,
                                text: " 2 . Disagree"
                            }, {
                                value: 3,
                                text: " 3 . Neutral"
                            }, {
                                value: 4,
                                text: " 4 . Agree"
                            }, {
                                value: 5,
                                text: " 5 . Strongly Agree"
                            }
                        ],
                        columns:[
                            {
                                value: "projwork",
                                text: "Project Work"
                            },
                            {
                                value: "team",
                                text: "Team"
                            }
                        ],
                    }
                ]
            },
            {
                title: "Please enter your name and e-mail",
                choicesOrder: "random",
                questions: [
                    {
                        type: "text",
                        name: "name",
                        title: "Name:"
                    }, {
                        type: "text",
                        name: "employeeid",
                        title: "Your Employee Id:"
                    }
                ]
            },
            {
                questions: [
                    {
                        type: "comment",
                        name: "suggestions",
                        title: "Comments (Optional)"
                    }
                ]
            }
        ]
    };
    
    
    