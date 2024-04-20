function toggleBcode() {
    document.getElementById('Bcode').disabled = !document.getElementById('Student').checked;
    document.getElementById('Bcode').value = "";
}

async function addMember() {

    document.querySelector('#subMemberForm').disabled = true;

    submitData = {
        "name": $('#Name').val(),
        "email": $('#Email').val(),
        "student": $('#Student').prop("checked"),
        "bcode": $("#Bcode").val()
    }

    try {
        const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/member", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        });

        const result = await response.json();
        alert("Member added!");
        location.reload();
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
        location.reload();
    }

}

async function editMember(id) {

    document.querySelector('#saveChanges').disabled = true;

    submitData = {
        "name": $('#Name').val(),
        "email": $('#Email').val(),
        "student": $('#Student').prop("checked"),
        "bcode": $("#Bcode").val()
    }

    try {
        const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/member/"+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        });

        const result = await response.json();
        alert("Member edited!");
        location.reload();
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
        location.reload();
    }

}

async function deleteMember(id) {
    if (confirm("Do you wish to permanently remove this member?")) {
        document.getElementById("deleteMember").disabled = true;
        try {
            const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/member/" + id, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Member removed");
                location.href = "/members";
            } else {
                alert("An error occurred. Ensure member is not part of any groups.");
                location.href = "/members";
            }
        } catch (error) {
            console.error("Error:", error);
        }


    }

}

async function addGame() {

    document.querySelector('#subGameForm').disabled = true;

    players = [];
    $("#Players").val().forEach(item => {
        players.push(JSON.parse(item))
    })

    submitData = {
        "name": $('#Name').val(),
        "system": $('#System').val(),
        "slots": $('#Slots').val(),
        "description": $("#Description").val(),
        "dm": JSON.parse($("#DM").val()),
        "players": players
    }

    try {
        const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        });

        const result = await response.json();
        alert("Game added!");
        location.reload();
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
        location.reload();
    }

}