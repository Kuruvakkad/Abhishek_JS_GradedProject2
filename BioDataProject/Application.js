fetch('BioData.json')
    .then((response) => response.json())
    .then((json) => readData(json))
    .catch((error) => console.log(error));

let resumeArray = new Array();
let resumeParentArray = new Array();
let resumeCounter = 0;
let buttonNext = document.getElementById("nextBtn");
let buttonPrev = document.getElementById("previousBtn");

buttonPrev.style.display = "none";
buttonNext.style.display = "none";

function readData(json) {
    var resumeObj = json["resume"];
    resumeObj.forEach(resumeElement => {
        resumeParentArray.push(resumeElement);
    });
    resumeArray = resumeParentArray;
    disableEnableButtons();
    resumeCounter = 0;
    showData(resumeParentArray, resumeCounter);
}

function showData(dataArray, arrayCounter) {
    var dataContainer = document.getElementsByClassName("resumeContainer");
    var errorImage = document.getElementsByClassName("error-image")[0];
    if (dataArray.length != 0) {
        dataContainer[0].style.display = "flex";
        errorImage.style.display = "none";
        var selectedObject = dataArray[arrayCounter];
        //Personal Info

        const { basics: { name, AppliedFor, email, phone, profiles: { network, url } }, skills: { keywords }, interests: { hobbies } } = selectedObject;

        //Basic Info
        document.getElementById("name").innerText = name;
        document.getElementById("appliedfor").innerText = "Applied For " + AppliedFor;
        document.getElementById("leftMainDataset").innerHTML = `${phone} <br> ${email} <br> <a href="${url}">${network}</a>`;

        //Technical Skills
        var skillText = "";
        keywords.forEach(skill => {
            skillText = skillText + skill + '<br>';

        });
        document.getElementById("skillSet").innerHTML = skillText;

        //Hobbies
        var hobbiesText = "";
        hobbies.forEach(hobby => {
            hobbiesText = hobbiesText + hobby + '<br>';

        });
        document.getElementById("hobbies").innerHTML = hobbiesText;


        const { work: { ['Company Name']: companyName, Position, ['Start Date']: startDate, ['End Date']: endDate, Summary } } = selectedObject;

        document.getElementById("CompanyName").innerText = companyName;
        document.getElementById("Position").innerText = Position;
        document.getElementById("startDate").innerText = startDate;
        document.getElementById("endDate").innerText = endDate;
        document.getElementById("summary").innerText = Summary;


        const { projects: { name: projName, description } } = selectedObject;
        document.getElementById("projName").innerHTML = `<b>${projName}</b> : ${description}`;


        const { education: { UG, SeniorSecondary,HighSchool } } = selectedObject;

        var ugText = Object.values(UG).toString();
        var ssText = Object.values(SeniorSecondary).toString();
        var hsText = Object.values(HighSchool).toString();
        document.getElementById("education-details").innerHTML = `<ul><li><b>UG : </b> ${ugText}</li><li><b>PU : </b> ${ssText}</li><li><b>High School : </b> ${hsText}</li></ul>`;


        const { Internship: { ['Company Name']: internshipName, Position: interPosition, ['Start Date']: internStartDate, ['End Date']: internEndDate, Summary: internSummary } } = selectedObject;

        var internshipText = `<ul>
        <li><b>Company Name : </b>${internshipName} </li>
        <li><b>Position : </b> ${interPosition}</li>
        <li><b>Start Date : </b> ${internStartDate}</li>
        <li><b>End Date : </b>${internEndDate}</li>
        <li><b>Summary : </b>${internSummary}</li>
        </ul>`;

        document.getElementById("internship-details").innerHTML = internshipText;

        //Achievement details
        const { achievements: { Summary: achievementSummaryList } } = selectedObject;
        var achievementText = "";
        achievementSummaryList.forEach(achievement => {
            achievementText += `<li>${achievement}</li>`;
        });

        var elementText = `<ul>${achievementText}</ul>`;
        document.getElementById("achievement-details").innerHTML = elementText;
    }
    else {
        dataContainer[0].style.display = "none";
        errorImage.style.display = "flex";
    }

}

function showNextRecord(event) {
    resumeCounter++;
    disableEnableButtons();
    showData(resumeArray, resumeCounter);
}

function showPrevRecord(event) {
    resumeCounter--;
    disableEnableButtons();
    showData(resumeArray, resumeCounter);
}

function disableEnableButtons() {
    if (resumeArray.length == 1) {
        buttonPrev.style.display = "none";
        buttonNext.style.display = "none";
    }
    else if (resumeCounter > 0 && resumeCounter < resumeArray.length - 1) {
        buttonPrev.style.display = "block";
        buttonNext.style.display = "block";
    }
    else if (resumeCounter <= 0) {
        buttonPrev.style.display = "none";
        buttonNext.style.display = "block";
    }
    else if (resumeCounter >= resumeArray.length - 1) {
        buttonNext.style.display = "none";
        buttonPrev.style.display = "block";
    }
}

function search_applicant(event) {
    var searchArray = new Array();
    let search_input = document.getElementById('searchInput').value.toLowerCase();
    resumeParentArray.forEach(element => {
        const { basics: { AppliedFor } } = element;
        if (AppliedFor.toLowerCase().includes(search_input))
            searchArray.push(element);
    });
    resumeArray = searchArray;
    resumeCounter = 0;
    showData(searchArray, resumeCounter);
    disableEnableButtons();
}