import {db, doc, getDoc } from "./firebase.js";

let downSubBtn = document.getElementById("downSubBtn")
let displayId = document.getElementById("displayId")
let tabsBtnId = document.getElementById("tabsBtnId")
let downloadContId = document.getElementById("downloadContId")
let StudentContId = document.getElementById("StudentContId")
let downBtn = document.getElementById("downBtn")
let detailTable = document.getElementById("detailTable")

let ranValue = "";

for (let i = 0; i < 6; i++) {
    let ranDom = Math.floor(Math.random() * 10)
    ranValue += ranDom
}

const downBtnFunx = () => {
    displayId.style.display = "none";
    tabsBtnId.style.display = "none"
    downloadContId.style.display = "none"
    StudentContId.style.display = "block"
}

const downSubBtnFunx = async () => {
    let downCNICValue = document.getElementById("downCNICValue").value;
    let UserCardImgBox = document.getElementById("UserCardImgBox");
    let studentName = document.getElementById("studentName");
    let courseName = document.getElementById("courseName");
    let StuCardFooter2 = document.getElementById("StuCardFooter2");
    let UserNameCard = document.getElementById("UserNameCard");
    let fatherNameCard = document.getElementById("fatherNameCard");
    let UserCNICCard = document.getElementById("UserCNICCard");
    let courseCard = document.getElementById("courseCard");
    let ErrorModal = document.getElementById("ErrorModal");
    
    console.log(downCNICValue);

    const docRef = doc(db, "Student Data", downCNICValue);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        detailTable.style.display = "block"
        UserCardImgBox.innerHTML = `
            <img src="${docSnap.data().image}" alt="" width="100%" height="100%">
        `
        studentName.innerHTML = docSnap.data().FullNaam;
        courseName.innerHTML = docSnap.data().courseName;
        StuCardFooter2.innerHTML = `Student ID: ${ranValue}`
        UserNameCard.innerHTML = docSnap.data().FullNaam;
        fatherNameCard.innerHTML = docSnap.data().FatherNaam;
        UserCNICCard.innerHTML = docSnap.data().CNIC;
        courseCard.innerHTML = docSnap.data().courseName;

    } else {
        console.log("No such document!");
        ErrorModal.style.display = "flex"
        setTimeout(() => {
            ErrorModal.style.display = "none"
        }, 6000);
    }

}

downBtn.addEventListener("click", downBtnFunx)
downSubBtn.addEventListener("click", downSubBtnFunx)



