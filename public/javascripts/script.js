function toggleBcode() {
    document.getElementById('Bcode').disabled = !document.getElementById('Student').checked;
    document.getElementById('Bcode').value = "";
}

async function addMember(e) {

    e.preventDefault()

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

async function editMember(e, id) {

    e.preventDefault();

    document.querySelector('#saveChanges').disabled = true;

    submitData = {
        "name": $('#Name').val(),
        "email": $('#Email').val(),
        "student": $('#Student').prop("checked"),
        "bcode": $("#Bcode").val()
    }

    try {
        const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/member/" + id, {
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

async function addGame(e) {

    e.preventDefault();

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

async function deleteGame(id) {
    if (confirm("Do you wish to permanently remove this game?")) {
        document.getElementById("deleteGame").disabled = true;
        try {
            const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/game/" + id, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Game removed");
                location.href = "/games";
            } else {
                alert("An error occurred.");
                location.href = "/games";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

async function editGame(e, id) {

    e.preventDefault();

    document.querySelector('#saveChanges').disabled = true;

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
        const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/game/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        });

        const result = await response.json();
        alert("Game updated!");
        location.replace(location.href);
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
        location.reload();
    }

}

async function deleteFund(id) {
    if (confirm("Do you wish to permanently remove this record?")) {
        document.getElementById("deleteFund").disabled = true;
        try {
            const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/budget/" + id, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Record removed");
                location.href = "/funds";
            } else {
                alert("An error occurred.");
                location.href = "/funds";
            }
        } catch (error) {
            console.error("Error:", error);
        }


    }

}

async function addFund(e) {

    e.preventDefault();

    document.querySelector('#subFundForm').disabled = true;

    submitData = {
        "funds": $('#Funds').val(),
        "grants": $('#Grants').val(),
        "comment": $('#Comment').val(),
        "date": $("#Date").val(),
        "author": $("#Author").val()
    }

    try {
        const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/budget", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        });

        const result = await response.json();
        alert("Record added!");
        location.reload();
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
        location.reload();
    }
}

async function deleteEvent(id) {
    if (confirm("Do you wish to permanently remove this event?")) {
        document.getElementById("deleteEvent").disabled = true;
        try {
            const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/event/" + id, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Event removed");
                location.href = "/events";
            } else {
                alert("An error occurred.");
                location.href = "/events";
            }
        } catch (error) {
            console.error("Error:", error);
        }


    }

}

async function addEvent(e) {

    e.preventDefault()

    document.querySelector('#subEventForm').disabled = true;

    submitData = {
        "title": $('#Title').val(),
        "description": $('#Description').val(),
        "start": $('#Date').val()+"T"+$('#Time').val()+":00",
        "location": $("#Location").val(),
        "imageLink": $("#Image").val(),
        "ticketLink": $("#Ticket").val()
    }


    try {
        const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        });

        const result = await response.json();
        alert("Event added!");
        location.reload();
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
        location.reload();
    }

}

async function editEvent(e, id) {

    e.preventDefault();

    document.querySelector('#saveChanges').disabled = true;

    submitData = {
        "title": $('#Title-'+id).val(),
        "description": $('#Description-'+id).val(),
        "start": $('#Date-'+id).val()+"T"+$('#Time-'+id).val()+":00",
        "location": $("#Location-"+id).val(),
        "imageLink": $("#Image-"+id).val(),
        "ticketLink": $("#Ticket-"+id).val()
    }

    try {
        const response = await fetch("https://uusudnd-api.azurewebsites.net/api/v1/event/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        });

        const result = await response.json();
        alert("Event updated!");
        location.replace(location.href);
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
        location.reload();
    }

}
