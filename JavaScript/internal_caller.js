// Transition 043a69fb305287ef33f9f760b64c6376
// From State: Get Name
// To State: Get User Info
// Condition: custom (no grammar result provided in the model)
function Condition_043a69fb305287ef33f9f760b64c6376() {
    return !IsFirstName(appsFilled_get_name);
}

// Transition 88617898ba562ebabcef7aae9521c7a9
// From State: Get Name
// To State: Get First Name List
// Condition: custom (no grammar result provided in the model)
function Condition_88617898ba562ebabcef7aae9521c7a9() {
    return IsFirstName(appsFilled_get_name);
}

// helper function to identify the name type
function IsFirstName(name)
{
    return (/^fn:/.test(name) ? true : false);
}

// Transition deb510993e96c8429d6188cbe7b0fed3
// From State: Get First Name List
// To State: Multiple Phones
// Condition: Only one user in the list
function Condition_deb510993e96c8429d6188cbe7b0fed3() {
    if (1 == appoAPI_get_first_name_list.users[0].user.length) {
        appoUser = appoAPI_get_first_name_list.users[0].user[0];
        return true;
    }
    return false;
}

// Transition 8d7957887c8365e8d6d59f7ec3297381
// From State: Multiple Phones
// To State: Select Phone
// Condition: Returns true if the user has more than one phone number listed
function Condition_8d7957887c8365e8d6d59f7ec3297381() {
    var mobile = appoUser.mobile[0].text___ || "";
    var home = appoUser.home[0].text___ || "";

    var tmp = appsFilled_get_name.split('@');
    if (tmp.length > 1) {
        if ("mobile" == tmp[1] && 0 == mobile.length) {
           // fall thru - invalid phone pre selected
        } else if ("home" == tmp[1] && 0 == home.length) {
           // fall thru - invalid phone pre selected
        } else {
            appsTransferDestination = "tel:" + appoUser[tmp[1]][0].text___;
            appsFilled_select_phone = tmp[1];
            return false; // skip selection since a valid phone has already been chosen
        }
    }

    if (mobile.length > 0 && home.length > 0) {
        appsPhoneGrammar = "wmh";
    }
    else if (mobile.length > 0) {
        appsPhoneGrammar = "wm";
    }
    else if (home.length > 0) {
        appsPhoneGrammar = "wh";
    }

    if (mobile.length > 0 || home.length > 0) {
        return true;
    }

    appsTransferDestination = "tel:" + appoUser.work[0].text___;
    return false;
}

// Transition 5d202142ead54bacabe347bf6b3837e0
// From State: Select User
// To State: Multiple Phones
// User requested stub function
function User_5d202142ead54bacabe347bf6b3837e0() {
    var index = appsFilled_select_user;
    appoUser = appoAPI_get_first_name_list.users[0].user[index];
    return;
}

// Transition 86c537bd445853e67ecefdba9e3e06a2
// From State: Get User Info
// To State: Multiple Phones
// User requested stub function
function User_86c537bd445853e67ecefdba9e3e06a2() {
    appoUser = appoAPI_get_user_info.users[0].user[0];
    return;
}

// Transition 432980b92a7c904c9dab3e123b56b37d
// From State: Select Phone
// To State: Calling
// User requested stub function
function User_432980b92a7c904c9dab3e123b56b37d() {
    // Assign the select phone number to the transfer expr
    if ("mobile" == appsFilled_select_phone) {
        appsTransferDestination = "tel:" + appoUser.mobile[0].text___;
    } else if ("work" == appsFilled_select_phone) {
        appsTransferDestination = "tel:" + appoUser.work[0].text___;
    } else if ("home" == appsFilled_select_phone) {
        appsTransferDestination = "tel:" + appoUser.home[0].text___;
    }
    return;
}

