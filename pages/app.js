
import { app, storage, ref, uploadBytesResumable, getDownloadURL, db, doc, setDoc } from "./firebase.js"

let subBtn = document.getElementById("subBtn");

document.getElementById('passportImage').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const imagePreview = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.style.display = "block"
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Passport Image">`;
        };

        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = "none";
    }
});

const subBtnFunx = () => {
    let inputs = document.querySelectorAll(".inputs")
    let nonEmptyRegex = /\S+/; // Regex to check for non-empty values
    let isValid = true;

    inputs.forEach((item) => {
        if (item.hasAttribute("required") && !nonEmptyRegex.test(item.value.trim())) {
            item.classList.add('error');
            isValid = false;
        }
        else {
            item.classList.remove('error');
        }
    })

    // Validate image file
    let errorImgMess = document.getElementById("errorImgMess");
    const imageInput = document.querySelector('input[type="file"]');
    if (imageInput && imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const maxSize = 1 * 1024 * 1024; // 1MB in bytes
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (file.size > maxSize) {
            errorImgMess.style.display = "block"
            errorImgMess.innerHTML = `Image size must be less than 1MB.`
            setInterval(() => {
                errorImgMess.style.display = "none"
            }, 5000);
        } else if (!allowedTypes.includes(file.type)) {
            errorImgMess.style.display = "block"
            errorImgMess.innerHTML = `Image type must be jpg, jpeg, or png.`
            setInterval(() => {
                errorImgMess.style.display = "none"
            }, 5000);
        } else {
            imageInput.classList.remove('error');
        }
    }
    else {
        errorImgMess.style.display = "block"
        errorImgMess.innerHTML = `No File Choosen`
        setInterval(() => {
            errorImgMess.style.display = "none"
        }, 5000);
    }

    if (!isValid) {
        document.getElementById('errorMess').style.display = 'block';
    } else {
        document.getElementById('errorMess').style.display = 'none';
        // Perform form submission or further actions
        let cityNames = document.getElementById("cityNames").value;
        let courseNames = document.getElementById("courseNames").value;
        let campusValue = document.getElementById("campusValue").value;
        let classPreference = document.getElementById("classPreference").value;
        let FullName = document.getElementById("FullName").value;
        let FatherName = document.getElementById("FatherName").value;
        let userEmail = document.getElementById("userEmail").value;
        let phoneNum = document.getElementById("phoneNum").value;
        let userCNIC = document.getElementById("userCNIC").value;
        let fatherCNIC = document.getElementById("fatherCNIC").value;
        let DOB = document.getElementById("DOB").value;
        let genderSelect = document.getElementById("genderSelect").value;
        let address = document.getElementById("address").value;
        let qualification = document.getElementById("qualification").value;
        let laptopHai = document.getElementById("laptopHai").value;
        let passportImage = document.getElementById("passportImage");
        let loads = document.getElementById("loads");
        let indexSub = document.getElementById("indexSub");
        let imgName = passportImage.files[0]

        const storageRef = ref(storage, imgName.name);
        const uploadTask = uploadBytesResumable(storageRef, imgName);

        uploadTask.on('state_changed',
            (snapshot) => {
                indexSub.innerHTML = "Loading..."
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log("Handle unsuccessful uploads");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    await setDoc(doc(db, "Student Data", userCNIC), {
                        cityName: cityNames,
                        courseName: courseNames,
                        campusVal: campusValue,
                        classPref: classPreference,
                        FullNaam: FullName,
                        FatherNaam: FatherName,
                        userEm: userEmail,
                        phoneNumber: phoneNum,
                        CNIC: userCNIC,
                        fatherCN: fatherCNIC,
                        DOBs: DOB,
                        genderSelects: genderSelect,
                        addresses: address,
                        Last_qualification: qualification,
                        laptop: laptopHai,
                        image: downloadURL,
                    });

                    location.pathname = "/pages/submitted.html"
                });
            }
        );


    }


}


subBtn.addEventListener("click", subBtnFunx)











