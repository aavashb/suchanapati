queries = [
    "Are you above 18 years old? ",
    "Are you from Nepal? ",
    "Do you have your birth certificate? ",
    "Can you write/speak in national language of Nepal? ",
    "Are you living in Nepal for more than 15 years? ",
    
]




for (let index = 0; index < queries.length; index++) {
    var ticked = true;
    let questionClass = document.getElementsByClassName('question')[0];
    let html =
        `<div id="question${index}">
            <label for="citizen" ><p class="questionText">${queries[index]}</p></label>
            <input type="checkbox" name="citizen${index}" id="yes${index}" class="checkInput">
        </div>`


    questionClass.innerHTML += html;

}



document.querySelector(".btn").addEventListener('click', () => {

    var notify = document.querySelector(".notify");
    var allChecked = false;
    for (let index = 0; index < queries.length; index++) {
        console.log("Haha");
        if (document.getElementById("yes" + index).checked == true) {
            console.log(document.getElementById("yes" + index).isChecked);
            allChecked = true
        }
        else {
            allChecked = false;
            break;
        }

    }
    if (allChecked == true) {
        notify.innerHTML = `<div class="alert alert-success ">
               <strong>Congratulations!</strong> You can now proudly be a Nepali Citizen.
             </div>
            `
        setTimeout(() => {


            notify.innerHTML = ""

        }, 5000);




    }
    else {
        notify.innerHTML = `<div class="alert alert-failure ">
               <strong>Sorry!</strong> Your requirement arent eligible for citizenship.
             </div>
            `
        setTimeout(() => {
            notify.innerHTML = "";

        }, 5000);


    }

})





