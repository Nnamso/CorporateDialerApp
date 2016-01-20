// parse 'Lookup ANI' DOM into a nested JavaScript object
function API_lookup_ani(dom) {
    appoAPI_lookup_ani = new Object();
    try {
        appoAPI_lookup_ani = parseIntoObject(dom.documentElement);
    } catch (e) {
        return false;
    }
    return true;
}

// parse 'Get User Info' DOM into a nested JavaScript object
function API_get_user_info(dom) {
    appoAPI_get_user_info = new Object();
    try {
        appoAPI_get_user_info = parseIntoObject(dom.documentElement);
        if (null == appoAPI_get_user_info.users[0].user || 
            appoAPI_get_user_info.users[0].user.length != 1) {
            return false;
        }
        appoUser = appoAPI_get_user_info.users[0].user[0];
    } catch (e) {
        return false;
    }
    return true;
}

// parse 'Get First Name List' DOM into a nested JavaScript object
function API_get_first_name_list(dom) {
    appoAPI_get_first_name_list = new Object();
    try {
        appoAPI_get_first_name_list = parseIntoObject(dom.documentElement);
        if (null == appoAPI_get_first_name_list.users[0].user) {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
}

