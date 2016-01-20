// Transition 0a2524561d1b1c7353570c4b3c5b5d51
// From State: Lookup ANI
// To State: Internal Caller
// Condition: Caller info record returned
function Condition_0a2524561d1b1c7353570c4b3c5b5d51() {
    // The API results are stored in appoAPI_lookup_ani
    if (appoAPI_lookup_ani.users[0].user != null) {
        return true;
    }
    return false;
}

function extractANI(ani) {
    // sip:6505550100@sip.corp.tellme.com
    var re = new RegExp("(\\d{10})");
    var result = re.exec(ani);
    if (result != null)
    {
        ani = result[1];
    }
    
    return ani;
}

