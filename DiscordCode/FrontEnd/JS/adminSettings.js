document.addEventListener('DOMContentLoaded', function() {
    const serverId = new URLSearchParams(window.location.search).get('serverId');

    const changeServerNameForm = document.getElementById('changeServerNameForm');
    const addAdminForm = document.getElementById('addAdminForm');
    const deleteMemberForm = document.getElementById('deleteMemberForm');

    changeServerNameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        const newServerName = document.getElementById('newServerName').value;
        const requestBody = {
            serverId: serverId,
            newServerName: newServerName
        };
        fetch(`/changeSname`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                console.log("Server name changed successfully");
            } else {
                console.error("Failed to change server name");
            }
        })
        .catch(error => {
            console.error('Error changing server name:', error);
        });
    });

    addAdminForm.addEventListener('submit', function(event) {
        event.preventDefault();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        const adminUsername = document.getElementById('adminUsername').value;
        const requestBody = {
            serverId: serverId,
            adminUsername: adminUsername
        };
        fetch(`/addAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                console.log("Admin added successfully");
            } else {
                console.error("Failed to add admin");
            }
        })
        .catch(error => {
            console.error('Error adding admin:', error);
        });
    });
    
    deleteMemberForm.addEventListener('submit', function(event) {
        event.preventDefault();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        const memberUsername = document.getElementById('memberUsername').value;
        const requestBody = {
            serverId: serverId,
            memberUsername: memberUsername
        };
        fetch(`/deleteMember`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                console.log("Member deleted successfully");
            } else {
                console.error("Failed to delete member");
            }
        })
        .catch(error => {
            console.error('Error deleting member:', error);
        });
    });
    
});
