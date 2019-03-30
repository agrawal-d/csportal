var google_profile;
var root_uri = "https://127.0.0.1/web/csportal/active/";
google_profile = {
    // getEmail() {
    //     return 'f2018@hyderabad.bits-pilani.ac.in';
    // }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkLogin() {
    console.log("Checking login")
    if (!google_profile) {
        $(".login").css("display", "block");
    } else {
        if (google_profile.getEmail().split('@')[1] == "hyderabad.bits-pilani.ac.in") {
            // alert(google_profile.getEmail().split('@')[1]);
            $(".login").css("display", "");
            console.log(google_profile);
            document.cookie = `email=${google_profile.getEmail()}; expires=Thu, 18 Dec 2020 12:00:00 UTC`;
            document.cookie = `id=${google_profile.getId()}; expires=Thu, 18 Dec 2020 12:00:00 UTC`;
            document.cookie = `name=${google_profile.getName()}; expires=Thu, 18 Dec 2020 12:00:00 UTC`;
            document.cookie = `image=${google_profile.getImageUrl()}; expires=Thu, 18 Dec 2020 12:00:00 UTC`;
            $.ajax({
                url: './api/login',
                data: {
                    googleid: google_profile.getId(),
                    email: google_profile.getEmail(),
                    image: google_profile.getImageUrl(),
                    name: google_profile.getName()
                },
                method: "POST",
                success: function (data) {
                    console.log(data)
                    window.location.href="/";

                },
                error: function (xhr) {
                    console.log(xhr);
                    window.location.href="/"

                }
            })
        } else {
            $(".login-content").append(`<p class="text-danger">You must log in with a BITS-Pilani account.<b> <b> <br>If facing issues, log out of your google account here : <a href="https://mail.google.com/mail/logout?hl=en">Google Logout</a></p></b><br>`);
        }

    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    google_profile = profile;
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    checkLogin();
}


$(document).on("click", ".solutions", function () {
    var available;
    $.ajax({
        url: root_uri + "solutions.php",
        success: function (result) {
            console.log(JSON.parse(result));
        },
        error: function (xhr) {
            alert(xhr);
        }
    })
})

function signOut() {
    document.cookie = `logout=true; expires=Thu, 18 Dec 2020 12:00:00 UTC`;
    window.location.href = '/api/logout';
}


